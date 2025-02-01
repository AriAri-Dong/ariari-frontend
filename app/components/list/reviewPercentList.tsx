import React from "react";
import Image from "next/image";
import { REVIEW_BADGE_LIST } from "@/data/reviewBadge";

interface ReviewBadgeWithPercent {
  type: string;
  percent: number;
}

interface ReviewPercentListProps {
  badges: ReviewBadgeWithPercent[];
  className?: string;
}

const ReviewPercentList = ({ badges, className }: ReviewPercentListProps) => {
  const badgeWithPercent = REVIEW_BADGE_LIST.map((badge) => {
    const matchedBadge = badges.find((item) => item.type === badge.type);
    return {
      ...badge,
      percent: matchedBadge ? matchedBadge.percent : 0,
    };
  });

  return (
    <div className={`${className} lg:block hidden`}>
      <h1 className="text-text1 text-h3 mb-4">이런 점이 좋았어요</h1>
      <div className="flex flex-col gap-4">
        {badgeWithPercent.map((badge) => (
          <div key={badge.id} className="flex flex-col">
            {/* 배지 아이콘과 제목 */}
            <div className="flex items-center gap-[6px]">
              <Image
                src={badge.imageUrl}
                alt={badge.title}
                width={18}
                height={18}
              />
              <p className="text-subtext2 text-body3_r">{badge.title}</p>
            </div>
            {/* progress bar */}
            <div className="flex items-center gap-3 h-6">
              <div className="relative w-full h-2 bg-gray-200 rounded-full">
                <div
                  className="absolute top-0 left-0  h-full w-[216px] bg-primary rounded-full"
                  style={{ width: `${badge.percent}%` }}
                />
              </div>
              {/* 퍼센트 */}
              <p className="text-primary w-7 text-h4_sb">{badge.percent}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewPercentList;
