"use client";

import { FC } from "react";

const DirectLinkAdButton: FC = () => {
  const links = [
    "https://bureaubittercomic.com/sy5ydyxytx?key=44a446b9beeba058e6800440a39627ce",
    "https://bureaubittercomic.com/abx6c6mv1?key=63a98e8b6c972a55a9bf0b3100ee78f5",
    "https://bureaubittercomic.com/xhi7kpb5?key=a8f65146ff4d171c0f35e0c3dae10227",
    "https://bureaubittercomic.com/sy5ydyxytx?key=44a446b9beeba058e6800440a39627ce",
  ];

  const handleClick = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="w-full text-center my-6">
      <h2 className="text-lg font-semibold mb-4">
        Sponsored Links – Just one click to support us!(nothing to do after click)
      </h2>
      <div className="flex justify-center gap-4">
        {links.map((link, index) => (
          <button
            key={index}
            onClick={() => handleClick(link)}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded shadow"
          >
            Visit Link {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DirectLinkAdButton;
