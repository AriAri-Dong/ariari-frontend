"use client";

import Image from "next/image";
import end from "@/images/icon/end.svg";
import { ButtonProps } from "@/types/components/button";

const EndBtn = ({ onClick, className }: ButtonProps) => {
  return (
    <button
      className={`flex justify-center items-center p-0.5
    active:bg-hover rounded-full cursor-pointer ${className}`}
      onClick={onClick}
    >
      <Image
        src={end}
        alt={"end"}
        width={16}
        height={16}
        className="md:w-6 md:h-6"
      />
    </button>
  );
};

export default EndBtn;
