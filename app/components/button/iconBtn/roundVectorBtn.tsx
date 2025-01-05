"use client";

import Image from "next/image";
import vector from "@/images/icon/vector.svg";
import { ButtonProps } from "@/types/components/button";

const RoundVectorBtn = ({
  imageSize = 36,
  className,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={`flex justify-center items-center p-3 border border-menuborder
    bg-background hover:bg-hover active:bg-pressed rounded-full cursor-pointer ${className}`}
      onClick={onClick}
    >
      <Image src={vector} alt={"vector"} width={imageSize} height={imageSize} />
    </button>
  );
};

export default RoundVectorBtn;
