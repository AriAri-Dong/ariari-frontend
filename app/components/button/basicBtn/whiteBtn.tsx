"use client";

import { ButtonWithTextProps } from "@/types/components/button";

const WhiteButton = ({ title, onClick }: ButtonWithTextProps) => {
  return (
    <button
      className="py-1 px-2 text-icon text-15 font-medium rounded-lg
      focus:bg-hover md:hover:bg-hover md:focus:bg-pressed"
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default WhiteButton;
