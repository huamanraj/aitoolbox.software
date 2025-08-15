import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BuilderState, OutlineItem, SlideContent, Theme } from "./types";

const defaultThemes: Theme[] = [
  { id: "clean", name: "Clean", fonts: { title: "Inter", body: "Inter" }, palette: { bg: "#0b1020", fg: "#ffffff", accent: "#5ab0ff" }, textStyles: { titleSize: 40, bodySize: 20 }, layout: "image-right" },
  { id: "light", name: "Light", fonts: { title: "Poppins", body: "Poppins" }, palette: { bg: "#ffffff", fg: "#111111", accent: "#4f46e5" }, textStyles: { titleSize: 40, bodySize: 20 }, layout: "image-left" },
  { id: "modern", name: "Modern Minimal", fonts: { title: "Roboto", body: "Roboto" }, palette: { bg: "#5da0b9ff", fg: "#F3F4F6", accent: "#10B981" }, textStyles: { titleSize: 42, bodySize: 22 }, layout: "image-right" },
  { id: "sunset", name: "Sunset Gradient", fonts: { title: "Lora", body: "Open Sans" }, palette: { bg: "#F59E0B", fg: "#FFFFFF", accent: "#EF4444" }, textStyles: { titleSize: 44, bodySize: 22 }, layout: "image-left" },
  { id: "forest", name: "Forest Green", fonts: { title: "Merriweather", body: "Inter" }, palette: { bg: "#065F46", fg: "#D1FAE5", accent: "#34D399" }, textStyles: { titleSize: 40, bodySize: 20 }, layout: "image-right" },
  { id: "ocean", name: "Ocean Breeze", fonts: { title: "Nunito", body: "Nunito" }, palette: { bg: "#0EA5E9", fg: "#E0F2FE", accent: "#0369A1" }, textStyles: { titleSize: 42, bodySize: 21 }, layout: "image-left" },
  { id: "retro", name: "Retro 80s", fonts: { title: "Press Start 2P", body: "Inter" }, palette: { bg: "#FF00FF", fg: "#00FFFF", accent: "#FFFF00" }, textStyles: { titleSize: 38, bodySize: 18 }, layout: "image-right" },
  { id: "dark", name: "Dark Mode", fonts: { title: "Inter", body: "Inter" }, palette: { bg: "#0F172A", fg: "#E2E8F0", accent: "#38BDF8" }, textStyles: { titleSize: 40, bodySize: 20 }, layout: "image-left" },
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
