"use client";

import { ButtonWithTextProps } from "@/types/components/button";
import Image from "next/image";
import reset from "@/images/icon/reset.svg";
import trash from "@/images/icon/delete.svg";
import declaration from "@/images/icon/declaration.svg";

interface BtnType extends ButtonWithTextProps {
  type: "reset" | "declaration" | "trash";
  size: "large" | "small";
}

/**
 *
 * @param title 버튼 타이틀
 * @param onClick 클릭 핸들러
 * @param type 아이콘 타입
 * @param size 버튼 사이즈
 * @param className 추가 className
 * @returns
 */
const IconBtn = ({ title, onClick, type, size, className }: BtnType) => {
  const getIcon = () => {
    switch (type) {
      case "reset":
        return reset;
      case "declaration":
        return declaration;
      case "trash":
        return trash;
      default:
        return null;
    }
  };

  return (
    <button
      className={`py-1 px-[6px] text-icon rounded-lg
      focus:bg-hover md:hover:bg-hover md:focus:bg-pressed ${className}`}
      onClick={onClick}
    >
      <div
        className={`flex items-center text-subtext2 font-medium gap-1 md:gap-[6px] 
          ${
            size === "large"
              ? `${"text-13 md:text-15"}`
              : `${"text-xs md:text-13"}`
          }`}
      >
        {getIcon() && (
          <Image
            src={getIcon()}
            alt={type}
            width={`${size === "large" ? 20 : 16}`}
            height={`${size === "large" ? 20 : 16}`}
            className={`${
              size === "large"
                ? `${"md:w-5 md:h-5"}`
                : `${"md:w-[18px] md:h-[18px]"}`
            }`}
          />
        )}
        {title}
      </div>
    </button>
  );
};

export default IconBtn;
