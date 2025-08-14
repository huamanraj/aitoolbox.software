
"use client";

import Script from "next/script";

export default function NativeBannerAd() {
  return (
    <>
    
      <Script
        id="native-banner-ad"
        strategy="lazyOnload"
        src="//pl27373634.profitableratecpm.com/f74b3f2433134857ab82e88a59f9f2b2/invoke.js"
        async
        data-cfasync="false"
      />
      <div id="container-f74b3f2433134857ab82e88a59f9f2b2" />
    </>
  );
}
