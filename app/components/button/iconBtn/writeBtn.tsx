"use client";

import Image from "next/image";
import write from "@/images/icon/write.svg";
import { ButtonProps } from "@/types/components/button";

interface WriteBtnProps extends ButtonProps {
  size?: "small" | "default";
}

const WriteBtn = ({ onClick, size = "default" }: WriteBtnProps) => {
  const buttonClasses =
    size === "small"
      ? "w-[32px] h-[32px] md:w-[36px] md:h-[36px]"
      : "w-[52px] h-[52px] md:w-[60px] md:h-[60px]";
  const imageSizes =
    size === "small"
      ? { width: 20, height: 20, className: "md:w-6 md:h-6" }
      : { width: 28, height: 28, className: "md:w-9 md:h-9" };

  return (
    <button
      className={`flex justify-center items-center ${buttonClasses} 
        bg-primary focus:bg-primary_hover md:hover:bg-primary_hover 
        md:focus:bg-primary_pressed rounded-full border border-menuborder cursor-pointer`}
      onClick={onClick}
    >
      <Image
        src={write}
        alt={"쓰기"}
        width={imageSizes.width}
        height={imageSizes.height}
        className={imageSizes.className}
      />
    </button>
  );
};

export default WriteBtn;
