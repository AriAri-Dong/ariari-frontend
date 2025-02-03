"use client";

import Image from "next/image";
import plus from "@/images/icon/plus.svg";
import { ButtonProps } from "@/types/components/button";

interface RoundVectorBtnProp extends ButtonProps {
  btnSize?: "small" | "large";
}

const RoundPlusBtn = ({
  imageSize = 36,
  className,
  onClick,
  btnSize = "large",
}: RoundVectorBtnProp) => {
  return (
    <button
      className={`${className} flex justify-center items-center ${
        btnSize === "large" ? "p-3" : "p-0"
      } border border-menuborder
    bg-background hover:bg-hover active:bg-pressed rounded-full cursor-pointer`}
      onClick={onClick}
    >
      <Image src={plus} alt={"plus"} width={imageSize} height={imageSize} />
    </button>
  );
};

export default RoundPlusBtn;
