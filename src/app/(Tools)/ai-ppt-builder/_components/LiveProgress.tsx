"use client";
import { useEffect } from "react";
import { useBuilder } from "../_lib/store";

export default function LiveProgress() {
  const { isGenerating, progress, set } = useBuilder();

  useEffect(() => {
    if (!isGenerating) return;
    const ev = new EventSource("/api/ai/ai-ppt-builder/stream");
    ev.onmessage = (e) => {
      const { progress } = JSON.parse(e.data);
      set({ progress });
    };
    ev.onerror = () => ev.close();
    return () => ev.close();
  }, [isGenerating, set]);

  if (!isGenerating) return null;
  return (
    <div className="w-full bg-gray-200 rounded h-2 overflow-hidden">
      <div className="bg-blue-600 h-2" style={{ width: `${progress}%` }} />
    </div>
  );
}
