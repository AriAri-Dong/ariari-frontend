import React, { useState } from "react";
import ReviewBadgeList from "./reviewBadgeList";

export interface ReviewBadgeListProps {
  REVIEW_BADGE_LIST: { id: number; title: string; imageUrl: string }[];
  selectedBadges: number[];
  onBadgeSelect: (id: number) => void;
  className?: string;
}

const ReviewBadgeContainer = ({
  REVIEW_BADGE_LIST,
  selectedBadges,
  onBadgeSelect,
  className,
}: ReviewBadgeListProps) => {
  const handleSelectedBadge = (id: number) => {
    onBadgeSelect(id);
  };

  return (
    <div className={`flex flex-wrap gap-2.5 md:gap-4 ${className}`}>
      {REVIEW_BADGE_LIST.map((item) => (
        <ReviewBadgeList
          key={item.id}
          title={item.title}
          imageUrl={item.imageUrl}
          isSelected={selectedBadges.includes(item.id)}
          onClick={() => handleSelectedBadge(item.id)}
        />
      ))}
    </div>
  );
};

export default ReviewBadgeContainer;
