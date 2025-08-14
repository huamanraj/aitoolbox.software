"use client";
import Head from "next/head";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import ResumeForm from "./ResumeForm";
import { initialResumeValues } from "../constant";
import ResumePreviewSection from "./ResumePreviewSection";
import { useResume } from "@/contexts/resume-context";
import Loader from "./Loader";
import NativeBannerAd from "@/components/NativeBannerAd";
// Debounce function
const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

export default function ResumeBuilder() {
    const { resumeData, setResumeData,isLoaded } = useResume();
  const [mobileView, setMobileView] = useState<"form" | "preview">("form");

  useEffect(() => {
  // Only access localStorage after mount
  if (typeof window !== "undefined") {
    const savedData = localStorage.getItem("resumeData");
    if (savedData) {
      setResumeData(JSON.parse(savedData));
    }
  }
}, []);

  // Debounced save function
  const saveToLocalStorage = debounce((data: typeof initialResumeValues) => {
    localStorage.setItem("resumeData", JSON.stringify(data));
  }, 1000); // 1 second debounce

  // Save to localStorage whenever resumeData changes
  useEffect(() => {
    saveToLocalStorage(resumeData);
  }, [resumeData]);


  
  if (!isLoaded) {
    return <Loader/>
  }

  return (
    <>
      <Head key="resume-builder">
        <title>Resume Builder</title>
        <meta
          name="description"
          content="Create professional resumes"
        />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center lg:mb-12">
          <h1 className="text-3xl font-bold lg:text-4xl">Resume Builder</h1>
          <p className="mt-2 text-gray-600 lg:text-lg">
            Create professional resume instantly
          </p>
        </header>

        {/* Mobile Toggle Button */}
        <div className="mb-4 flex justify-center lg:hidden">
          <Button
            variant="outline"
            onClick={() =>
              setMobileView(mobileView === "form" ? "preview" : "form")
            }
            className="gap-2"
          >
            <Eye className="h-4 w-4" />
            {mobileView === "form" ? "Show Preview" : "Show Form"}
          </Button>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex lg:gap-8">
          {/* Form Section */}
          <div className="w-full lg:w-1/2">
            <ResumeForm />
          </div>

          {/* Preview Section */}
          <div className="sticky top-4 h-fit w-full lg:w-1/2">
            <div suppressHydrationWarning className="rounded-lg border p-4 shadow-sm">
              <ResumePreviewSection
              />
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          {mobileView === "form" ? (
            <ResumeForm  />
          ) : (
            <div suppressHydrationWarning className="rounded-lg border p-4 shadow-sm">
              <ResumePreviewSection
              />
            </div>
          )}
        </div>
      {/* Ad Banner */}
      <NativeBannerAd />
         
       
      </div>
    </>
  );
}
