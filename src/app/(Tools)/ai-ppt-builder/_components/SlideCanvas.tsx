"use client";
import { useBuilder } from "../_lib/store";

export default function SlideCanvas() {
  const { slides, themes, themeId, updateSlide } = useBuilder();
  const theme = themes.find((t) => t.id === themeId)!;

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {slides.map((s, index) => (
        <div key={s.id ?? index} className="border rounded overflow-hidden bg-gray-100">
          <div
            className="relative"
            style={{
              width: 640,
              height: 360, // 16:9 preview
              background: theme.palette.bg,
              color: theme.palette.fg,
              fontFamily: theme.fonts.body,
            }}
          >
            {/* Title */}
            <input
              value={s.title}
              onChange={(e) => updateSlide(s.id, { title: e.target.value })}
              style={{
                position: "absolute",
                top: 24,
                left: 24,
                right: 24,
                fontFamily: theme.fonts.title,
                fontSize: theme.textStyles.titleSize,
                background: "transparent",
                border: "none",
                outline: "none",
                color: theme.palette.fg,
                fontWeight: 700,
              }}
            />
            {/* Bullets */}
            <textarea
              value={s.bullets.join("\n")}
              onChange={(e) => updateSlide(s.id, { bullets: e.target.value.split("\n") })}
              style={{
                position: "absolute",
                left: 24,
                right: theme.layout === "image-right" ? 360 : 24,
                bottom: 24,
                top: 120,
                background: "transparent",
                border: "none",
                outline: "none",
                color: theme.palette.fg,
                fontSize: theme.textStyles.bodySize,
                resize: "none",
                whiteSpace: "pre-wrap",
              }}
            />
            {/* Image */}
            {s.image && (
              <img
                src={s.image}
                alt=""
                style={{
                  position: "absolute",
                  top: theme.layout === "image-full" ? 0 : 120,
                  right: theme.layout === "image-right" ? 0 : undefined,
                  left: theme.layout === "image-left" ? 0 : undefined,
                  width: theme.layout === "image-full" ? "100%" : 360,
                  height: theme.layout === "image-full" ? "100%" : 240,
                  objectFit: "cover",
                }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
