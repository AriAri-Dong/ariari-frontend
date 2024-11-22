"use client";

import Image from "next/image";
import share from "@/images/icon/share.svg";
import { ButtonProps } from "@/types/components/button";

const SahreBtn = ({ onClick }: ButtonProps) => {
  return (
    <button
      className="flex justify-center items-center w-[52px] h-[52px] md:w-[60px] md:h-[60px]
    bg-background focus:bg-hover md:hover:bg-hover md:focus:bg-pressed rounded-lg border border-menuborder cursor-pointer"
      onClick={onClick}
    >
      <Image
        src={share}
        alt={"공유하기"}
        width={20}
        height={20}
        className="md:w-6 md:h-6"
      />
    </button>
  );
};

export default SahreBtn;
