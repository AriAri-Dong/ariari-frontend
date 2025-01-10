"use client";

import React from "react";
import ClubInfoSection from "../../content/clubInfoSection";
import AcceptanceReviewDropdown from "@/components/dropdown/acceptanceReviewDropdown";
import { ACCEPTANCE_REVIEWS } from "@/data/club";
import PlusBtn from "@/components/button/withIconBtn/plusBtn";
import PointStatusBar from "@/components/bar/pointStatusBar";
import MobilePointStatusBar from "@/components/bar/mobilePointStatusBar";

const ReviewPage = () => {
  const handleViewReview = () => {
    console.log("열람하기");
  };

  return (
    <>
      <div className="bg-background flex justify-center items-center w-full">
        <div className="w-full max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-lx px-4 md:px-5">
          <ClubInfoSection />
        </div>
      </div>
      <div className="bg-sub_bg flex justify-center items-center w-full pb-20 md:pb-[124px]">
        <div className="w-full max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-lx px-4 mt-6as  md:pt-8 md:px-5">
          <div className="flex gap-9">
            {/* 임시 메뉴 */}
            <div className="w-[256px] h-[536px] bg-white hidden md:block" />
            <div className="w-full">
              <p className="text-subtext2 md:text-h4 mb-[22px]">
                총 nnn개의 합격후기가 있어요.
              </p>
              <PointStatusBar deductionPoint={0} currentPoint={0} />
              <MobilePointStatusBar deductionPoint={0} currentPoint={0} />
              <div
                className="flex-row justify-between items-center w-full my-2.5 hidden md:flex
              py-[6px] pl-6 pr-[170px] rounded-lg bg-white70 text-subtext2 text-body1_m"
              >
                <p>제목</p>
                <p>작성일</p>
              </div>
              <div className="flex flex-col gap-3 md:gap-2.5">
                {ACCEPTANCE_REVIEWS.map((item) => {
                  return (
                    <AcceptanceReviewDropdown
                      key={item.id}
                      title={item.title}
                      date={item.date}
                      onClick={() => {}}
                      onBtnClick={handleViewReview}
                      document={0}
                      interview={0}
                    />
                  );
                })}
              </div>
              <div className="flex justify-center mt-9 md:mt-10">
                <PlusBtn title={"더보기"} onClick={() => {}} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewPage;