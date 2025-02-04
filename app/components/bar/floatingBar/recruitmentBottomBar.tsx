"use client";

import React, { useEffect, useState } from "react";
import MediumBtn from "@/components/button/basicBtn/mediumBtn";
import BookmarkBtn from "@/components/button/iconBtn/bookmarkBtn";
import SahreBtn from "@/components/button/iconBtn/shareBtn";
import LargeBtn from "@/components/button/basicBtn/largeBtn";
import { calculateRemainingDays } from "@/utils/dateFormatter";
import { useSearchParams } from "next/navigation";
import { deleteRecruitmentBookmark, postRecruitmentBookmark } from "@/api/api";
import useResponsive from "@/hooks/useResponsive";
interface RecruitmentBottomBar {
  isMyBookmark: boolean;
  bookmarks: number;
  endDate: string;
  isMyApply: boolean;
}
const RecruitmentBottomBar = ({
  isMyBookmark,
  bookmarks,
  endDate,
  isMyApply,
}: RecruitmentBottomBar) => {
  const params = useSearchParams();
  const id = params.get("id");
  const isMdUp = useResponsive("md");

  const [count, setCount] = useState<number>(bookmarks);
  const [isScrap, setIsScrap] = useState<boolean>(isMyBookmark);
  const dDay = calculateRemainingDays(endDate);
  const dDayContent =
    dDay === "마감" ? "마감" : isMyApply ? "지원 완료" : `지원하기 ${dDay}`;

  const onHeartClick = () => {
    if (id) {
      if (isScrap) {
        deleteRecruitmentBookmark(id).then(() => {
          setIsScrap(!isScrap);
          setCount(count - 1);
        });
      } else {
        postRecruitmentBookmark(id).then(() => {
          setIsScrap(!isScrap);
          setCount(count + 1);
        });
      }
    }
  };

  const onApply = () => {};

  return (
    <div className="flex bg-white w-full space-x-3">
      <div className="flex-shrink-0">
        <SahreBtn onClick={() => {}} />
      </div>
      <div className="flex-shrink-0">
        <BookmarkBtn onClick={onHeartClick} count={count} isScrap={isScrap} />
      </div>
      {isMdUp ? (
        <div className="flex flex-shrink-0">
          <MediumBtn title={dDayContent} onClick={onApply} />
        </div>
      ) : (
        <div className="block flex-grow">
          <LargeBtn title={dDayContent} onClick={onApply} />
        </div>
      )}
    </div>
  );
};

export default RecruitmentBottomBar;
