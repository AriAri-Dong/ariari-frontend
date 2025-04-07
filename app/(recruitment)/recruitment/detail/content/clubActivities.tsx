"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAcceptanceReviews } from "@/hooks/club/useAcceptanceReviews";

import PlusBtn from "@/components/button/withIconBtn/plusBtn";
import RecruitmentCard from "@/components/card/recruitmentCard";
import AcceptanceReviewDropdown from "@/components/dropdown/acceptanceReviewDropdown";
import { RecruitmentData, RecruitmentNoteData } from "@/types/recruitment";
import formatDateToDot from "@/utils/formatDateToDot";

const CONTENT_SIZE = 3;
const SORT = "createdDateTime,desc";

interface ClubActivitiesProps {
  clubId: string;
  recruitmentId: string;
  recruitmentNoteDataList?: RecruitmentNoteData[] | null;
  prevRecruitmentList: RecruitmentData[];
}

const ClubActivities = ({
  clubId,
  recruitmentId,
  recruitmentNoteDataList,
  prevRecruitmentList,
}: ClubActivitiesProps) => {
  const router = useRouter();

  const [prevRecruitmentListLength, setPrevRecruitmentListLength] = useState(4);
  const [visibleRecruitmentList, setVisibleRecruitmentList] = useState<
    RecruitmentData[]
  >([]);

  const {
    review,
    pageInfo,
    openReview,
    page,
    handleLoadMore,
    handleOpenReview,
  } = useAcceptanceReviews(clubId, CONTENT_SIZE, SORT);

  useEffect(() => {
    const list = prevRecruitmentList
      .filter((item) => item.id !== recruitmentId)
      .slice(0, prevRecruitmentListLength);
    setVisibleRecruitmentList(list);
  }, [prevRecruitmentListLength, prevRecruitmentList]);

  return (
    <div className="bg-sub_bg flex justify-center items-center w-full">
      <div className="w-full max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-lx px-4 md:px-5">
        {recruitmentNoteDataList && (
          <>
            <h1 className="text-mobile_h1_contents_title mb-5 pt-8 md:pt-[44px] md:text-h1_contents_title text-text1">
              동아리 모집 안내
            </h1>
            <div className="flex flex-col gap-8 w-full py-5 px-4 rounded-2xl bg-background md:p-6 md:gap-[40px]">
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
        {review.length > 0 && (
          <>
            <h1 className="text-mobile_h1_contents_title md:text-h1_contents_title text-text1 mt-[68px]">
              동아리 합격 후기
            </h1>
            <div className="flex flex-col mt-5 gap-3 md:gap-2.5">
              {review.map((item, index) => {
                return (
                  <AcceptanceReviewDropdown
                    key={item.id}
                    review={item}
                    onClick={() => handleOpenReview(item)}
                    isOpenReview={openReview === item.id}
                  />
                );
              })}
            </div>
            {pageInfo && pageInfo?.totalPages > page + 1 && (
              <div className="flex justify-center mt-9 md:mt-10">
                <PlusBtn title={"더보기"} onClick={handleLoadMore} />
              </div>
            )}
          </>
        )}
        {visibleRecruitmentList.length > 0 && (
          <>
            <h1 className="text-mobile_h1_contents_title mt-12 md:text-h1_contents_title text-text1 md:mt-[68px]">
              이전 모집 공고
            </h1>

            <div className="flex flex-col mt-5 gap-3 md:gap-2.5">
              {visibleRecruitmentList.map((item) => (
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
              ))}
            </div>

            <div className="flex justify-center  mt-9 md:mt-10">
              {prevRecruitmentListLength < prevRecruitmentList.length && (
                <PlusBtn
                  title={"더보기"}
                  onClick={() =>
                    setPrevRecruitmentListLength((prev) => prev + 3)
                  }
                />
              )}
            </div>
          </>
        )}
        <div className="h-[80px] md:h-[124px]"></div>
      </div>
    </div>
  );
};

export default ClubActivities;
