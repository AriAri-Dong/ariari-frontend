"use client";

import { ButtonWithTextProps } from "@/types/components/button";

/**
 *
 * @param title 버튼 이름
 * @param onClick 버튼 클릭 핸들러
 * @param round 버튼 모양 (true일 경우 rounded-full 적용)
 * @returns
 */
const TransparentLargeBtn = ({
  title,
  onClick,
  round = false,
}: ButtonWithTextProps) => {
  return (
    <button
      className={`py-4 text-sm text-primary border border-primary
    md:py-[18px] md:text-base font-semibold active:bg-selectedoption_hover
    bg-selectedoption_default md:hover:bg-selectedoption_hover md:active:bg-selectedoption_pressed
    ${round ? "rounded-full" : "rounded-lg"} w-full`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default TransparentLargeBtn;
