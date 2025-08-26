"use client";
import { useBuilder } from "../_lib/store";
import { OutlineItem } from "../_lib/types";

export default function OutlineEditor() {
  const { outline, updateOutline } = useBuilder();

  function updateItem(i: number, patch: Partial<OutlineItem>) {
    const next = [...outline];
    next[i] = { ...next[i], ...patch };
    updateOutline(next);
  }

  return (
    <div className="space-y-4">
      {outline.map((o, i) => (
        <div key={o.id ?? `outline-${i}`} className="border rounded p-3 bg-white">
          <input
            className="w-full font-semibold mb-2"
            value={o.title}
            onChange={(e) => updateItem(i, { title: e.target.value })}
          />
          <textarea
            rows={3}
            className="w-full"
            value={o.bullets.join("\n")}
            onChange={(e) => updateItem(i, { bullets: e.target.value.split("\n") })}
          />
        </div>
      ))}
    </div>
  );
}
