// components/ads/BannerAd320x50.tsx

"use client";

import Script from "next/script";
import { Fragment, type FC } from "react";

const BannerAd320x50: FC = () => {
  return (
    // This div acts as a container for the ad.
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "320px",
        height: "50px",
        margin: "1rem auto", // Center the ad block
        backgroundColor: "#f0f0f0", // Placeholder background
      }}
    >
      <Fragment>
        {/* Script 1: Sets the configuration variable on the window object */}
        <Script id="adsterra-config" strategy="lazyOnload">
          {`
            atOptions = {
              'key' : 'bbcc90f66c6a1cf5879b71e95320cc84',
              'format' : 'iframe',
              'height' : 50,
              'width' : 320,
              'params' : {}
            };
          `}
        </Script>

        {/* Script 2: Loads the external ad script that uses the config */}
        <Script
          id="adsterra-invoke"
          strategy="afterInteractive"
          src="//www.highperformanceformat.com/bbcc90f66c6a1cf5879b71e95320cc84/invoke.js"
          onError={(e) => console.error("Adsterra script failed to load", e)}
        />
      </Fragment>
    </div>
  );
};

export default BannerAd320x50;
