"use client";
import { useBuilder } from "../_lib/store";
import { Theme } from "../_lib/types";

const defaultThemes: Theme[] = [
  { 
    id: "modern-light",
    name: "Modern Light",
    fonts: { title: "Poppins", body: "Inter" },
    palette: { 
      bg: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
      fg: "#1e293b",
      accent: "#3b82f6"
    },
    textStyles: { titleSize: 42, bodySize: 20 },
    layout: "image-right"
  },
  {
    id: "aurora",
    name: "Aurora",
    fonts: { title: "Montserrat", body: "Roboto" },
    palette: {
      bg: "linear-gradient(120deg, #4f46e5 0%, #3b82f6 50%, #0ea5e9 100%)",
      fg: "#ffffff",
      accent: "#22d3ee"
    },
    textStyles: { titleSize: 44, bodySize: 21 },
    layout: "image-right"
  },
  {
    id: "sunset-vibes",
    name: "Sunset Vibes",
    fonts: { title: "Playfair Display", body: "Source Sans Pro" },
    palette: {
      bg: "linear-gradient(150deg, #f97316 0%, #db2777 50%, #7c3aed 100%)",
      fg: "#ffffff",
      accent: "#fbbf24"
    },
    textStyles: { titleSize: 42, bodySize: 20 },
    layout: "image-right"
  },
  {
    id: "forest-mist",
    name: "Forest Mist",
    fonts: { title: "Merriweather", body: "Inter" },
    palette: {
      bg: "linear-gradient(135deg, #059669 0%, #047857 50%, #065f46 100%)",
      fg: "#f0fdf4",
      accent: "#6ee7b7"
    },
    textStyles: { titleSize: 40, bodySize: 20 },
    layout: "image-right"
  },
  {
    id: "cosmic-night",
    name: "Cosmic Night",
    fonts: { title: "Space Grotesk", body: "Inter" },
    palette: {
      bg: "linear-gradient(145deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)",
      fg: "#e0e7ff",
      accent: "#818cf8"
    },
    textStyles: { titleSize: 42, bodySize: 20 },
    layout: "image-right"
  },
  {
    id: "rose-gold",
    name: "Rose Gold",
    fonts: { title: "Cormorant Garamond", body: "Lato" },
    palette: {
      bg: "linear-gradient(135deg, #fdf2f8 0%, #fbcfe8 50%, #f9a8d4 100%)",
      fg: "#831843",
      accent: "#be185d"
    },
    textStyles: { titleSize: 44, bodySize: 21 },
    layout: "image-right"
  },
  {
    id: "ocean-depth",
    name: "Ocean Depth",
    fonts: { title: "Abril Fatface", body: "Work Sans" },
    palette: {
      bg: "linear-gradient(165deg, #0c4a6e 0%, #0369a1 50%, #0ea5e9 100%)",
      fg: "#f0f9ff",
      accent: "#38bdf8"
    },
    textStyles: { titleSize: 40, bodySize: 20 },
    layout: "image-right"
  }
];

export default function ThemeSelector() {
  const { themeId, set } = useBuilder();

  return (
    <div className="flex items-center gap-3">
      <select
        id="theme"
        className="border rounded p-2 bg-white text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        value={themeId}
        onChange={(e) => set({ themeId: e.target.value })}
      >
        {defaultThemes.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>
    </div>
  );
}
