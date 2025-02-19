"use client";

import React, { useState } from "react";
import { ACTIVITY_REVIEWS, PERCENT_DATA } from "@/data/club";
import PlusBtn from "@/components/button/withIconBtn/plusBtn";
import PointStatusBar from "@/components/bar/pointStatusBar";
import MobilePointStatusBar from "@/components/bar/mobilePointStatusBar";
import { useRouter } from "next/navigation";
import WriteBtn from "@/components/button/iconBtn/writeBtn";
import Image from "next/image";
import DarkBtn from "@/components/button/withIconBtn/darkBtn";
import helpText from "@/images/icon/mobile_point_Helptext.svg";
import Alert from "@/components/alert/alert";
import useResponsive from "@/hooks/useResponsive";
import ActivityReviewModal from "@/components/modal/review/activityReviewModal";
import ActivityReviewDropdown from "@/components/dropdown/activityReviewDropdown";
import ReviewPercentList from "@/components/list/reviewPercentList";
import MobileReviewPercentList from "@/components/list/mobileReviewPercentList";
import ReviewFloatingBtn from "@/components/button/floatingBtn/reviewFloatingBtn";
import LeftMenu from "../../components/menu/leftMenu";
import ActivityReviewBottomSheet from "@/components/bottomSheet/review/activityReviewBottomSheet";
import MobileMenu from "../../components/menu/mobileMenu";
import ClubInfoWrapper from "../../content/clubInfoWrapper";

const ReviewPage = () => {
  const router = useRouter();
  const isMdUp = useResponsive("md");

  const [openReview, setOpenReview] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleRouter = () => {
    // 모집 공고 임시 경로
    router.push("/");
  };

  const handleWrite = () => {
    setOpenReview(true);
  };

  const handleSubmitSuccess = () => {
    setAlertMessage("활동후기가 등록되었습니다.");
    setOpenReview(false);
  };

  return (
    <>
      <div className="bg-sub_bg flex justify-center items-center w-full pb-20 md:pb-[124px]">
        <div className="w-full max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-lx px-4 mt-6 md:mt-8 md:px-5">
          <MobileMenu />
          <div className="flex lg:gap-9">
            {/* 임시 메뉴 */}
            <div className="flex flex-col">
              <LeftMenu />
              <ReviewPercentList badges={PERCENT_DATA} className="mt-10" />
            </div>
            <div className="w-full">
              <p className="text-subtext2 text-mobile_body2_m md:text-h4 mb-4 md:mb-[22px]">
                총 nnn개의 활동후기가 있어요.
              </p>
              <MobileReviewPercentList
                badges={PERCENT_DATA}
                className={"mb-4"}
              />
              <PointStatusBar deductionPoint={0} currentPoint={0} />
              <MobilePointStatusBar
                deductionPoint={0}
                currentPoint={0}
                className="mb-2.5"
              />
              <div
                className="flex-row justify-between items-center w-full my-2.5 hidden md:flex
              py-1.5 pl-6 pr-[176px] rounded-lg bg-white70 text-subtext2 text-body1_m"
              >
                <p>제목</p>
                <p>작성일</p>
              </div>
              <div className="flex flex-col gap-3 md:gap-2.5">
                {ACTIVITY_REVIEWS.map((item) => (
                  <ActivityReviewDropdown
                    key={item.id}
                    title={item.title}
                    date={item.date}
                    username={item.username}
                    onClick={() => {}}
                    onBtnClick={() => console.log("열람하기")}
                    detail={item.detail}
                    badgeType={
                      item.badgeType as (
                        | "employment"
                        | "experience"
                        | "health"
                        | "interest"
                        | "relationship"
                        | "selfDevelopment"
                        | "skill"
                      )[]
                    }
                  />
                ))}
              </div>
              <div className="flex justify-center mt-9 md:mt-10">
                <PlusBtn title={"더보기"} onClick={() => {}} />
              </div>
            </div>
          </div>
        </div>
        <Image
          src={helpText}
          alt={"helpText"}
          className="fixed bottom-[125px] right-1.5 md:hidden"
        />
        <div className="fixed bottom-[77px] right-5 md:hidden">
          <WriteBtn onClick={handleWrite} />
        </div>
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 md:hidden">
          <DarkBtn title={"모집공고 보기"} onClick={handleRouter} />
        </div>
        {isMdUp
          ? openReview && (
              <ActivityReviewModal
                onClose={() => setOpenReview(false)}
                onSubmit={handleSubmitSuccess}
              />
            )
          : openReview && (
              <ActivityReviewBottomSheet
                onClose={() => setOpenReview(false)}
                onSubmit={handleSubmitSuccess}
              />
            )}
        {alertMessage && (
          <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
        )}
        {!openReview && <ReviewFloatingBtn onClick={handleWrite} />}
      </div>
    </>
  );
};

export default ReviewPage;
