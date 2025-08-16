export type AudienceStyle = "professional" | "casual";
export type PageStyle = "16:9" | "4:3" | "A4";
export type LanguageCode = "en" | "hi" | "es" | "fr" | "de" | "ja";

export type SlideContent = {
  id: string;
  title: string;
  bullets: string[];
  image?: string; // data URL
  notes?: string;
};

export type Theme = {
  id: string;
  name: string;
  fonts: { title: string; body: string };
  palette: { bg: string; fg: string; accent: string };
  textStyles: { titleSize: number; bodySize: number };
  layout: "image-left" | "image-right" | "image-full" | "title-only";
};

export type OutlineItem = {
  id: string;
  title: string;
  bullets: string[];
};

export type BuilderState = {
  topic: string;
  language: LanguageCode;
  audience: AudienceStyle;
  pageStyle: PageStyle;
  numSlides: number;

  themes: Theme[];
  themeId: string;

  outline: OutlineItem[];
  slides: SlideContent[];

  isGenerating: boolean;
  progress: number; // 0..100
  lastSavedAt?: number;
  version: number;
};
