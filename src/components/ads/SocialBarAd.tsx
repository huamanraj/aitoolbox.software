"use client";

import { FC, useEffect } from "react";

const SocialBarAd: FC = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//pl27414897.profitableratecpm.com/a9/f8/a5/a9f8a580a887c25e76e1df446a4ad344.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return null; 
};

export default SocialBarAd;
