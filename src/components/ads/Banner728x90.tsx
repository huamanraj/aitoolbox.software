"use client";

import { FC, useEffect } from "react";

const Banner728x90: FC = () => {
  useEffect(() => {
    // Inject the ad settings
    (window as any).atOptions = {
      key: "34525acd859a0872856bc29c911754ec",
      format: "iframe",
      height: 90,
      width: 728,
      params: {},
    };

    // Inject the script
    const script = document.createElement("script");
    script.src =
      "//www.highperformanceformat.com/34525acd859a0872856bc29c911754ec/invoke.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return <div id="ad-banner-728x90"></div>;
};

export default Banner728x90;
