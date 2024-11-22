"use client";

import { ButtonWithTextProps } from "@/types/components/button";
import Image from "next/image";
import plus from "@/images/icon/plus.svg";

const PlusBtn = ({ title, onClick }: ButtonWithTextProps) => {
  return (
    <button
      className="pl-[10px] pr-3.5 px-3 py-[7px] md:py-[11px] md:pl-3.5 md:pr-[22px]
      border border-menuborder rounded-60
      bg-background focus:bg-hover md:hover:bg-hover md:focus:bg-pressed"
      onClick={onClick}
    >
      <div className="flex text-subtext2 text-sm font-medium gap-1 md:text-base md:font-semibold">
        <Image
          src={plus}
          alt={"plus"}
          width={20}
          height={20}
          className="md:w-6 md:h-6"
        />
        {title}
      </div>
    </button>
  );
};

export default PlusBtn;
