"use client";

import { ButtonWithTextProps } from "@/types/components/button";

/**
 *
 * @param title 버튼 이름
 * @param onClick 버튼 클릭 핸들러
 * @param round 버튼 모양 (true일 경우 rounded-full 적용)
 * @param className 추가 style class
 * @returns
 */
const SmallBtn = ({
  title,
  onClick,
  round = false,
  className,
}: ButtonWithTextProps) => {
  return (
    <button
      className={`py-2 md:py-[13px] px-[18px] md:px-[22px] text-mobile_body2_sb md:text-body1_sb
        active:bg-primary_hover bg-primary text-background md:hover:bg-primary_hover md:active:bg-primary_pressed
        ${round ? "rounded-full" : "rounded-lg"} ${className}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default SmallBtn;
