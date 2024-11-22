"use client";

import Image from "next/image";
import write from "@/images/icon/write.svg";
import { ButtonProps } from "@/types/components/button";

const WriteBtn = ({ onClick }: ButtonProps) => {
  return (
    <button
      className="flex justify-center items-center w-[52px] h-[52px] md:w-[60px] md:h-[60px]
    bg-primary focus:bg-primary_hover md:hover:bg-primary_hover md:focus:bg-primary_pressed rounded-full  border border-menuborder cursor-pointer"
      onClick={onClick}
    >
      <Image
        src={write}
        alt={"쓰기"}
        width={28}
        height={28}
        className="md:w-9 md:h-9"
      />
    </button>
  );
};

export default WriteBtn;
