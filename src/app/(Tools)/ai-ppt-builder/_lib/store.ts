import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BuilderState, OutlineItem, SlideContent, Theme } from "./types";

export const defaultThemes: Theme[] = [
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

type Actions = {
  set: (p: Partial<BuilderState>) => void;
  updateOutline: (o: OutlineItem[]) => void;
  updateSlide: (id: string, patch: Partial<SlideContent>) => void;
  replaceSlides: (s: SlideContent[]) => void;
  reset: () => void;
};

export const useBuilder = create<BuilderState & Actions>()(
  persist(
    (set, get) => ({
      topic: "",
      language: "en",
      audience: "professional",
      pageStyle: "16:9",
      numSlides: 6,

      themes: defaultThemes,
      themeId: defaultThemes[0].id,

      outline: [],
      slides: [],

      isGenerating: false,
      progress: 0,
      version: 1,

      set: (p) => set(p),
      updateOutline: (o) => set({ outline: o }),
      updateSlide: (id, patch) =>
        set((s) => ({
          slides: s.slides.map((sl) =>
            sl.id === id ? { ...sl, ...patch } : sl
          ),
        })),
      replaceSlides: (slides) => set({ slides }),
      reset: () =>
        set({
          topic: "",
          outline: [],
          slides: [],
          progress: 0,
          isGenerating: false,
          version: get().version + 1,
        }),
    }),
    {
      name: "ai-ppt-builder",
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Merge persisted themes with defaultThemes
          const merged = [...defaultThemes];
          state.themes.forEach((t) => {
            if (!merged.find((d) => d.id === t.id)) {
              merged.push(t);
            }
          });
          state.themes = merged;
        }
      },
    }
  )
);
