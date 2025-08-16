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
import { BuilderState, LanguageCode, PageStyle } from "./_lib/types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Builder() {
  const {
    topic, language, audience, pageStyle, numSlides,
    set, outline, updateOutline, replaceSlides, slides, themes, themeId,
    isGenerating
  } = useBuilder();

  useEffect(() => {
    if (isGenerating) {
      const timer = setTimeout(() => useBuilder.setState({ isGenerating: false }), 30000);
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
        body: JSON.stringify({ topic, language, audience, pageStyle, numSlides }),
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

  async function downloadPPTX() {
    if (!slides.length) return;
    const pptxgen = (await import("pptxgenjs")).default;
    const pres = new pptxgen();
    pres.layout = pageStyle === "4:3" ? "LAYOUT_4x3" : "LAYOUT_16x9";

    const theme = themes.find((t) => t.id === themeId)!;

    for (const s of slides) {
      const slide = pres.addSlide();
      slide.background = { color: theme.palette.bg };

      // Title box (top center, 9" wide)
      slide.addText(s.title || "Untitled Slide", {
        x: 0.5,
        y: 0.3,
        w: 9,
        h: 1,
        fontSize: theme.textStyles.titleSize,
        bold: true,
        color: theme.palette.fg,
        fontFace: theme.fonts.title,
        align: "center",
        autoFit: true,   // safe to use
      });

      // Bullets (left side, ~4.5" wide)
      if (s.bullets?.length) {
        slide.addText(
          s.bullets.map((b) => `• ${b}`).join("\n"),
          {
            x: 0.5,
            y: 1.5,
            w: 4.5,
            h: 4.5,
            fontSize: theme.textStyles.bodySize,
            color: theme.palette.fg,
            fontFace: theme.fonts.body,
            bullet: true,
            valign: "top",
            autoFit: true,
          }
        );
      }

      // Image (right side, ~4.5" box, contained)
      if (s.image) {
        const imgBase64 = await ensureBase64Image(s.image);
        if (imgBase64.startsWith("data:image/")) {
          slide.addImage({
            data: imgBase64,
            x: 5.5,   // start after bullet box
            y: 1.5,
            w: 4.5,
            h: 4.5,
            sizing: {
              type: "contain",
              w: 0,
              h: 0
            },
          });
        }
      }
    }

    const blob = (await pres.write({ outputType: "blob" })) as Blob;
    saveAs(blob, "presentation.pptx");
  }

  // Download PDF function
  async function downloadPDF() {
    if (!slides.length) return;

    const pdfDoc = await PDFDocument.create();
    const theme = themes.find((t) => t.id === themeId)!;

    const ratio = pageStyle === "4:3" ? 4 / 3 : 16 / 9;
    const pageWidth = 1280;
    const pageHeight = Math.round(
      pageWidth / (pageStyle === "A4" ? 210 / 297 : ratio)
    );

    const titleFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const bodyFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Helper: Wrap text into lines
    function wrapText(text: string, font: any, fontSize: number, maxWidth: number) {
      const words = text.split(" ");
      const lines: string[] = [];
      let currentLine = "";

      words.forEach(word => {
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
      const [r, g, b] = hexToRgb(theme.palette.bg);
      page.drawRectangle({
        x: 0,
        y: 0,
        width: pageWidth,
        height: pageHeight,
        color: rgb(r / 255, g / 255, b / 255),
      });

      // Title handling
      const title = s.title || "Untitled Slide";
      let titleSize = theme.textStyles.titleSize * 2.4;
      const maxTitleWidth = pageWidth * 0.9;

      // Reduce size until the longest word fits
      while (
        titleFont.widthOfTextAtSize(title, titleSize) > maxTitleWidth &&
        titleSize > 10
      ) {
        titleSize -= 1;
      }

      // Wrap into lines
      const titleLines = wrapText(title, titleFont, titleSize, maxTitleWidth);
      const lineHeight = titleSize * 1.2;
      let y = pageHeight - titleSize * 2;

      titleLines.forEach(line => {
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

      // Bullets - Left side
      if (s.bullets?.length) {
        const bodySize = theme.textStyles.bodySize * 2.4;
        const bulletText = s.bullets.map((b) => `• ${b}`).join("\n");
        page.drawText(bulletText, {
          x: pageWidth * 0.05,
          y: pageHeight * 0.6,
          size: bodySize,
          font: bodyFont,
          color: hexToPdfColor(theme.palette.fg),
          maxWidth: pageWidth * 0.45,
          lineHeight: bodySize * 1.4,
        });
      }

      // Image - Right side
      if (s.image) {
        const imgBase64 = await ensureBase64Image(s.image);
        let embeddedImg;
        if (imgBase64.startsWith("data:image/png")) {
          embeddedImg = await pdfDoc.embedPng(imgBase64);
        } else if (imgBase64.startsWith("data:image/jpeg") || imgBase64.startsWith("data:image/jpg")) {
          embeddedImg = await pdfDoc.embedJpg(imgBase64);
        }

        if (embeddedImg) {
          const imgWidth = pageWidth * 0.4;
          const imgHeight = pageHeight * 0.5;
          page.drawImage(embeddedImg, {
            x: pageWidth * 0.55,
            y: pageHeight * 0.3,
            width: imgWidth,
            height: imgHeight,
          });
        }
      }
    }

    const pdfBytes = await pdfDoc.save();
    const arrayBuffer = new Uint8Array(pdfBytes).buffer; 
    saveAs(new Blob([arrayBuffer], { type: "application/pdf" }), "presentation.pdf");
  }

  // Convert hex color to rgb array
  function hexToRgb(hex: string) {
    const parsed = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return parsed ? [
      parseInt(parsed[1], 16),
      parseInt(parsed[2], 16),
      parseInt(parsed[3], 16)
    ] : [0, 0, 0];
  }

  // Convert hex to pdf-lib color object
  function hexToPdfColor(hex: string) {
    const [r, g, b] = hexToRgb(hex);
    return rgb(r / 255, g / 255, b / 255);
  }

  async function ensureBase64Image(img: string, fallbackType: "jpeg" | "png" = "jpeg") {
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
    progress: 0
  };

  // Reset on every refresh
  useEffect(() => {
    useBuilder.setState(defaultState);
  }, []);

  const handleReset = () => {
    useBuilder.setState(defaultState);
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight text-center">AI PPT Builder</h1>
      <p className="text-lg text-gray-700 text-center">
        Create professional presentations with AI-generated outlines and slides.
      </p>
      
      {/* Live Progress */}
      <h2 className="text-xl font-semibold">Live Progress</h2>
      <p className="text-md text-gray-600 mb-4">
        See real-time updates as your outline and slides are generated.
      </p>
      <LiveProgress />

      {/* Controls */}
      <div className="grid md:grid-cols-2 gap-4 bg-white p-4 rounded border">
        <div className="space-y-2">
          <Label className="text-md">Topic</Label>
          <Input
            className="border p-2 rounded w-full"
            value={topic}
            onChange={(e) => set({ topic: e.target.value })}
            placeholder="e.g., Renewable Energy"
          />
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="block text-md">Language</Label>
              <select
                className="border p-2 rounded w-full"
                value={language}
                onChange={(e) => set({ language: e.target.value as any })}
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
              <Label className="block text-md">Audience</Label>
              <select
                className="border p-2 rounded w-full"
                value={audience}
                onChange={(e) => useBuilder.setState({ audience: e.target.value as any })}
              >
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
              </select>
            </div>
            <div>
              <Label className="block text-md">Page Style</Label>
              <select
                className="border p-2 rounded w-full"
                value={pageStyle}
                onChange={(e) => useBuilder.setState({ pageStyle: e.target.value as any })}
              >
                <option value="16:9">16:9</option>
                <option value="4:3">4:3</option>
                <option value="A4">A4</option>
              </select>
            </div>
            <div>
              <Label className="block text-md">Slides</Label>
              <Input
                type="number"
                min={1}
                max={30}
                className="border p-2 rounded w-full"
                value={numSlides}
                onChange={(e) => useBuilder.setState({ numSlides: Number(e.target.value) })}
              />
            </div>
          </div>

          <Label className="block text-md">Theme</Label>
          <Themeselector />

          <Label className="block text-md mt-2">Image Size</Label>
          <select className="border p-2 rounded w-full" value={size} onChange={(e) => setSize(e.target.value)}>
            <option value="1280x720">1280×720 (HD)</option>
            <option value="1920x1080">1920×1080 (Full HD)</option>
            <option value="2560x1440">2560×1440 (QHD)</option>
          </select>

          <div className="flex gap-2 pt-2">
            <Button className="px-4 py-2 bg-black text-white rounded cursor-pointer text-white font-semibold py-3 text-lg shadow-lg" onClick={genOutline} disabled={!topic || isGenerating}>
              Generate Outline
            </Button>
            <Button className="px-4 py-2 bg-black text-white rounded cursor-pointer text-white font-semibold py-3 text-lg shadow-lg" onClick={buildSlides} disabled={!outline.length || isGenerating}>
              Build Slides
            </Button>
            <Button
              onClick={handleReset}
              className="px-3 py-2 bg-black text-white rounded cursor-pointer text-white font-semibold py-3 text-lg shadow-lg"
            >
              Reset All
            </Button>
          </div>
        </div>

        <div>
          <Label className="font-medium">Editable Outline</Label>
          <p className="text-md text-gray-600 mb-2">(You can edit the outline before generating slides)</p>
          <OutlineEditor />
        </div>
      </div>

      <div className="flex gap-2">
        <Button className="px-4 py-2 bg-black text-white rounded cursor-pointer text-white font-semibold py-3 text-lg shadow-lg" onClick={downloadPPTX} disabled={!slides.length}>
          Download PPTX
        </Button>
        <Button className="px-4 py-2 bg-black text-white rounded cursor-pointer text-white font-semibold py-3 text-lg shadow-lg" onClick={() => downloadPDF()} disabled={!slides.length}>
          Download PDF
        </Button>
      </div>

      <h2 className="text-xl font-semibold">Live Preview (editable)</h2>
      <p className="text-md text-gray-600">You can edit text directly on the slide thumbnails.</p>
      {/* Full Editability */}
      <SlideCanvas />
      <Features />
    </div>
  );
}
