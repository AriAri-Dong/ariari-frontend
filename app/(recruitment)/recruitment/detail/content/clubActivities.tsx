"use client";

import React, { useState } from "react";
import PlusBtn from "@/components/button/withIconBtn/plusBtn";
import RecruitmentCard from "@/components/card/recruitmentCard";
import AcceptanceReviewDropdown from "@/components/dropdown/acceptanceReviewDropdown";
import { ACCEPTANCE_REVIEWS } from "@/data/club";
import { RecruitmentData, RecruitmentNoteData } from "@/types/recruitment";
import formatDateToDot from "@/utils/formatDateToDot";
import { useRouter, useSearchParams } from "next/navigation";

interface ClubActivitiesProps {
  clubId: string;
  recruitmentId: string;
  body: string;
  recruitmentNoteDataList?: RecruitmentNoteData[] | null;
  prevRecruitmentList: RecruitmentData[];
}

const ClubActivities = ({
  clubId = "",
  recruitmentId,
  body,
  recruitmentNoteDataList,
  prevRecruitmentList,
}: ClubActivitiesProps) => {
  const router = useRouter();

  const [openDropdowns, setOpenDropdowns] = useState<boolean[]>(
    new Array(ACCEPTANCE_REVIEWS.length).fill(false)
  );
  const [prevRecruitmentListLength, setPrevRecruitmentListLength] = useState(3);

  const handleDropdownToggle = (index: number) => {
    setOpenDropdowns((prevState) => {
      return prevState.map((_, idx) => idx === index);
    });
  };

  return (
    <div className="bg-sub_bg flex justify-center items-center w-full">
      <div className="w-full max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-lx px-4 md:px-5">
        {recruitmentNoteDataList && (
          <>
            <h1 className="text-mobile_h1_contents_title mb-5 pt-8 md:pt-[44px] md:text-h1_contents_title text-text1">
              동아리 모집 안내
            </h1>
            <div className="flex flex-col gap-8 w-full py-5 px-4 rounded-2xl bg-background md:p-6 md:gap-[40px]">
              <div>
                <h3 className="mb-2.5 text-text1 text-mobile_h3 md:text-h3">
                  {"활동 내용"}
                </h3>
                <p className="text-mobile_body1_r text-subtext1">{body}</p>
              </div>
              {recruitmentNoteDataList?.map((item, index) => (
                <div key={index}>
                  <h3 className="mb-2.5 text-text1 text-mobile_h3 md:text-h3">
                    {item.question}
                  </h3>
                  <p className="text-mobile_body1_r text-subtext1">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
        <h1 className="text-mobile_h1_contents_title md:text-h1_contents_title text-text1 mt-[68px]">
          동아리 합격 후기
        </h1>
        <div className="flex flex-col mt-5 gap-3 md:gap-2.5">
          {ACCEPTANCE_REVIEWS.slice(3).map((item, index) => {
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
        <div className="flex flex-col mt-5 gap-3 md:gap-2.5">
          {prevRecruitmentList.length > 1 ? (
            prevRecruitmentList
              .slice(0, prevRecruitmentListLength)
              .filter((item) => item.id !== recruitmentId)
              .map((item) => (
                <RecruitmentCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  date={`${formatDateToDot(
                    item.startDateTime,
                    false,
                    true
                  )} ~ ${formatDateToDot(item.endDateTime, false, true)}`}
                  onClick={() => {}}
                  status={item.recruitmentStatusType}
                />
              ))
          ) : (
            <p className="text-gray-500 text-center">이전 모집이 없습니다.</p>
          )}
        </div>

        <div className="flex justify-center pb-[80px] md:pb-[124px] mt-9 md:mt-10">
          {prevRecruitmentListLength < prevRecruitmentList.length && (
            <PlusBtn
              title={"더보기"}
              onClick={() => setPrevRecruitmentListLength((prev) => prev + 3)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ClubActivities;
