"use client";

import { ButtonWithTextProps } from "@/types/components/button";
import Image from "next/image";
import vector from "@/images/icon/vector_white.svg";

const DarkBtn = ({ title, onClick }: ButtonWithTextProps) => {
  return (
    <button
      className="pl-5 pr-[14px] py-3 rounded-28 bg-black_50"
      onClick={onClick}
    >
      <div className="flex text-background items-center text-sm font-semibold gap-[1.5px]">
        {title}
        <Image src={vector} alt={"vector"} width={24} height={24} />
      </div>
    </button>
  );
};

export default DarkBtn;
