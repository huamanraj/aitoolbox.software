"use client";

import React, { useState } from "react";
import BioGeneratorForm from "./bio-generator-form";
import BioGeneratorOutput from "./bio-generator-output";

const BioGeneratorClient = () => {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleGenerateBio = async (input: string) => {
    setLoading(true);         // Start loading
  setError("");             // Clear previous error
  setOutput(""); 
  try {
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "chat",
        prompt:`Write a short professional bio in 3-4 lines using this information: ${input}. Do not explain or give general advice, only output the bio.`,      
        options: {
          model: "openai",     
        },
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Something went wrong");
    }
    setOutput(data.data); 
  } catch (err: any) {
    console.error("Bio generation error:", err.message);
    setOutput("Error generating bio.");
  } finally {
    setLoading(false);      // Stop loading
  }
};

  return (
    <div className="p-4 w-[70%] mx-auto">
    
       <div className="text-center my-6 mt-17 ">
  <h2 className="text-3xl font-semibold">✨ Ready to Level Up Your Personal Brand?</h2>
  <p className="mt-2 text-gray-700">Enter your details below and let our AI instantly craft the perfect professional bio for LinkedIn, resumes, personal websites, and more!</p>
</div>

      <h1 className="text-4xl font-bold mb-4 text-center text-indigo-700 mt-20">🧠 AI Bio Generator</h1>
      <BioGeneratorForm onGenerate={handleGenerateBio} />
      {loading && <p className="text-blue-500 mt-4">Generating...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <BioGeneratorOutput output={output} isLoading={loading} />

       <div className="text-sm text-gray-600 mt-20  mx-auto">
  <h3 className="font-bold text-lg mb-2">Why Our Users Love It:</h3>
  <ul className="list-disc pl-5 space-y-1">
    <li>No login required — 100% free to use</li>
    <li>AI-generated bios that sound human and professional</li>
    <li>Works for all industries: tech, design, marketing, academics, and more</li>
    <li>Improve your online presence in under 30 seconds</li>
    <li>Fully customizable output you can tweak and reuse</li>
  </ul>
  <p className="mt-4">
    Whether you're applying for internships, freelancing, or showcasing your skills on your portfolio, your bio matters. <strong>This AI tool ensures you're putting your best foot forward — always.</strong>
  </p>
</div>

     <div className="upperText mt-10 text-gray-800">
  <p className="font-bold text-3xl mb-4"> Welcome to the AI Bio Generator</p>

  <p className="text-lg mb-4">
    <span className="font-semibold">Instantly</span> create a professional, personalized bio in just a few clicks.
  </p>

  <p className="mb-4">
    Struggling to write a compelling bio for your <span className="font-medium">resume, LinkedIn profile, portfolio, or website</span>? You're in the right place.
  </p>

  <p className="mb-4">
    Our AI-powered Bio Generator makes it easy to craft well-written, customized bios in seconds — no writing skills required. Just enter a few details like your <span className="font-medium">name, role, background,</span> or <span className="font-medium">interests</span>, and click <strong>Generate Bio</strong>. Let the AI do the rest!
  </p>

  <p className="mb-4 font-semibold">✔ Perfect for:</p>

  <ul className="list-disc list-inside mb-6">
    <li>LinkedIn bios</li>
    <li>Resume summaries</li>
    <li>Portfolio introductions</li>
    <li>Instagram & Twitter bios</li>
    <li>Freelance profile descriptions</li>
    <li>Personal websites and blogs</li>
    <li>College & scholarship applications</li>
  </ul>

  <p className="italic text-sm text-gray-600">
    Designed for <strong>students, developers, professionals, and creatives</strong> who want to stand out with a polished online presence.
  </p>
</div>

      <div>
      <h1 className="font-bold text-3xl mt-30"> 📝 How to Use the AI Bio Generator </h1> 
      <p className="text-xl mt-10 font-bold">Welcome to the AI Bio Generator! </p>
      Follow these simple steps to create a professional and personalized bio :<br/><br/>
      <span className="font-bold">Enter your details – </span> Tell us about yourself : your name , role , background, and anything you'd like in your bio.
      <br/>
      <span className="font-bold">Click “Generate” – </span> Our AI will craft a well-written bio just for you.
      <br/>
      <span className="font-bold">Copy & Use – </span> Once it appears, feel free to copy your new bio and use it on LinkedIn, your portfolio, or anywhere you like.

🚀 <br/>
     <span className="font-bold">Perfect for students, developers, professionals, and creatives!</span>
        <p className="italic text-sm text-gray-600 mt-5">
      💡 Tip: Keep your input short and clear. The better your details, the stronger the bio!
     </p>
      </div>

      <div className="mt-12 text-gray-800 leading-relaxed">
  <h2 className="text-2xl font-bold mb-4">Why Use Our AI Bio Generator?</h2>
  
  <p className="mb-4">
    Writing a personal or professional bio can feel awkward and time-consuming. Whether you're applying for jobs, building your online presence, or submitting a portfolio, the right words matter — and that's where our AI Bio Generator shines.
  </p>

  <p className="mb-4">
    Our smart AI crafts bios that are tailored, engaging, and keyword-rich. It adapts your tone and role — from creative to technical — and delivers bios that resonate with your audience.
  </p>

  <h3 className="text-xl font-semibold mt-6 mb-2">✨ Key Features:</h3>
  <ul className="list-disc list-inside mb-6">
    <li>AI-crafted bios in seconds — no writing skills needed</li>
    <li>Customize for LinkedIn, resumes, personal websites, or social profiles</li>
    <li>Perfect for developers, students, freelancers, creatives, and professionals</li>
    <li>Save time and avoid writer’s block</li>
    <li>Works on any device — no sign-up required</li>
  </ul>

  <h3 className="text-xl font-semibold mt-6 mb-2">🛠 How It Works:</h3>
  <ol className="list-decimal list-inside mb-6">
    <li>Type your name, role, and a short background</li>
    <li>Click “Generate Bio”</li>
    <li>Copy your AI-generated bio and use it wherever you need it</li>
  </ol>

  <p className="mb-6">
    Ready to build your personal brand? Whether you're networking on LinkedIn, launching a freelance business, or applying for internships, our tool gives you the professional edge.
  </p>

<div className="mt-20  mx-auto">
  <h3 className="font-bold text-xl mb-4">🙋 Frequently Asked Questions</h3>
  <details className="mb-3">
    <summary className="cursor-pointer font-medium">Is this tool really free to use?</summary>
    <p className="pl-4 pt-2 text-gray-600">Yes! Our AI bio generator is completely free and doesn't require sign-ups or logins.</p>
  </details>
  <details className="mb-3">
    <summary className="cursor-pointer font-medium">Can I customize the generated bio?</summary>
    <p className="pl-4 pt-2 text-gray-600">Absolutely! The generated bio is yours to edit, shorten, or expand to match your tone and platform.</p>
  </details>
  <details className="mb-3">
    <summary className="cursor-pointer font-medium">Is this bio generator suitable for students?</summary>
    <p className="pl-4 pt-2 text-gray-600">Yes — it's perfect for students creating scholarship bios, resumes, or online profiles.</p>
  </details>
</div>


  <p className="text-center font-semibold text-purple-700 mt-10">
    🎯 Don’t let words hold you back — craft your perfect bio in one click.
  </p>
</div>

    </div>
  );
};

export default BioGeneratorClient;
