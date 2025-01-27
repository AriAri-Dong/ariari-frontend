"use client";

import { ButtonWithTextProps } from "@/types/components/button";

const WhiteButton = ({ title, onClick }: ButtonWithTextProps) => {
  return (
    <button
      className="py-1 px-2 text-icon text-15 font-medium rounded-lg
      active:bg-hover md:hover:bg-hover md:active:bg-pressed"
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default WhiteButton;
