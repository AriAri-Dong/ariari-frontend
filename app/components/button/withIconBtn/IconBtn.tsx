"use client";

import { ButtonWithTextProps } from "@/types/components/button";
import Image from "next/image";
import reset from "@/images/icon/reset.svg";
import trash from "@/images/icon/delete.svg";
import declaration from "@/images/icon/declaration.svg";
import comment from "@/images/icon/comment.svg";
import reply from "@/images/icon/reply.svg";
import likeFilled from "@/images/icon/like_active.svg";
import likeOutline from "@/images/icon/like_inactive.svg";

interface BtnType extends ButtonWithTextProps {
  type:
    | "reset"
    | "declaration"
    | "trash"
    | "like_active"
    | "like_inactive"
    | "comment"
    | "reply";
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
      case "comment":
        return comment;
      case "like_active":
        return likeFilled;
      case "like_inactive":
        return likeOutline;
      case "reply":
        return reply;
      default:
        return null;
    }
  };

  return (
    <button
      className={`py-1 px-1.5 text-icon rounded-lg 
      active:bg-hover md:hover:bg-hover md:active:bg-pressed ${className}`}
      onClick={onClick}
    >
      <div
        className={`flex items-center text-subtext2 font-medium gap-1 md:gap-[6px] 
          ${
            size === "large"
              ? `${"text-mobile_body2_m md:text-body1_m"}`
              : `${"text-mobile_body3_m md:text-body3_m"}`
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
        <p className="flex-shrink-0">{title}</p>
      </div>
    </button>
  );
};

export default IconBtn;
