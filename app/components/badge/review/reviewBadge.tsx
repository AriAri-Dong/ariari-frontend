"use client";

import React from "react";
import Image from "next/image";
import { TagData } from "@/types/review";
import { tagMap } from "@/utils/tagMapping";

interface ReviewBadgeProps {
  tag: TagData;
}

/**
 * ReviewBadge 컴포넌트
 * @param tag 배지 유형
 */
const ReviewBadge = ({ tag }: ReviewBadgeProps) => {
  const tagIcon = tagMap[tag.icon];

  return (
    <div className="flex items-center py-[3px] px-2.5 gap-[6px] rounded bg-selectedoption_default">
      <Image
        src={tagIcon}
        alt={tag.body}
        width={16}
        height={16}
        className="md:w-5 md:h-5"
      />
      <p className="text-mobile_body3_m text-subtext2 md:text-body3_m">
        {tag.body}
      </p>
    </div>
  );
};

export default ReviewBadge;
