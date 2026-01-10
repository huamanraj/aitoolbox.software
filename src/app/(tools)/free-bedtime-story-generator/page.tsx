import { BedtimeStoryGeneratorClient } from "@/components/bedtime-story-generator-client";
import { BedtimeStoryGeneratorContent } from "@/components/bedtime-story-generator-content";

export default function FreeBedtimeStoryGeneratorPage() {
  return (
    <>
      <BedtimeStoryGeneratorClient />
      <BedtimeStoryGeneratorContent />
    </>
  );
}
