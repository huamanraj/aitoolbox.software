"use client";

import { FC } from "react";

const DirectLinkAdButton: FC = () => {
  const handleClick = () => {
    window.open(
      "https://www.profitableratecpm.com/sy5ydyxytx?key=44a446b9beeba058e6800440a39627ce",
      "_blank"
    );
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-green-600 text-white rounded"
    >
      Visit Sponsored Link
    </button>
  );
};

export default DirectLinkAdButton;
