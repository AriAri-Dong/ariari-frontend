"use client";

import { ButtonWithTextProps } from "@/types/components/button";

/**
 *
 * @param title 버튼 이름
 * @param onClick 버튼 클릭 핸들러
 * @param round 버튼 모양 (true일 경우 rounded-full 적용)
 * @returns
 */
const TransparentSmallBtn = ({
  title,
  onClick,
  round = false,
}: ButtonWithTextProps) => {
  return (
    <button
      className={`py-3 px-[18px] md:py-3 md:px-[21px] text-13 md:text-15
        font-medium text-primary border border-primary focus:bg-aelectedoption_hover
        bg-aelectedoption_default md:hover:bg-aelectedoption_hover md:focus:bg-aelectedoption_pressed
        ${round ? "rounded-full" : "rounded-lg"}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default TransparentSmallBtn;
