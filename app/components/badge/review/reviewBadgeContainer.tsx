import React, { useState } from "react";
import ReviewBadgeList from "./reviewBadgeList";
import { TagData, TagIconType } from "@/types/review";
import { tagMap } from "@/utils/tagMapping";

export interface ReviewBadgeListProps {
  tags: TagData[];
  selectedTags: TagIconType[];
  onTagSelect: (tagIcon: TagIconType) => void;
  className?: string;
}

const ReviewBadgeContainer = ({
  tags,
  selectedTags,
  onTagSelect,
  className,
}: ReviewBadgeListProps) => {
  const handleSelectedTag = (tagIcon: TagIconType) => {
    onTagSelect(tagIcon);
  };

  return (
    <div className={`flex flex-wrap gap-2.5 md:gap-4 ${className}`}>
      {tags.map((item) => (
        <ReviewBadgeList
          key={item.id}
          title={item.body}
          imageUrl={tagMap[item.icon]}
          isSelected={selectedTags.includes(item.icon)}
          onClick={() => handleSelectedTag(item.icon)}
        />
      ))}
    </div>
  );
};

export default ReviewBadgeContainer;
