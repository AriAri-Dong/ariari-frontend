"use client";

import React from "react";
import LargeBtn from "@/components/button/basicBtn/largeBtn";
import WriteBtn from "@/components/button/iconBtn/writeBtn";
import { useRouter, useSearchParams } from "next/navigation";

interface DayFloatingBarProps {
  deadline: Date;
  isWriteButtonVisible: boolean;
  handleWrite?: () => void;
}

/**
 * 마감일을 알려주는 floatingBar 컴포넌트
 * @param deadline 마감일
 * @returns
 */
const RecruitmentGuideFloatingBar = ({
  deadline,
  isWriteButtonVisible,
  handleWrite = () => {},
}: DayFloatingBarProps) => {
  const params = useSearchParams();
  const clubId = params.get("clubId");
  const router = useRouter();

  const formattedDeadline = `${
    deadline.getMonth() + 1
  }월 ${deadline.getDate()}일 ${deadline.getHours()}:${deadline
    .getMinutes()
    .toString()
    .padStart(2, "0")} 모집 마감`;

  const handleView = () => {
    router.push(`/club/recruitment?clubId=${clubId}`);
  };

  return (
    <div
      className="hidden md:flex fixed bottom-0 w-full max-w-[1248px] mb-9
      justify-center left-1/2 transform -translate-x-1/2 px-5"
      style={{ zIndex: 50 }}
    >
      <div className="flex flex-col w-full">
        <div className="flex gap-5">
          <div
            className="w-full bg-white70 shadow-default rounded-56
        pl-[38px] pr-3 py-[10px]"
          >
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <p className="text-subtext1 text-body3_m">
                  모집 마감까지 남은 시간
                </p>
                <h3 className="text-h3 text-text1">{formattedDeadline}</h3>
              </div>
              <div className="w-full max-w-[390px]">
                <LargeBtn
                  title={"모집공고 보기"}
                  onClick={handleView}
                  round={true}
                />
              </div>
            </div>
          </div>
          {isWriteButtonVisible && (
            <div className="flex items-center">
              <WriteBtn onClick={handleWrite} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default RecruitmentGuideFloatingBar;
