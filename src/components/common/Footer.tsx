// "use client";
// import Link from "next/link";
// import Image from "next/image";

// const aiTools = [
//   { label: "Logo Generator", url: "/logo-generator" },
//   { label: "Blog Writer", url: "/blog-writer" },
//   { label: "Grammar Fixer", url: "/grammar-fixer" },
//   { label: "Idea Generator", url: "/idea-generator" },
//   { label: "Resume Builder", url: "/resume-builder" },
//   { label: "Image Generator", url: "/image-generator" },
//   { label: "Anime AI Generator", url: "/anime-ai-generator" },
//   { label: "YouTube Summarizer", url: "/youtube-summarizer" },
//   { label: "Code Explainer", url: "/code-explainer" },
//   { label: "LinkedIn Post Generator", url: "/linkedin-post-generator" },
// ];

// const policyLinks = [
//   { label: "Privacy Policy", url: "/privacy-policy" },
//   { label: "Terms of Service", url: "/terms-of-service" },
//   { label: "Cookie Policy", url: "/cookie-policy" },
// ];

// const extraInfo = [
//   { label: "About Us", url: "/about" },
//   { label: "Settings", url: "/settings" },
//   { label: "GitHub", url: "https://github.com/aitoolbox" },
// ];

// export default function SiteFooter() {
//   // tools section into column for background designs 
//   const half = Math.ceil(aiTools.length / 2);
//   const leftTools = aiTools.slice(0, half);
//   const rightTools = aiTools.slice(half);

//   // link styles when hover it 
//   const linkStyle =
//     "text-gray-200 hover:text-black hover:drop-shadow-[0_0_4px_rgba(255,255,255,0.7)] visited:text-gray-200 transition duration-200 transform hover:scale-105 inline-block";

//   return (
//     <footer className="w-full text-gray-100">
//       {/* background design  */}
//       <div className="relative bg-[#636363]">
//         <div className="absolute inset-0 h-[90%] bg-[#909090] transform -skew-y-2 origin-top"></div>

//         <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 px-6 py-10">
//           {/* logo of the app */}
//           <div className="flex flex-col gap-3 md:col-span-2">
//             <Image
//               src="/logo.png"
//               alt="AI Toolbox Logo"
//               width={140}
//               height={40}
//               className="object-contain"
//             />
//             <span className="text-lg font-semibold text-white">AI Toolbox</span>
//             <p className="text-sm text-gray-200 leading-relaxed">
//               Discover a wide collection of AI-powered utilities crafted to make
//               your work easier — from writing and coding to image generation
//               and productivity hacks.
//             </p>
//           </div>

//           {/* first column */}
//           <div>
//             <h4 className="text-white font-semibold mb-2">AI Tools</h4>
//             <ul className="space-y-1 text-sm">
//               {leftTools.map((tool) => (
//                 <li key={tool.url}>
//                   <Link href={tool.url} className={linkStyle}>
//                     {tool.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* second column */}
//           <div>
//             <h4 className="text-white font-semibold mb-2">More Tools</h4>
//             <ul className="space-y-1 text-sm">
//               {rightTools.map((tool) => (
//                 <li key={tool.url}>
//                   <Link href={tool.url} className={linkStyle}>
//                     {tool.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* last column  */}
//           <div>
//             <h4 className="text-white font-semibold mb-2">Information</h4>
//             <ul className="space-y-1 text-sm">
//               {extraInfo.map((item) => (
//                 <li key={item.url}>
//                   <Link href={item.url} className={linkStyle}>
//                     {item.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* last line including copyright links etc */}
//       <div className="bg-[#636363]">
//         <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 py-4 gap-3">
//           <div className="text-gray-200 text-xs">
//             &copy; {new Date().getFullYear()} AI Toolbox. All Rights Reserved.
//           </div>
//           <div className="flex gap-4 text-xs">
//             {policyLinks.map((item) => (
//               <Link key={item.url} href={item.url} className={linkStyle}>
//                 {item.label}
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

"use client";
import Link from "next/link";
import Image from "next/image";

const aiTools = [
  { label: "Logo Generator", url: "/logo-generator" },
  { label: "Blog Writer", url: "/blog-writer" },
  { label: "Grammar Fixer", url: "/grammar-fixer" },
  { label: "Idea Generator", url: "/idea-generator" },
  { label: "Resume Builder", url: "/resume-builder" },
  { label: "Image Generator", url: "/image-generator" },
  { label: "Anime AI Generator", url: "/anime-ai-generator" },
  { label: "YouTube Summarizer", url: "/youtube-summarizer" },
  { label: "Code Explainer", url: "/code-explainer" },
  { label: "LinkedIn Post Generator", url: "/linkedin-post-generator" },
];

const policyLinks = [
  { label: "Privacy Policy", url: "/privacy-policy" },
  { label: "Terms of Service", url: "/terms-of-service" },
  { label: "Cookie Policy", url: "/cookie-policy" },
];

const extraInfo = [
  { label: "About Us", url: "/about" },
  { label: "Settings", url: "/settings" },
  { label: "GitHub", url: "https://github.com/aitoolbox" },
];

export default function SiteFooter() {
  // tools section into column for background designs 
  const half = Math.ceil(aiTools.length / 2);
  const leftTools = aiTools.slice(0, half);
  const rightTools = aiTools.slice(half);

  //  links styling 
   const linkStyle =
    "text-black  whitespace-nowrap hover:text-white hover:drop-shadow-[0_0_4px_rgba(64,64,64,0.9)] transition duration-200 transform hover:scale-105 inline-block";
  
  return (
    <footer className="w-full text-black">
      {/* background design  */}
      <div className="relative bg-[#acaaaa]  ">
        <div className="absolute inset-0 bg-[#dfdddd] transform -skew-y-2 origin-top"></div>

        <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6 md:gap-20 px-4 sm:px-6 py-4 sm:py-6 md:py-10">
          {/* logo of the app */}
          <div className="flex flex-row sm:flex-col items:center sm:items-start gap-2 md:col-span-2">
            <Image
              src="/logo.png"
              alt="AI Toolbox Logo"
              width={140}
              height={40}
              className="object-contain w-14 sm:w-28 md:w-36"
            />
            <div className="flex flex-col">
            <span className="text-sm sm:text-base md:text-lg font-semibold text-black">AI Toolbox</span>
            <p className="text-[10px] sm:text-sm md:text-base text-black leading-relaxed">
              Discover a wide collection of AI-powered utilities crafted to make
              your work easier — from writing and coding to image generation
              and productivity hacks.
            </p>
          </div></div>

          {/* first column */}
       <div className="flex flex-row gap-6 md:space-x-40 w-full text-[10px] sm:text-sm md:text-base">

          <div>
            <h4 className="text-black font-semibold mb-2 text-[12px] sm:text-sm md:text-base">AI Tools</h4>
            <ul className="space-y-1 ">
              {leftTools.map((tool) => (
                <li key={tool.url}>
                  <Link href={tool.url} className={linkStyle}>
                    {tool.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* second column */}
          <div>
            <h4 className="text-black font-semibold mb-2 text-[12px] sm:text-sm md:text-base">More Tools</h4>
            <ul className="space-y-1">
              {rightTools.map((tool) => (
                <li key={tool.url}>
                  <Link href={tool.url} className={linkStyle}>
                    {tool.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* last column  */}
          <div>
            <h4 className="text-black font-semibold mb-2 text-[12px] sm:text-sm md:text-base">Information</h4>
            <ul className="space-y-1 ">
              {extraInfo.map((item) => (
                <li key={item.url}>
                  <Link href={item.url} className={linkStyle}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div></div>

        </div>
      </div>

      {/* last line including copyright links etc */}
      <div className="bg-[#acaaaa] py-2 sm:py-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 sm:px-6 gap-2 sm:gap-3">
          <div className="text-xs sm:text-sm md:text-base text-black">
            &copy; {new Date().getFullYear()} AI Toolbox. All Rights Reserved.
          </div>
          <div className="flex gap-3 text-xs sm:text-sm">
            {policyLinks.map((item) => (
              <Link key={item.url} href={item.url} className={linkStyle}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}