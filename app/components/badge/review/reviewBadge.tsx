"use client";

import React from "react";
import Image from "next/image";
import { REVIEW_BADGE_LIST } from "@/data/reviewBadge";

interface ReviewBadgeProps {
  type:
    | "employment"
    | "experience"
    | "health"
    | "interest"
    | "relationship"
    | "selfDevelopment"
    | "skill";
}

/**
 * ReviewBadge 컴포넌트
 * @param type 배지 유형
 */
const ReviewBadge = ({ type }: ReviewBadgeProps) => {
  const badgeData = REVIEW_BADGE_LIST.find((badge) => badge.type === type);

  if (!badgeData) {
    return null;
  }

  const { imageUrl, title } = badgeData;

  return (
    <div className="flex items-center py-[3px] px-2.5 gap-[6px] rounded bg-selectedoption_default">
      <Image
        src={imageUrl}
        alt={title}
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

export default ReviewBadge;
