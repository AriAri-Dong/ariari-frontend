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
      className="hidden md:flex fixed bottom-0 w-full max-w-[1248px] mb-9
      justify-center left-1/2 transform -translate-x-1/2 px-5"
      style={{ zIndex: 999 }}
    >
      <div className="flex flex-col w-full">
        {imageVisible && (
          <Image
            src={image}
            alt={"helpText"}
            className="hidden self-end mr-[-20px] mb-[68px] md:block"
          />
        )}
      </div>
    </div>
  );
};

export default HelpText;
