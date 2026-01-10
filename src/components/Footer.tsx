import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image src="/logo.png" alt="AI Toolbox" width={32} height={32} className="h-8 w-8" />
              <span className="text-lg font-semibold">AI Toolbox</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Free AI tools for everyone. Create, enhance, and optimize with artificial intelligence.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Popular Tools</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/free-image-generator" className="text-muted-foreground hover:text-foreground transition-colors duration-150">
                  Free Image Generator
                </Link>
              </li>
              <li>
                <Link href="/free-tattoo-generator" className="text-muted-foreground hover:text-foreground transition-colors duration-150">
                  Tattoo Generator
                </Link>
              </li>
              <li>
                <Link href="/free-bio-generator" className="text-muted-foreground hover:text-foreground transition-colors duration-150">
                  Bio Generator
                </Link>
              </li>
              <li>
                <Link href="/free-bedtime-story-generator" className="text-muted-foreground hover:text-foreground transition-colors duration-150">
                  Bedtime Story Generator
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/free-image-generator" className="text-muted-foreground hover:text-foreground transition-colors duration-150">
                  Image Tools
                </Link>
              </li>
              <li>
                <Link href="/free-bio-generator" className="text-muted-foreground hover:text-foreground transition-colors duration-150">
                  Writing Tools
                </Link>
              </li>
              <li>
                <Link href="/llms-txt-generator" className="text-muted-foreground hover:text-foreground transition-colors duration-150">
                  Coding Tools
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-muted-foreground hover:text-foreground transition-colors duration-150">
                  Blog & Resources
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors duration-150">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-muted-foreground hover:text-foreground transition-colors duration-150">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors duration-150">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="text-muted-foreground hover:text-foreground transition-colors duration-150">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} AI Toolbox. All rights reserved. Free AI tools for everyone.</p>
        </div>
      </div>
    </footer>
  );
};
