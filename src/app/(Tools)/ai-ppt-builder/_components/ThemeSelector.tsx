"use client";
import { useBuilder } from "../_lib/store";

export default function ThemeSelector() {
  const { themes, themeId, set } = useBuilder();

  return (
    <div className="flex items-center gap-3">
      <select
        id="theme"
        className="border rounded p-2 bg-white text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        value={themeId}
        onChange={(e) => set({ themeId: e.target.value })}
      >
        {themes.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>
    </div>
  );
}
