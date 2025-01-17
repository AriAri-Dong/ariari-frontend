"use client";

import React from "react";
import Image from "next/image";

export interface BadgeProps {
  title: string;
  imageUrl: string;
  isSelected: boolean;
  onClick: () => void;
}

/**
 *
 * @param title badge 설명 (제목)
 * @param imageUrl 이미지 경로
 * @param isSelected 선택 여부
 * @param onClick 클릭 이벤트 핸들러
 * @returns
 */
const ReviewBadgeList = ({
  title,
  imageUrl,
  isSelected,
  onClick,
}: BadgeProps) => {
  return (
    <div
      className={`flex items-center py-[3px] px-2.5 gap-[6px] rounded cursor-pointer md:py-1 ${
        isSelected
          ? `border border-selectedoption_border bg-selectedoption_hover`
          : `bg-selectedoption_default`
      }`}
      onClick={onClick}
    >
      <Image
        src={imageUrl}
        alt={"badge"}
        width={16}
        height={16}
        className="md:w-5 md:h-5"
      />
      <p className="text-mobile_body3_m text-subtext2 md:text-body3_m">
        {title}
      </p>
    </div>
  );
};

export default ReviewBadgeList;
