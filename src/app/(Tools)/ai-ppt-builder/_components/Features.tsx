"use client";
import React from "react";
import { FileEdit, Presentation } from "lucide-react";

export default function AIPPTBuilderInfo() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      {/* Header */}
      <header className="text-center">
        <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
          <Presentation className="h-6 w-6 text-primary" />
          AI PPT Builder Tool
        </h1>
        <p className="mt-3 text-base md:text-lg text-gray-600 text-left">
          Create stunning presentations instantly with our AI-powered PPT Builder.
        </p>
      </header>

      {/* Intro / Value */} 
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Why Use Our AI PPT Builder?</h2>
          <ul className="mt-3 space-y-2 text-sm text-gray-700 list-disc list-inside">
            <li>Generate complete presentations in seconds</li>
            <li>Choose from multiple themes, layouts, and styles</li>
            <li>Automatic formatting and professional design</li>
            <li>Ideal for business, education, and personal projects</li>
            <li>Saves time and ensures visual consistency</li>
            <li>No design expertise needed</li>
          </ul>
        </div>

        <div className="rounded-2xl border p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Quick &amp; Easy to Use</h2>
          <ol className="mt-3 space-y-2 text-sm text-gray-700 list-decimal list-inside">
            <li>Enter your topic or presentation outline</li>
            <li>Select the audience type and desired theme</li>
            <li>Click “Generate Slides”</li>
            <li>Review, edit, or download as PPTX/PDF</li>
          </ol>
        </div>

        <div className="rounded-2xl border p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Human-like Design Quality</h2>
          <p className="mt-3 text-sm text-gray-700">
            Our AI understands content hierarchy, readability, and visual flow.
            Each slide emphasizes key points, integrates images, and keeps a cohesive,
            professional style.
          </p>
        </div>
      </div>

      {/* How to Use */}
      <section className="mt-10 rounded-2xl border p-6 shadow-sm">
        <h2 className="text-xl font-semibold">How to Use the AI PPT Builder</h2>
        <ol className="mt-4 space-y-2 text-gray-700 list-decimal list-inside">
          <li>Input your topic, outline, or slide content</li>
          <li>Select the audience, theme, and layout</li>
          <li>Click “Generate” to produce slides automatically</li>
          <li>Edit slides if needed, then download as PPTX or PDF</li>
          <li>Present directly or share with your team</li>
        </ol>
      </section>

      {/* Tips */}
      <section className="mt-6 rounded-2xl border p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Tips for Best Results</h2>
        <ul className="mt-4 space-y-2 text-gray-700 list-disc list-inside">
          <li>Be clear and concise in your outline</li>
          <li>Specify tone or style (formal, creative, corporate)</li>
          <li>Include key points per slide to guide AI</li>
          <li>Add images or icons for visual impact</li>
          <li>Review generated slides for accuracy</li>
        </ul>
      </section>

      {/* Perfect For */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold">Perfect For</h2>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border p-6 shadow-sm">
            <h3 className="font-semibold">Business &amp; Professional</h3>
            <p className="mt-2 text-gray-700 text-sm">
              Create pitch decks, reports, and marketing presentations that impress.
            </p>
          </div>
          <div className="rounded-2xl border p-6 shadow-sm">
            <h3 className="font-semibold">Education &amp; Learning</h3>
            <p className="mt-2 text-gray-700 text-sm">
              Build lecture slides, study materials, and visual aids quickly.
            </p>
          </div>
          <div className="rounded-2xl border p-6 shadow-sm">
            <h3 className="font-semibold">Personal Projects</h3>
            <p className="mt-2 text-gray-700 text-sm">
              Design slides for workshops, webinars, and storytelling.
            </p>
          </div>
          <div className="rounded-2xl border p-6 shadow-sm">
            <h3 className="font-semibold">Content &amp; Marketing</h3>
            <p className="mt-2 text-gray-700 text-sm">
              Produce polished visuals for social media, campaigns, and websites.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works (condensed) */}
      <section className="mt-10 rounded-2xl border p-6 shadow-sm">
        <h2 className="text-xl font-semibold">How It Works</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-5 text-sm text-gray-700">
          <div className="rounded-lg border p-4">Enter topic or paste outline</div>
          <div className="rounded-lg border p-4">Select theme, layout, audience</div>
          <div className="rounded-lg border p-4">Click “Generate Slides”</div>
          <div className="rounded-lg border p-4">Preview &amp; edit</div>
          <div className="rounded-lg border p-4">Download PPTX or PDF</div>
        </div>
      </section>
    </section>
  );
}
