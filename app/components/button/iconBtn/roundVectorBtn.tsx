"use client";

import Image from "next/image";
import vector from "@/images/icon/vector.svg";
import { ButtonProps } from "@/types/components/button";

const RoundVectorBtn = ({ onClick }: ButtonProps) => {
  return (
    <button
      className="flex justify-center items-center p-3 border border-menuborder
    bg-background hover:bg-hover focus:bg-pressed rounded-full cursor-pointer"
      onClick={onClick}
    >
      <Image src={vector} alt={"vector"} width={36} height={36} />
    </button>
  );
};

export default RoundVectorBtn;
