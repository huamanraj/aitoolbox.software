"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/theme-context";

export default function Navbar() {

  const { theme, setTheme} = useTheme();

  console.log(theme);


  const handleToggle = () => {
  setTheme(theme === "light" ? "dark" : "light");
};


  return (
    <header className="border-b bg-background h-[60px] w-full flex items-center px-4 z-10">
      <div className="container flex items-center justify-between">
        {/* Logo and Title */}
      <div>
        <Link href="/" className="flex items-center gap-2 md:ml-0 ml-12">
          <Image
            src="/logo.png"
            alt="AIToolbox Logo"
            width={36}
            height={36}
            className="rounded"
          />
          <span className="text-xl font-semibold hidden sm:inline">AIToolbox</span>
          {/* Show logo text on very small screens when space allows */}
          <span className="text-lg font-semibold sm:hidden">AIToolbox</span>
        </Link>
      </div>
      <div></div>
      <div>
        {theme==='dark'? <Sun  className="hover:cursor-pointer" onClick={handleToggle}/>: <Moon className="hover:cursor-pointer" onClick={handleToggle}/>}
      </div>
      </div>
    </header>
  );
}
