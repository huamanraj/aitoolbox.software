"use client";

import React, { useEffect, useRef, useState } from "react";

type Props = {
  html: string;
  // optional fixed height for skeleton/embed (responsive if not provided)
  height?: number;
};

export default function EmbedClient({ html, height = 380 }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // inject html (safe because it's generated server-side from oEmbed or known embed patterns)
    el.innerHTML = html;

    // ask twitter to enhance any blockquotes inside this container
    try {
      const w = (window as any).twttr;
      if (w && w.widgets && typeof w.widgets.load === "function") {
        w.widgets.load(el);
      }
    } catch {
      // ignore
    }

    // detect iframe or twitter markup insertion
    const checkIfReady = () =>
      Boolean(el.querySelector("iframe") || el.querySelector(".twitter-tweet"));

    if (checkIfReady()) {
      setLoaded(true);
      return;
    }

    const observer = new MutationObserver(() => {
      if (checkIfReady()) {
        setLoaded(true);
      }
    });

    observer.observe(el, { childList: true, subtree: true });

    // fallback: show embed after timeout even if detection didn't work
    const to = setTimeout(() => setLoaded(true), 3500);

    return () => {
      observer.disconnect();
      clearTimeout(to);
    };
  }, [html]);

  return (
    <div className="relative">
      {!loaded && (
        <div
          aria-hidden
          className="rounded-md overflow-hidden animate-pulse"
          style={{ height }}
        >
          <div className="w-full h-full bg-muted/40" />
        </div>
      )}

      <div
        ref={containerRef}
        className={loaded ? "block" : "invisible"}
        // allow the embed to size itself, but constrain width
        style={{ width: "100%" }}
      />
    </div>
  );
}
