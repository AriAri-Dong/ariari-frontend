"use client";

import { ButtonWithTextProps } from "@/types/components/button";

/**
 *
 * @param title 버튼 이름
 * @param onClick 버튼 클릭 핸들러
 * @param round 버튼 모양 (true일 경우 rounded-full 적용)
 * @returns
 */
const LargeBtn = ({ title, onClick, round = false }: ButtonWithTextProps) => {
  return (
    <button
      className={`py-4 w-[266px] text-sm
    md:w-[390px] md:py-[18px] md:text-base font-semibold focus:bg-primary_hover
    bg-primary text-background md:hover:bg-primary_hover md:focus:bg-primary_pressed
    ${round ? "rounded-full" : "rounded-lg"}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default LargeBtn;
