"use client";

import Script from "next/script";
import type { FC } from "react";

const PopunderAd: FC = () => {
  return (
    <Script
      id="adsterra-popunder"
      strategy="afterInteractive"
      src="//pl27389291.profitableratecpm.com/26/6f/d6/266fd6c50b66215e5e86ecb559f5352d.js"
    />
  );
};

export default PopunderAd;
