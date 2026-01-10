"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Moon, Sun, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const scrollToTools = () => {
    const toolsSection = document.getElementById("tools");
    if (toolsSection) {
      toolsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      className={`sticky top-0 md:top-4 z-50 w-full md:max-w-5xl md:mx-auto rounded-none md:rounded-full border-b md:border border-border/40 transition-all duration-150 ${
        scrolled
          ? "shadow-md bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          : "bg-background/50 backdrop-blur-sm"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex h-14 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="AI Toolbox - Free AI Tools"
              width={28}
              height={28}
              className="h-7 w-7"
            />
            <span className="text-lg font-semibold hidden sm:inline-block">
              AI Toolbox
            </span>
          </Link>
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent">
                    All Tools
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[700px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md relative overflow-hidden"
                            href="/"
                          >
                            <div className="absolute inset-0 z-0 opacity-10">
                              <Image
                                src="/logo.png"
                                alt="AI Toolbox Logo"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="relative z-10">
                              <div className="mb-2 mt-4 text-lg font-medium">
                                AI Toolbox
                              </div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                Access our complete suite of free AI-powered
                                tools for creators, developers, and writers.
                              </p>
                            </div>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <div className="grid grid-cols-2 gap-3">
                        <ListItem
                          href="/free-image-generator"
                          title="Image Generator"
                        >
                          Create stunning AI images from text.
                        </ListItem>
                        <ListItem
                          href="/free-tattoo-generator"
                          title="Tattoo Generator"
                        >
                          Design custom tattoo art instantly.
                        </ListItem>
                        <ListItem
                          href="/free-bio-generator"
                          title="Bio Generator"
                        >
                          Perfect social media bios in seconds.
                        </ListItem>
                        <ListItem
                          href="/free-bedtime-story-generator"
                          title="Story Generator"
                        >
                          Magical bedtime stories for kids.
                        </ListItem>
                        <ListItem
                          href="/content-summarizer"
                          title="Summarizer"
                        >
                          Summarize long articles instantly.
                        </ListItem>
                        <ListItem
                          href="/llms-txt-generator"
                          title="LLMs.txt"
                        >
                          Generate llms.txt for your site.
                        </ListItem>
                      </div>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent">
                    Image Tools
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <ListItem
                        href="/free-image-generator"
                        title="Image Generator"
                      >
                        Turn text descriptions into beautiful images.
                      </ListItem>
                      <ListItem
                        href="/free-tattoo-generator"
                        title="Tattoo Generator"
                      >
                        Design custom tattoo art with AI.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent">
                    Writing Tools
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <ListItem
                        href="/free-bio-generator"
                        title="Bio Generator"
                      >
                        Create perfect social media bios.
                      </ListItem>
                      <ListItem
                        href="/content-summarizer"
                        title="Content Summarizer"
                      >
                        Condense long text into key points.
                      </ListItem>
                      <ListItem
                        href="/free-bedtime-story-generator"
                        title="Bedtime Story Generator"
                      >
                        Personalized stories for kids.
                      </ListItem>
                      <ListItem
                        href="/llms-txt-generator"
                        title="LLMs.txt Generator"
                      >
                        Improve your site's AI visibility.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/blogs"
                      className={navigationMenuTriggerStyle() + " bg-transparent"}
                    >
                      Blog
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="h-9 w-9 rounded-full"
          >
            {mounted && (
              <>
                {theme === "light" ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
              </>
            )}
            {!mounted && <div className="h-4 w-4" />}
          </Button>
          <div className="hidden sm:block">
            <Button className="h-9 px-4 rounded-full text-sm" asChild>
              <Link href="/free-image-generator">Try Free</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[400px] pr-6 pl-6"
              >
                <motion.nav
                  className="flex flex-col gap-6 mt-10"
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                >
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, x: 20 },
                      show: { opacity: 1, x: 0 },
                    }}
                  >
                    <Link href="/" className="flex items-center gap-2 mb-2">
                      <Image
                        src="/logo.png"
                        alt="AI Toolbox"
                        width={32}
                        height={32}
                        className="h-8 w-8"
                      />
                      <span className="text-lg font-semibold">AI Toolbox</span>
                    </Link>
                  </motion.div>

                  <motion.button
                    variants={{
                      hidden: { opacity: 0, x: 20 },
                      show: { opacity: 1, x: 0 },
                    }}
                    onClick={scrollToTools}
                    className="text-left text-lg font-medium text-foreground/80 hover:text-foreground transition-colors"
                  >
                    All Tools
                  </motion.button>

                  <motion.div
                    variants={{
                      hidden: { opacity: 0, x: 20 },
                      show: { opacity: 1, x: 0 },
                    }}
                  >
                    <Link
                      href="/free-image-generator"
                      className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors block"
                    >
                      Image Tools
                    </Link>
                  </motion.div>

                  <motion.div
                    variants={{
                      hidden: { opacity: 0, x: 20 },
                      show: { opacity: 1, x: 0 },
                    }}
                  >
                    <Link
                      href="/free-bio-generator"
                      className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors block"
                    >
                      Writing Tools
                    </Link>
                  </motion.div>

                  <motion.div
                    variants={{
                      hidden: { opacity: 0, x: 20 },
                      show: { opacity: 1, x: 0 },
                    }}
                  >
                    <Link
                      href="/blogs"
                      className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors block"
                    >
                      Blog
                    </Link>
                  </motion.div>

                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0 },
                    }}
                    className="mt-6 pt-6 border-t"
                  >
                    <Button
                      className="w-full rounded-full h-11 text-base"
                      asChild
                    >
                      <Link href="/free-image-generator">
                        Try Free Image Generator
                      </Link>
                    </Button>
                  </motion.div>
                </motion.nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

const ListItem = ({
  className,
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"a"> & { href: string; title: string }) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${className}`}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};
