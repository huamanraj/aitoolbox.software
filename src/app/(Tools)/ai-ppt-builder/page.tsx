"use client";

import { useState, useEffect } from "react";
import { useBuilder } from "./_lib/store";
import Themeselector from "./_components/ThemeSelector";
import OutlineEditor from "./_components/OutlineEditor";
import SlideCanvas from "./_components/SlideCanvas";
import LiveProgress from "./_components/LiveProgress";
import Features from "./_components/Features";
import { saveAs } from "file-saver";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import {
  BuilderState,
  LanguageCode,
  PageStyle,
  AudienceStyle,
} from "./_lib/types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Steps } from "@/components/ui/steps";

export default function Builder() {
  const {
    topic,
    language,
    audience,
    pageStyle,
    numSlides,
    set,
    outline,
    updateOutline,
    replaceSlides,
    slides,
    themes,
    themeId,
    isGenerating,
  } = useBuilder();

  useEffect(() => {
    if (isGenerating) {
      const timer = setTimeout(
        () => useBuilder.setState({ isGenerating: false }),
        30000
      );
      return () => clearTimeout(timer);
    }
  }, [isGenerating]);

  const [size, setSize] = useState("1920x1080"); // for images

  async function genOutline() {
    useBuilder.setState({ isGenerating: true, progress: 0 });

    try {
      const r = await fetch("/api/ai/ai-ppt-builder/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          language,
          audience,
          pageStyle,
          numSlides,
        }),
      });

      if (!r.body) throw new Error("No stream");

      const reader = r.body.getReader();
      const decoder = new TextDecoder();

      let buffer = "";
      let progress = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // Decode chunk
        buffer += decoder.decode(value, { stream: true });

        // Split SSE-like events
        const parts = buffer.split("\n\n");
        buffer = parts.pop() || ""; // Keep unfinished chunk

        for (const part of parts) {
          if (part.startsWith("data:")) {
            const jsonStr = part.replace(/^data:\s*/, "");
            try {
              const parsed = JSON.parse(jsonStr);
              if (parsed.slide && parsed.slide.title) {
                const currentOutline = useBuilder.getState().outline;
                updateOutline([...currentOutline, parsed.slide]);
                progress += Math.floor(100 / numSlides);
                useBuilder.setState({ progress });
              }
            } catch (e) {
              console.warn("Non-JSON chunk:", jsonStr);
            }
          }
        }
      }

      // Final flush if needed
      if (buffer.trim().startsWith("data:")) {
        try {
          const parsed = JSON.parse(buffer.replace(/^data:\s*/, ""));
          if (parsed.slide) {
            const currentOutline = useBuilder.getState().outline;
            updateOutline([...currentOutline, parsed.slide]);
            useBuilder.setState({ progress: 100 });
          }
        } catch {}
      }
    } catch (err) {
      console.error("Error generating outline:", err);
    } finally {
      useBuilder.setState({ isGenerating: false });
    }
  }

  async function buildSlides() {
    useBuilder.setState({ isGenerating: true, progress: 0 });
    try {
      // Generate slide text with Pollinations
      const slidesRes = await fetch("/api/ai/ai-ppt-builder/slides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ outline, language, audience }),
      });

      const { slides } = await slidesRes.json();

      // Generate AI images from Pollinations
      const imagePrompts = slides.map(
        (s: any) => `${s.title} | ${audience} style | ${language} | ${topic}`
      );

      const imagesRes = await fetch("/api/ai/ai-ppt-builder/images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompts: imagePrompts, size: "1024x1024" }),
      });
      const { images } = await imagesRes.json();

      const withImages = slides.map((s: any, i: number) => ({
        ...s,
        image: images[i],
      }));

      replaceSlides(withImages);
      useBuilder.setState({ progress: 100 });
    } catch (err) {
      console.error("Error building slides:", err);
    } finally {
      useBuilder.setState({ isGenerating: false });
    }
  }

  // Helper: Convert CSS gradient to base64 image
  async function gradientToBase64(cssGradient: string, width = 1920, height = 1080): Promise<string> {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d")!;

    // Default gradient direction: left→right
    let x0 = 0, y0 = 0, x1 = width, y1 = 0;

    // Extract content inside parentheses
    const inner = cssGradient.replace(/linear-gradient\s*\((.*)\)/i, "$1");

    // If the first part is an angle (e.g., "135deg"), handle it
    const parts = inner.split(",");
    let stopsPart = parts;

    const angleMatch = parts[0].trim().match(/(\d+)deg/);
    if (angleMatch) {
      const angleDeg = parseInt(angleMatch[1], 10);
      const angleRad = (angleDeg * Math.PI) / 180;

      // Compute gradient vector from angle
      x0 = width / 2 - Math.cos(angleRad) * width / 2;
      y0 = height / 2 - Math.sin(angleRad) * height / 2;
      x1 = width - x0;
      y1 = height - y0;

      // remove the angle from stops list
      stopsPart = parts.slice(1);
    }

    const gradient = ctx.createLinearGradient(x0, y0, x1, y1);

    // Parse color stops
    stopsPart.forEach((stop, i) => {
      const tokens = stop.trim().split(/\s+/);
      const color = tokens[0];
      let pos: number;

      if (tokens[1] && tokens[1].endsWith("%")) {
        pos = parseFloat(tokens[1]) / 100;
      } else {
        pos = i / (stopsPart.length - 1);
      }

      try {
        gradient.addColorStop(pos, color);
      } catch (err) {
        console.warn("Invalid color stop skipped:", stop);
      }
    });

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    return canvas.toDataURL("image/png");
  }

  async function downloadPPTX() {
    try {
      if (!slides.length) return;
      const pptxgen = (await import("pptxgenjs")).default;
      const pres = new pptxgen();

      const isWidescreen = pageStyle === "16:9";
      const theme = themes.find((t) => t.id === themeId)!;

      // Metadata
      pres.title = topic || "Presentation";
      pres.subject = topic || "Presentation";
      pres.company = "AI Tool Box";
      pres.author = "AI PPT Builder";
      pres.revision = "1";

      // Layout
      pres.layout = isWidescreen ? "LAYOUT_16x9" : "LAYOUT_4x3";
      const slideWidth = isWidescreen ? 10 : 10;
      const slideHeight = isWidescreen ? 5.625 : 7.5;
      const margin = 0.5;

      // Font sizes
      const baseTitleSize = isWidescreen ? 44 : 36;
      const baseBodySize = isWidescreen ? 24 : 20;
      const titleSize = Math.min(theme.textStyles.titleSize || baseTitleSize, baseTitleSize);
      const bodySize = Math.min(theme.textStyles.bodySize || baseBodySize, baseBodySize);

      const contentWidth = slideWidth - 2 * margin;
      const imageWidth = contentWidth * 0.4;
      const textWidth = contentWidth * 0.55;

      // 🔑 pre-generate gradient if needed
      let bgFill: { fill?: string; data?: string } = { fill: "#FFFFFF" };
      if (theme.palette.bg?.startsWith("linear-gradient")) {
        const base64 = await gradientToBase64(theme.palette.bg);
        bgFill = { data: base64 };
      } else {
        bgFill = { fill: theme.palette.bg || "FFFFFF" };
      }

      for (const s of slides) {
        const slide = pres.addSlide();

        // Background (solid or gradient-image)
        slide.background = bgFill;

        // Title box
        slide.addText(s.title || "Untitled Slide", {
          x: margin,
          y: margin,
          w: slideWidth - 2 * margin,
          h: 1.0,
          fontSize: titleSize,
          bold: true,
          color: theme.palette.fg,
          fontFace: theme.fonts?.title || "Arial",
          align: "center",
          valign: "middle",
          wrap: true,
        });

        const contentY = margin + 1.2;
        const contentHeight = slideHeight - contentY - margin;

        // Bullets
        if (s.bullets?.length) {
          const bulletText = s.bullets
            .map((b) => b.trim())
            .filter(Boolean)
            .map((b) => b.replace(/^[•●‣⁃-]\s*/, "").trim())
            .join("\n");

          slide.addText(bulletText, {
            x: margin,
            y: contentY,
            w: textWidth,
            h: contentHeight,
            fontSize: bodySize,
            color: theme.palette.fg,
            fontFace: theme.fonts?.body || "Arial",
            bullet: true,
            valign: "top",
            align: "left",
            wrap: true,
            lineSpacing: 24,
          });
        }

        // Image (right side)
        if (s.image) {
          const imgBase64 = await ensureBase64Image(s.image);
          if (imgBase64.startsWith("data:image/")) {
            slide.addImage({
              data: imgBase64,
              x: slideWidth - margin - imageWidth,
              y: contentY,
              w: imageWidth,
              h: contentHeight,
              sizing: { type: "contain", w: 0, h: 0 },
            });
          }
        }
      }

      // Export
      const blob = (await pres.write({ outputType: "blob" })) as Blob;
      const fileName = topic
        ? `${topic.replace(/[^a-zA-Z0-9]/g, "-")}.pptx`
        : `presentation-${Date.now()}.pptx`;
      saveAs(blob, fileName);
    } catch (error) {
      console.error("Failed to generate PPTX:", error);
      throw new Error("Failed to generate presentation. Please try again.");
    }
  }

  // Download PDF function
  async function downloadPDF() {
    if (!slides.length) return;

    const pdfDoc = await PDFDocument.create();
    const theme = themes.find((t) => t.id === themeId)!;

    // Calculate dimensions based on layout
    let pageWidth = 842; // A4 width in points (595.28 for portrait)
    let pageHeight = 595; // A4 height in points (841.89 for portrait)

    if (pageStyle !== "A4") {
      const ratio = pageStyle === "4:3" ? 4 / 3 : 16 / 9;
      pageWidth = 842; // Fixed width
      pageHeight = Math.round(pageWidth / ratio);
    }

    // Margins and spacing
    const margin = pageWidth * 0.05; // 5% margin
    const contentWidth = pageWidth - 2 * margin;

    const titleFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const bodyFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Helper: Wrap text into lines
    function wrapText(
      text: string,
      font: any,
      fontSize: number,
      maxWidth: number
    ) {
      const words = text.split(" ");
      const lines: string[] = [];
      let currentLine = "";

      words.forEach((word) => {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        if (font.widthOfTextAtSize(testLine, fontSize) <= maxWidth) {
          currentLine = testLine;
        } else {
          lines.push(currentLine);
          currentLine = word;
        }
      });

      if (currentLine) lines.push(currentLine);
      return lines;
    }

    for (const s of slides) {
      const page = pdfDoc.addPage([pageWidth, pageHeight]);

      // Background
      if (theme.palette.bg?.startsWith("linear-gradient")) {
        const base64 = await gradientToBase64(theme.palette.bg, pageWidth, pageHeight);
        const embeddedBg = await pdfDoc.embedPng(base64);
        page.drawImage(embeddedBg, {
          x: 0,
          y: 0,
          width: pageWidth,
          height: pageHeight,
        });
      } else {
        const [r, g, b] = hexToRgb(theme.palette.bg);
        page.drawRectangle({
          x: 0,
          y: 0,
          width: pageWidth,
          height: pageHeight,
          color: rgb(r / 255, g / 255, b / 255),
        });
      }

      // Title handling
      const title = s.title || "Untitled Slide";
      const maxTitleWidth = contentWidth * 0.9;
      let titleSize = Math.min(
        theme.textStyles.titleSize * 2,
        pageHeight * 0.08
      );

      // Adaptive title sizing
      while (
        titleFont.widthOfTextAtSize(title, titleSize) > maxTitleWidth &&
        titleSize > pageHeight * 0.03
      ) {
        titleSize *= 0.9;
      }

      // Wrap title into lines with proper spacing
      const titleLines = wrapText(title, titleFont, titleSize, maxTitleWidth);
      const lineHeight = titleSize * 1.3;
      let y = pageHeight - margin - titleSize;

      // Center title block vertically if multiple lines
      if (titleLines.length > 1) {
        y += (lineHeight * (titleLines.length - 1)) / 2;
      }

      // Draw title lines
      titleLines.forEach((line) => {
        const textWidth = titleFont.widthOfTextAtSize(line, titleSize);
        page.drawText(line, {
          x: (pageWidth - textWidth) / 2,
          y,
          size: titleSize,
          font: titleFont,
          color: hexToPdfColor(theme.palette.fg),
        });
        y -= lineHeight;
      });

      // Calculate content area dimensions
      const contentY = y - margin * 2;
      const contentAreaHeight = contentY - margin;
      const textColumnWidth = contentWidth * 0.55;
      const imageColumnWidth = contentWidth * 0.4;

      // Bullets - Left side
      if (s.bullets?.length) {
        const bodySize = Math.min(
          theme.textStyles.bodySize * 1.8,
          pageHeight * 0.035
        );
        const lineSpacing = bodySize * 1.4;
        let bulletY = contentY;

        s.bullets.forEach((bullet, index) => {
          // Wrap each bullet point
          const bulletLines = wrapText(
            `• ${bullet}`,
            bodyFont,
            bodySize,
            textColumnWidth
          );

          bulletLines.forEach((line, lineIndex) => {
            page.drawText(line, {
              x: margin,
              y: bulletY - lineIndex * lineSpacing,
              size: bodySize,
              font: bodyFont,
              color: hexToPdfColor(theme.palette.fg),
            });
          });

          bulletY -= lineSpacing * (bulletLines.length + 0.5); // Add space between bullet points
        });
      }

      // Image - Right side
      if (s.image) {
        const imgBase64 = await ensureBase64Image(s.image);
        let embeddedImg;
        if (imgBase64.startsWith("data:image/png")) {
          embeddedImg = await pdfDoc.embedPng(imgBase64);
        } else if (
          imgBase64.startsWith("data:image/jpeg") ||
          imgBase64.startsWith("data:image/jpg")
        ) {
          embeddedImg = await pdfDoc.embedJpg(imgBase64);
        }

        if (embeddedImg) {
          const imgDimensions = embeddedImg.size();
          const imgRatio = imgDimensions.width / imgDimensions.height;

          let imgWidth = imageColumnWidth;
          let imgHeight = imageColumnWidth / imgRatio;

          // Adjust height if it's too tall
          if (imgHeight > contentAreaHeight) {
            imgHeight = contentAreaHeight;
            imgWidth = imgHeight * imgRatio;
          }

          // Center image in its column
          const imgX =
            pageWidth -
            margin -
            imageColumnWidth +
            (imageColumnWidth - imgWidth) / 2;
          const imgY = contentY - (contentAreaHeight - imgHeight) / 2;

          page.drawImage(embeddedImg, {
            x: imgX,
            y: imgY - imgHeight, // Subtract imgHeight because PDF coordinates start from bottom
            width: imgWidth,
            height: imgHeight,
          });
        }
      }
    }

    const pdfBytes = await pdfDoc.save();
    const arrayBuffer = new Uint8Array(pdfBytes).buffer;
    saveAs(
      new Blob([arrayBuffer], { type: "application/pdf" }),
      "presentation.pdf"
    );
  }

  // Convert hex color to rgb array
  function hexToRgb(hex: string) {
    const parsed = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return parsed
      ? [
          parseInt(parsed[1], 16),
          parseInt(parsed[2], 16),
          parseInt(parsed[3], 16),
        ]
      : [0, 0, 0];
  }

  // Convert hex to pdf-lib color object
  function hexToPdfColor(hex: string) {
    const [r, g, b] = hexToRgb(hex);
    return rgb(r / 255, g / 255, b / 255);
  }

  async function ensureBase64Image(
    img: string,
    fallbackType: "jpeg" | "png" = "jpeg"
  ) {
    if (img.startsWith("data:image/")) return img; // already correct format

    // If it's a URL, fetch and convert
    try {
      const res = await fetch(img);
      if (!res.ok) throw new Error(`Image fetch failed: ${res.status}`);
      if (!res.headers.get("content-type")?.startsWith("image/")) {
        throw new Error("Not a valid image response");
      }

      const blob = await res.blob();
      return await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (err) {
      console.error("Image conversion failed", err);
      return `data:image/${fallbackType};base64,`; // blank placeholder
    }
  }

  const defaultState: Partial<BuilderState> = {
    topic: "",
    language: "en" as LanguageCode,
    audience: "professional",
    pageStyle: "16:9" as PageStyle,
    numSlides: 5,
    outline: [],
    slides: [],
    themeId: themes?.[0]?.id || "",
    isGenerating: false,
    progress: 0,
  };

  // Reset on every refresh
  useEffect(() => {
    useBuilder.setState(defaultState);
  }, []);

  const handleReset = () => {
    useBuilder.setState(defaultState);
    setCurrentStep(1); // Reset to step 1
    setIsDownloading(false); // Reset download state
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [isDownloading, setIsDownloading] = useState(false);

  const steps = [
    { id: 1, title: "Basic Info" },
    { id: 2, title: "Generate Outline" },
    { id: 3, title: "Edit & Customize" },
    { id: 4, title: "Preview & Download" },
  ];

  const handleNext = async () => {
    if (currentStep === 1 && !topic) {
      alert("Please enter a topic");
      return;
    }

    if (currentStep === 2 && !outline.length) {
      await genOutline();
    }

    if (currentStep === 3 && !slides.length) {
      await buildSlides();
    }

    setCurrentStep((curr) => Math.min(curr + 1, steps.length));
  };

  const handleBack = () => {
    setCurrentStep((curr) => Math.max(curr - 1, 1));
  };

  const [downloadingType, setDownloadingType] = useState<"pptx" | "pdf" | null>(
    null
  );
  const [downloadProgress, setDownloadProgress] = useState<number>(0);

  const handleDownload = async (type: "pptx" | "pdf") => {
    setDownloadingType(type);
    setDownloadProgress(0);

    try {
      // Start progress animation
      const progressInterval = setInterval(() => {
        setDownloadProgress((prev) => {
          if (prev >= 90) return prev; // Stop at 90% until actual completion
          return prev + Math.random() * 15;
        });
      }, 500);

      if (type === "pptx") {
        await downloadPPTX();
      } else {
        await downloadPDF();
      }

      // Complete the progress
      setDownloadProgress(100);

      // Reset after a short delay
      setTimeout(() => {
        setDownloadProgress(0);
        setDownloadingType(null);
      }, 500);

      clearInterval(progressInterval);
    } catch (error) {
      console.error("Error downloading ${type}:", error);
      setDownloadProgress(0);
      setDownloadingType(null);
    }
  };

  async function handleSuggestionClick(suggestedTopic: string) {
    set({ topic: suggestedTopic });
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight text-center">
        AI PPT Builder
      </h1>

      {/* Stepper */}
      <Steps
        steps={steps}
        currentStep={currentStep}
        onStepClick={(step) => setCurrentStep(step)}
      />

      <div className="mt-10">
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Topic</Label>
                <Input
                  value={topic}
                  onChange={(e) => set({ topic: e.target.value })}
                  placeholder="e.g., Renewable Energy"
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Language</Label>
                  <select
                    className="w-full border rounded p-2"
                    value={language}
                    onChange={(e) =>
                      set({ language: e.target.value as LanguageCode })
                    }
                  >
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="ja">Japanese</option>
                  </select>
                </div>

                <div>
                  <Label>Audience</Label>
                  <select
                    className="w-full border rounded p-2"
                    value={audience}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      set({ audience: e.target.value as AudienceStyle })
                    }
                  >
                    <option value="professional">Professional</option>
                    <option value="casual">Casual</option>
                  </select>
                </div>

                <div>
                  <Label>Number of Slides</Label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <input
                        type="number"
                        min="1"
                        max="10"
                        className="px-4 border rounded p-2 text-center"
                        value={numSlides}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (!isNaN(value)) {
                            if (value < 1) set({ numSlides: 1 });
                            else if (value > 10) set({ numSlides: 10 });
                            else set({ numSlides: value });
                          }
                        }}
                        placeholder="1-10"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <section className="mt-10 flex-1 text-left">
              <h2 className="text-xl font-semibold">
                Suggested Topics to Create :
              </h2>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div onClick={() => handleSuggestionClick("Hardwork Vs Smartwork")} className="hover:bg-gray-100 hover:border-gray-500 flex items-center justify-center rounded-2xl h-30 bg-white text-black border p-6 cursor-pointer">
                  Hardwork Vs Smartwork
                </div>
                <div onClick={() => handleSuggestionClick("Global Warming")} className="hover:bg-gray-100 hover:border-gray-500 rounded-2xl flex items-center justify-center h-30 bg-white text-black border p-6 cursor-pointer">
                  Global Warming
                </div>
                <div onClick={() => handleSuggestionClick("History of Computers")} className="hover:bg-gray-100 hover:border-gray-500 rounded-2xl flex items-center justify-center h-30 bg-white text-black border p-6 cursor-pointer">
                  History of Computers
                </div>
                <div onClick={() => handleSuggestionClick("Technology and Innovation")} className="hover:bg-gray-100 hover:border-gray-500 rounded-2xl flex items-center justify-center h-30 bg-white text-black border p-6 cursor-pointer">
                  Technology and Innovation
                </div>
                <div onClick={() => handleSuggestionClick("Advancements in Robotics and Automation")} className="hover:bg-gray-100 hover:border-gray-500 rounded-2xl flex items-center justify-center text-center h-30 bg-white text-black border p-6 cursor-pointer">
                  Advancements in Robotics and Automation
                </div>
                <div onClick={() => handleSuggestionClick("Cybersecurity and Data Privacy")} className="hover:bg-gray-100 hover:border-gray-500 rounded-2xl flex items-center justify-center h-30 bg-white text-black border p-6 cursor-pointer">
                  Cybersecurity and Data Privacy
                </div>
              </div>
            </section>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            {isGenerating ? (
              <div className="space-y-4">
                <LiveProgress />
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {!outline.length && (
                  <div className="p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">
                      Instructions:
                    </h3>
                    <ol className="list-decimal list-inside space-y-2">
                      <li>
                        Click the <span className="font-medium">Generate</span>{" "}
                        Button below to create your presentation outline
                      </li>
                      <li>Review the generated outline</li>
                      <li>
                        Click <span className="font-medium">Next</span> to
                        proceed to customization
                      </li>
                    </ol>
                  </div>
                )}
                <OutlineEditor />
                {!outline.length && (
                  <div className="flex justify-center mt-4">
                    <Button
                      onClick={genOutline}
                      disabled={isGenerating}
                      className="text-white px-5 py-2 cursor-pointer"
                    >
                      {isGenerating ? "Generating..." : "Generate Outline"}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <Themeselector />
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Page Style</Label>
                <select
                  className="w-full border rounded p-2"
                  value={pageStyle}
                  onChange={(e) =>
                    set({ pageStyle: e.target.value as PageStyle })
                  }
                >
                  <option value="16:9">16:9</option>
                  <option value="4:3">4:3</option>
                  <option value="A4">A4</option>
                </select>
              </div>
              <div>
                <Label>Image Quality</Label>
                <select
                  className="w-full border rounded p-2"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                >
                  <option value="1280x720">HD (1280×720)</option>
                  <option value="1920x1080">Full HD (1920×1080)</option>
                  <option value="2560x1440">QHD (2560×1440)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <SlideCanvas />
            <div className="flex gap-4 justify-center">
              <div className="relative">
                <Button
                  onClick={() => handleDownload("pptx")}
                  disabled={downloadingType !== null || !slides.length}
                  className="px-6 min-w-[140px] relative overflow-hidden cursor-pointer"
                >
                  {downloadingType === "pptx" ? (
                    <>
                      <div className="flex items-center justify-center">
                        <span>
                          Downloading... {Math.round(downloadProgress)}%
                        </span>
                      </div>
                      <div
                        className="absolute bottom-0 left-0 h-1 bg-green-500 transition-all duration-300"
                        style={{ width: `${downloadProgress}%` }}
                      />
                    </>
                  ) : (
                    "Download PPTX"
                  )}
                </Button>
              </div>

              <div className="relative">
                <Button
                  onClick={() => handleDownload("pdf")}
                  disabled={downloadingType !== null || !slides.length}
                  className="px-6 min-w-[140px] relative overflow-hidden cursor-pointer"
                >
                  {downloadingType === "pdf" ? (
                    <>
                      <div className="flex items-center justify-center">
                        <span>
                          Downloading... {Math.round(downloadProgress)}%
                        </span>
                      </div>
                      <div
                        className="absolute bottom-0 left-0 h-1 bg-green-500 transition-all duration-300"
                        style={{ width: `${downloadProgress}%` }}
                      />
                    </>
                  ) : (
                    "Download PDF"
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          <Button
            onClick={handleBack}
            disabled={currentStep === 1}
            variant="outline"
            className="cursor-pointer"
          >
            Back
          </Button>

          {currentStep < steps.length ? (
            <Button
              className="cursor-pointer"
              onClick={handleNext}
              disabled={isGenerating || isDownloading}
            >
              {isGenerating ? "Generating..." : "Next"}
            </Button>
          ) : (
            <Button className="cursor-pointer" onClick={handleReset}>
              Start Over
            </Button>
          )}
        </div>
      </div>

      <Features />
    </div>
  );
}
