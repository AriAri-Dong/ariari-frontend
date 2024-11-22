"use client";

import Image from "next/image";
import vector from "@/images/icon/vector.svg";
import { ButtonProps } from "@/types/components/button";

const SquareVectorBtn = ({ onClick }: ButtonProps) => {
  return (
    <button
      className="flex justify-center items-center p-[10px] border border-menuborder
    bg-background hover:bg-hover focus:bg-pressed rounded-lg cursor-pointer"
      onClick={onClick}
    >
      <Image src={vector} alt={"vector"} width={24} height={24} />
    </button>
  );
};

export default SquareVectorBtn;
