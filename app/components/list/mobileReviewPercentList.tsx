import React, { useState } from "react";
import Image from "next/image";
import { REVIEW_BADGE_LIST } from "@/data/reviewBadge";
import vector from "@/images/icon/pullDown.svg";

interface ReviewBadgeWithPercent {
  type: string;
  percent: number;
}

interface ReviewPercentListProps {
  badges: ReviewBadgeWithPercent[];
  className?: string;
}

const MobileReviewPercentList = ({
  badges,
  className,
}: ReviewPercentListProps) => {
  const [showAll, setShowAll] = useState(false);

  const badgeWithPercent = REVIEW_BADGE_LIST.map((badge) => {
    const matchedBadge = badges.find((item) => item.type === badge.type);
    return {
      ...badge,
      percent: matchedBadge ? matchedBadge.percent : 0,
    };
  });

  const displayedBadges = showAll
    ? badgeWithPercent
    : badgeWithPercent.slice(0, 3);

  return (
    <div
      className={`${className} lg:hidden bg-background pt-2.5 pb-[6px] px-[14px] rounded-lg`}
    >
      <h1 className="text-text1 mb-[18px] text-mobile_h4_sb">
        이런 점이 좋았어요
      </h1>
      <div className="flex flex-col gap-4">
        {displayedBadges.map((badge) => (
          <div key={badge.id} className="flex flex-col">
            {/* 배지 아이콘과 제목 */}
            <div className="flex items-center gap-[6px]">
              <Image
                src={badge.imageUrl}
                alt={badge.title}
                width={18}
                height={16}
              />
              <p className="text-subtext2 text-mobile_body3_m">{badge.title}</p>
            </div>
            {/* progress bar */}
            <div className="flex items-center gap-3">
              <div className="relative w-full h-2 bg-gray-200 rounded-full">
                <div
                  className="absolute top-0 left-0 h-full bg-primary rounded-full"
                  style={{ width: `${badge.percent}%` }}
                />
              </div>
              {/* 퍼센트 */}
              <p className="text-primary w-6 text-mobile_body1_m">
                {badge.percent}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* 화살표 버튼 */}
      <div
        className="flex justify-center cursor-pointer"
        onClick={() => setShowAll((prev) => !prev)}
      >
        <Image
          src={vector}
          alt={showAll ? "닫기" : "열기"}
          height={24}
          width={24}
          className={`transition-transform duration-300 ${
            showAll ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>
    </div>
  );
};

export default MobileReviewPercentList;
