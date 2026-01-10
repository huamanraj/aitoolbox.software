import Link from "next/link";

export const SEOContent = () => {
  return (
    <section className="py-16 px-4 bg-muted/20">
      <div className="container max-w-4xl">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-3xl font-bold mb-6">
            All Your AI Tools in One Place
          </h2>
          <p className="text-muted-foreground mb-4">
            AI Toolbox is your all-in-one platform for AI-powered creativity and productivity.
            Whether you need a{" "}
            <Link href="/tools/image-generator" className="text-primary hover:underline">
              free AI image generator
            </Link>
            , an{" "}
            <Link href="/tools/writing-assistant" className="text-primary hover:underline">
              AI writing assistant
            </Link>
            , or a{" "}
            <Link href="/tools/background-remover" className="text-primary hover:underline">
              background remover
            </Link>
            , we've got you covered. All tools are built-in, fast, and free to use with no signup
            required for basic features.
          </p>
          <p className="text-muted-foreground mb-4">
            Our platform includes powerful AI tools for{" "}
            <Link href="/?category=Image" className="text-primary hover:underline">
              image generation and editing
            </Link>
            ,{" "}
            <Link href="/?category=Writing" className="text-primary hover:underline">
              writing and content creation
            </Link>
            ,{" "}
            <Link href="/?category=Audio" className="text-primary hover:underline">
              audio transcription and text-to-speech
            </Link>
            , and{" "}
            <Link href="/?category=Design" className="text-primary hover:underline">
              design and branding
            </Link>
            . Each tool is optimized for speed and quality, running directly in your browser or
            on our servers for the best performance.
          </p>
          <h3 className="text-2xl font-bold mb-4 mt-8">Why Choose AI Toolbox?</h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
            <li><strong>100% Free Tools:</strong> Access powerful AI features without any cost</li>
            <li><strong>No Signup Required:</strong> Start using tools immediately, no registration needed</li>
            <li><strong>Fast & Reliable:</strong> Built with cutting-edge AI models for instant results</li>
            <li><strong>Privacy-Focused:</strong> Your data stays secure and private</li>
            <li><strong>Regular Updates:</strong> New tools and features added frequently</li>
          </ul>
        </div>
      </div>
    </section>
  );
};
