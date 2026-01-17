import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ImageGenerator } from "@/components/tools/ImageGenerator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, AlertCircle, CheckCircle, Sparkles } from "lucide-react";

export default function FreeImageGeneratorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8 px-4">
        <div className="container max-w-7xl mx-auto space-y-12">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              🎨 Free AI Image Generator
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transform your ideas into stunning visuals with our advanced AI
              image generator. Create unlimited high-quality images from text
              descriptions—completely free, no login required, and ready in
              seconds.
            </p>
          </div>

          {/* Tool Component */}
          <ImageGenerator />

          {/* What is This Tool Section */}
          <section className="prose prose-slate dark:prose-invert max-w-none">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-primary" />
                  What is the Free AI Image Generator?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Our Free AI Image Generator is a powerful text-to-image tool
                  that uses advanced artificial intelligence to create unique,
                  high-quality images based on your text descriptions (prompts).
                  Powered by the Pollinations.AI API with state-of-the-art
                  models like Flux, this tool transforms your creative ideas
                  into visual artwork in seconds.
                </p>
                <p>
                  Unlike many AI image generators that require subscriptions,
                  credits, or account creation, our tool is 100% free and
                  accessible to everyone. Simply describe what you want to see,
                  choose your preferred dimensions, and watch as AI brings your
                  vision to life. Whether you're a designer, marketer, content
                  creator, or just exploring AI capabilities, this tool makes
                  professional-quality image generation accessible to all.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Use Cases Section */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Popular Use Cases</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">
                    Social Media Content
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p className="mb-3">
                    Create eye-catching visuals for Instagram, Facebook,
                    Twitter, and LinkedIn posts. Generate unique images that
                    stand out in crowded feeds and boost engagement.
                  </p>
                  <p className="text-sm font-semibold">Example Prompt:</p>
                  <p className="text-sm italic">
                    "Modern minimalist workspace with laptop, coffee cup, and
                    plants, bright natural lighting, professional photography
                    style"
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">
                    Blog & Article Headers
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p className="mb-3">
                    Generate custom header images for blog posts, articles, and
                    website content. Create visuals that perfectly match your
                    content theme without stock photo limitations.
                  </p>
                  <p className="text-sm font-semibold">Example Prompt:</p>
                  <p className="text-sm italic">
                    "Abstract digital technology background with blue and purple
                    gradients, circuit board patterns, futuristic and clean"
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Marketing Materials</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p className="mb-3">
                    Design unique graphics for advertisements, email campaigns,
                    presentations, and promotional content. Save time and money
                    on stock photos or graphic designers.
                  </p>
                  <p className="text-sm font-semibold">Example Prompt:</p>
                  <p className="text-sm italic">
                    "Happy diverse team celebrating success in modern office,
                    high-five, bright colors, corporate photography style"
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Product Mockups</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p className="mb-3">
                    Visualize product concepts, create mockup backgrounds, or
                    generate lifestyle images showcasing your products in
                    realistic settings before production.
                  </p>
                  <p className="text-sm font-semibold">Example Prompt:</p>
                  <p className="text-sm italic">
                    "Elegant product photography setup with white marble
                    surface, soft shadows, luxury cosmetic bottle, studio
                    lighting"
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Creative Projects</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p className="mb-3">
                    Explore artistic ideas, create concept art, generate
                    illustrations for stories, or produce unique artwork for
                    personal projects and portfolios.
                  </p>
                  <p className="text-sm font-semibold">Example Prompt:</p>
                  <p className="text-sm italic">
                    "Whimsical fantasy forest with glowing mushrooms, fairy
                    lights, magical atmosphere, digital art style, vibrant
                    colors"
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Educational Content</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p className="mb-3">
                    Create visual aids for presentations, educational materials,
                    infographics, or teaching resources that help explain
                    complex concepts visually.
                  </p>
                  <p className="text-sm font-semibold">Example Prompt:</p>
                  <p className="text-sm italic">
                    "Scientific diagram style illustration of solar system with
                    planets orbiting sun, educational poster aesthetic, clear
                    labels"
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* How It Works Section */}
          <section>
            <h2 className="text-3xl font-bold mb-6">
              How Does AI Image Generation Work?
            </h2>
            <Card>
              <CardContent className="pt-6 space-y-4 text-muted-foreground">
                <p>
                  Our AI image generator uses a sophisticated process called
                  "diffusion modeling" to create images from text. Here's a
                  simplified breakdown of what happens when you generate an
                  image:
                </p>

                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Text Understanding
                      </h3>
                      <p>
                        The AI analyzes your text prompt, breaking it down into
                        concepts, objects, styles, colors, and moods. It
                        understands context and relationships between words.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Image Generation
                      </h3>
                      <p>
                        Starting from random noise, the AI model gradually
                        refines the image through multiple steps, guided by your
                        prompt. It uses patterns learned from millions of images
                        during training.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Quality Refinement
                      </h3>
                      <p>
                        The model iteratively improves the image, adding
                        details, adjusting composition, and ensuring the output
                        matches your description while maintaining visual
                        coherence and quality.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                      4
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Final Output
                      </h3>
                      <p>
                        After processing, you receive a high-resolution image
                        that you can download and use immediately. The entire
                        process typically takes just 5-15 seconds.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Tips for Better Results */}
          <section>
            <h2 className="text-3xl font-bold mb-6">
              Tips for Creating Better AI Images
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    Writing Effective Prompts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-muted-foreground">
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Be Specific and Descriptive
                    </h4>
                    <p className="text-sm">
                      Instead of "a dog," try "a golden retriever puppy playing
                      in a sunny park, shallow depth of field, professional pet
                      photography"
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Include Style References
                    </h4>
                    <p className="text-sm">
                      Mention artistic styles like "oil painting,"
                      "photorealistic," "watercolor," "digital art," or
                      "cinematic" to guide the aesthetic
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Specify Lighting and Mood
                    </h4>
                    <p className="text-sm">
                      Add details like "golden hour lighting," "dramatic
                      shadows," "soft diffused light," or "moody atmosphere" for
                      better results
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Mention Colors and Composition
                    </h4>
                    <p className="text-sm">
                      Include color palettes ("warm autumn tones," "vibrant neon
                      colors") and composition ("centered," "rule of thirds,"
                      "wide angle")
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Best Practices
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-muted-foreground">
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Start Simple, Then Refine
                    </h4>
                    <p className="text-sm">
                      Begin with a basic prompt, see the result, then add more
                      details in subsequent generations to fine-tune the output
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Use Comma-Separated Keywords
                    </h4>
                    <p className="text-sm">
                      Structure your prompt with commas: "subject, action,
                      setting, style, lighting, mood" for clearer AI
                      interpretation
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Experiment with Dimensions
                    </h4>
                    <p className="text-sm">
                      Try different aspect ratios—square (1024x1024) for social
                      media, landscape for headers, portrait for mobile content
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Learn from Examples
                    </h4>
                    <p className="text-sm">
                      Study successful prompts from AI art communities and adapt
                      their techniques to your needs
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Limitations Section */}
          <section>
            <h2 className="text-3xl font-bold mb-6">
              Limitations & When Not to Use This Tool
            </h2>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-6 w-6 text-orange-500" />
                  Important Limitations to Consider
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Text in Images
                  </h3>
                  <p>
                    AI image generators often struggle with rendering accurate
                    text, letters, or numbers within images. If you need images
                    with specific text (logos, signs, labels), consider using
                    graphic design software instead or adding text in
                    post-processing.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Specific People or Copyrighted Characters
                  </h3>
                  <p>
                    The tool cannot generate images of real, identifiable people
                    or copyrighted characters. This is both a technical
                    limitation and an ethical safeguard. Use generic
                    descriptions instead of celebrity names or trademarked
                    characters.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Precise Technical Accuracy
                  </h3>
                  <p>
                    While AI can create visually impressive images, it may not
                    be accurate for technical diagrams, scientific illustrations
                    requiring precision, or architectural blueprints. For these,
                    use specialized CAD or illustration software.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Consistency Across Multiple Images
                  </h3>
                  <p>
                    Each generation is unique, making it challenging to create
                    consistent characters or objects across multiple images. If
                    you need a series of images with the same subject, you may
                    need to generate many variations and select the most similar
                    ones.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Complex Spatial Relationships
                  </h3>
                  <p>
                    The AI may struggle with complex spatial arrangements,
                    specific numbers of objects (e.g., "exactly five apples"),
                    or precise positioning. Results may vary from your exact
                    specifications.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Commercial Use Considerations
                  </h3>
                  <p>
                    While the tool is free to use, always review the
                    Pollinations.AI terms of service for commercial usage
                    rights. For critical commercial projects, consider
                    consulting with a legal professional about AI-generated
                    content licensing.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* FAQ Section */}
          <section>
            <h2 className="text-3xl font-bold mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Is this AI image generator really free?
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>
                    Yes, absolutely! Our AI image generator is completely free
                    with no hidden costs, subscriptions, or credit systems. You
                    can generate unlimited images without creating an account or
                    providing payment information. We're powered by
                    Pollinations.AI's free tier, which makes advanced AI
                    accessible to everyone.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Do I need to create an account to use this tool?
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>
                    No account required! Simply visit this page, enter your
                    prompt, and start generating images immediately. We believe
                    in making AI tools accessible without barriers like
                    registration or login.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    What AI model powers this image generator?
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>
                    This tool uses the Flux model via Pollinations.AI, which is
                    a state-of-the-art text-to-image diffusion model. Flux is
                    known for producing high-quality, detailed images with
                    excellent understanding of complex prompts and
                    natural-looking results.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Can I use the generated images commercially?
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>
                    Generally, yes, but we recommend reviewing Pollinations.AI's
                    terms of service for the most current licensing information.
                    AI-generated images typically have fewer restrictions than
                    stock photos, but it's always wise to verify usage rights
                    for commercial projects, especially high-value ones.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    How long does it take to generate an image?
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>
                    Most images generate in 5-15 seconds, depending on server
                    load and image complexity. Higher resolutions may take
                    slightly longer. The process is significantly faster than
                    traditional graphic design or commissioning custom artwork.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    What image sizes can I generate?
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>
                    You can choose from multiple dimensions: 512x512px (small,
                    fast), 768x768px (medium), 1024x1024px (large, recommended),
                    and 1280x1280px (extra large). All sizes are suitable for
                    digital use, with larger sizes providing more detail for
                    printing or high-resolution displays.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Why didn't my image turn out as expected?
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>
                    AI image generation is probabilistic, meaning results can
                    vary. Try refining your prompt with more specific details,
                    style references, or lighting descriptions. Sometimes
                    generating multiple variations helps you find the perfect
                    result. Review our tips section above for prompt-writing
                    best practices.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Can I generate images of real people or celebrities?
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>
                    No, the tool cannot and will not generate images of
                    identifiable real people, celebrities, or public figures.
                    This protects privacy and prevents misuse. Instead, use
                    generic descriptions like "a professional businesswoman" or
                    "an elderly man with a beard."
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Are there any content restrictions?
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>
                    Yes, the AI has built-in safety filters that prevent
                    generation of inappropriate, violent, or harmful content.
                    Prompts that violate these guidelines will be rejected. This
                    ensures the tool remains safe and appropriate for all users.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    How can I download my generated images?
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>
                    Once your image is generated, simply click the "Download"
                    button that appears next to the image. The image will be
                    saved to your device's default download location as a PNG
                    file with a unique timestamp filename.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Related Tools Section */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Related AI Tools</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  Explore more free AI tools on AI Toolbox to enhance your
                  creative workflow:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <a
                    href="/"
                    className="block p-4 rounded-lg border hover:border-primary transition-colors"
                  >
                    <h3 className="font-semibold mb-1">All AI Tools</h3>
                    <p className="text-sm text-muted-foreground">
                      Browse our complete collection of free AI-powered tools
                    </p>
                  </a>
                  <div className="p-4 rounded-lg border opacity-50">
                    <h3 className="font-semibold mb-1">
                      More Tools Coming Soon
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      We're constantly adding new AI tools to help you create
                      better content
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
