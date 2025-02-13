"use client";

import React, { useState } from "react";
import PlusBtn from "@/components/button/withIconBtn/plusBtn";
import RecruitmentCard from "@/components/card/recruitmentCard";
import AcceptanceReviewDropdown from "@/components/dropdown/acceptanceReviewDropdown";
import { ACCEPTANCE_REVIEWS, RECRUITMENT_CARDS } from "@/data/club";
import { MainRecruitmentCardProps } from "@/types/components/card";

interface ClubActivitiesProps {
  recruitmentId?: number;
  recruitmentData?: MainRecruitmentCardProps;
}

const ClubActivities = ({
  recruitmentId,
  recruitmentData,
}: ClubActivitiesProps) => {
  const [openDropdowns, setOpenDropdowns] = useState<boolean[]>(
    new Array(ACCEPTANCE_REVIEWS.length).fill(false)
  );

  const handleDropdownToggle = (index: number) => {
    setOpenDropdowns((prevState) => {
      return prevState.map((_, idx) => idx === index);
    });
  };

  return (
    <div className="bg-sub_bg flex justify-center items-center w-full">
      <div className="w-full max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-lx px-4 md:px-5">
        <h1 className="text-mobile_h1_contents_title mb-5 pt-8 md:pt-[44px] md:text-h1_contents_title text-text1">
          동아리 모집 안내
        </h1>
        <textarea className="w-full h-[247px] py-5 px-4 rounded-2xl" />
        <h1 className="text-mobile_h1_contents_title md:text-h1_contents_title text-text1 mt-[68px]">
          동아리 합격 후기
        </h1>
        <div className="flex flex-col mt-5 gap-3 md:gap-[14px]">
          {ACCEPTANCE_REVIEWS.map((item, index) => {
            return (
              <AcceptanceReviewDropdown
                key={item.id}
                title={item.title}
                date={item.date}
                onClick={() => {}}
                onBtnClick={() => {}}
                document={0}
                interview={0}
                isOpen={openDropdowns[index]}
                onToggle={() => handleDropdownToggle(index)}
              />
            );
          })}
        </div>
        <div className="flex justify-center mt-9 md:mt-10">
          <PlusBtn title={"더보기"} onClick={() => {}} />
        </div>
        <h1 className="text-mobile_h1_contents_title mt-12 md:text-h1_contents_title text-text1 md:mt-[68px]">
          이전 모집 공고
        </h1>
        <div className="flex flex-col mt-5 gap-3 md:gap-[14px]">
          {RECRUITMENT_CARDS.map((item) => {
            return (
              <RecruitmentCard
                key={item.id}
                title={item.title}
                date={item.date}
                onClick={() => {}}
                status={item.status === "모집중" ? "enable" : "disable"}
              />
            );
          })}
        </div>
        <div className="flex justify-center pb-[80px] md:pb-[124px] mt-9 md:mt-10">
          <PlusBtn title={"더보기"} onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default ClubActivities;
