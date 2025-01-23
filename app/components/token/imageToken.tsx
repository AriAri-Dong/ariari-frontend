"use client";

import React from "react";
import Image from "next/image";

interface TokenProps {
  bgColor: string;
  textColor: string;
  image: string;
  text: string;
}

const ImageToken = ({ bgColor, textColor, image, text }: TokenProps) => {
  return (
    <div
      className={`flex gap-1.5 items-center px-2.5 py-[3px] md:py-1 rounded-[4px] ${bgColor}`}
    >
      <Image src={image} alt={text} width={15} height={18} className="md:h-5" />
      <span className={textColor}>{text}</span>
    </div>
  );
};
export default ImageToken;
