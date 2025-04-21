"use client";

import React from "react";
import Image from "next/image";

interface HelpTextProp {
  imageVisible: boolean;
  image: string;
}

const HelpText = ({ image, imageVisible }: HelpTextProp) => {
  return (
    <div
      className="fixed bottom-[65px] w-full max-w-[1248px] flex justify-end md:bottom-[104px]"
      style={{ zIndex: 49 }}
    >
      {imageVisible && <Image src={image} alt={"helpText"} />}
    </div>
  );
};

export default HelpText;
