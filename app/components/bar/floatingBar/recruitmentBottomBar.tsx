"use client";

import React, { useEffect, useState } from "react";
import MediumBtn from "@/components/button/basicBtn/mediumBtn";
import BookmarkBtn from "@/components/button/iconBtn/bookmarkBtn";
import SahreBtn from "@/components/button/iconBtn/shareBtn";
import LargeBtn from "@/components/button/basicBtn/largeBtn";
import { calculateRemainingDays } from "@/utils/dateFormatter";
import { useRouter, useSearchParams } from "next/navigation";
import useResponsive from "@/hooks/useResponsive";
import {
  deleteRecruitmentBookmark,
  postRecruitmentBookmark,
} from "@/api/recruitment/api";
import Alert from "@/components/alert/alert";
import { useUserStore } from "@/providers/user-store-provider";
import { useShallow } from "zustand/shallow";
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
  const router = useRouter();
  const isSignIn = useUserStore(useShallow((state) => state.isSignIn));

  const [count, setCount] = useState<number>(bookmarks);
  const [isScrap, setIsScrap] = useState<boolean>(isMyBookmark);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const dDay = calculateRemainingDays(endDate);
  const dDayContent =
    dDay === "마감" ? "마감" : isMyApply ? "지원 완료" : `지원하기 ${dDay}`;

  const isApplyAvailable = dDay !== "마감" && !isMyApply;

  const onHeartClick = () => {
    if (!isSignIn) {
      setAlertMessage("로그인 후 이용 가능합니다.");
      return;
    }
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

  const handleCopy = async () => {
    const currentUrl = window.location.href;
    try {
      await navigator.clipboard.writeText(currentUrl);
      setAlertMessage("URL이 복사 되었습니다.");
      return;
    } catch (err) {
      setAlertMessage("URL 복사에 실패했습니다.");
      return;
    }
  };

  const onApply = () => {
    if (isApplyAvailable) {
      // router.push("/");
    }
  };

  return (
    <div className="flex bg-white w-full space-x-3">
      <div className="flex-shrink-0">
        <SahreBtn onClick={handleCopy} />
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
      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </div>
  );
};

export default RecruitmentBottomBar;
