"use client";

import ReviewBadgeList from "@/components/badge/review/reviewBadgeList";
import { REVIEW_BADGE_LIST } from "@/data/reviewBadge";
import { useState } from "react";

const Badges = () => {
  const [selectedBadgeId, setSelectedBadgeId] = useState<number | null>(null);

  const handleSelectedBadge = (id: number) => {
    setSelectedBadgeId(id);
  };

  return (
    <div>
      <h1>Exploration</h1>
      <div className="flex flex-wrap gap-2">
        {REVIEW_BADGE_LIST.map((item) => (
          <ReviewBadgeList
            key={item.id}
            title={item.title}
            imageUrl={item.imageUrl}
            isSelected={selectedBadgeId === item.id}
            onClick={() => handleSelectedBadge(item.id)}
          />
        ))}
      </div>
      {selectedBadgeId !== null && (
        <div className="mt-4">
          <h2>선택된 배지:</h2>
          <p>
            {
              REVIEW_BADGE_LIST.find((badge) => badge.id === selectedBadgeId)
                ?.title
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default Badges;
