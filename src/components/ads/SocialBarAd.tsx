"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SocialBarAd = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Remove old script if it exists
    const oldScript = document.getElementById("socialbar-ad");
    if (oldScript) {
      oldScript.remove();
    }

    // Create a fresh script
    const script = document.createElement("script");
    script.id = "socialbar-ad";
    script.src =
      "//bureaubittercomic.com/a9/f8/a5/a9f8a580a887c25e76e1df446a4ad344.js";
    script.async = true;

    document.body.appendChild(script);

    // Cleanup when route changes
    return () => {
      script.remove();
    };
  }, [pathname]); // runs on every route change

  return null;
};

export default SocialBarAd;
