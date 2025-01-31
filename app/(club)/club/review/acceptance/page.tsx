"use client";

import React, { useState } from "react";
import AcceptanceReviewDropdown from "@/components/dropdown/acceptanceReviewDropdown";
import { ACCEPTANCE_REVIEWS, MONILE_MENU_OPTIONS } from "@/data/club";
import PlusBtn from "@/components/button/withIconBtn/plusBtn";
import PointStatusBar from "@/components/bar/pointStatusBar";
import MobilePointStatusBar from "@/components/bar/mobilePointStatusBar";
import { useRouter } from "next/navigation";
import WriteBtn from "@/components/button/iconBtn/writeBtn";
import Image from "next/image";
import DarkBtn from "@/components/button/withIconBtn/darkBtn";
import helpText from "@/images/icon/mobile_point_Helptext.svg";
import SubTap from "@/components/tab/subTap";
import Alert from "@/components/alert/alert";
import useResponsive from "@/hooks/useResponsive";
import AcceptanceReviewModal from "@/components/modal/review/acceptanceReviewModal";
import ReviewFloatingBtn from "@/components/button/floatingBtn/reviewFloatingBtn";
import LeftMenu from "../../components/menu/leftMenu";
import AcceptanceReviewBottomSheet from "@/components/bottomSheet/review/acceptanceReviewBottomSheet";
import MobileMenu from "../../components/menu/mobileMenu";
import ClubInfoWrapper from "../../content/clubInfoWrapper";

const ReviewPage = () => {
  const router = useRouter();
  const isMdUp = useResponsive("md");

  const [openReview, setOpenReview] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [openDropdowns, setOpenDropdowns] = useState<boolean[]>(
    new Array(ACCEPTANCE_REVIEWS.length).fill(false)
  );

  const handleRouter = () => {
    router.push("/"); // 모집 공고 임시 경로
  };

  const handleWrite = () => {
    setOpenReview(true);
  };

  const handleSubmitSuccess = () => {
    setAlertMessage("합격후기가 등록되었습니다.");
    setOpenReview(false);
  };

  // 드롭다운 상태 변경 함수
  const handleDropdownToggle = (index: number) => {
    setOpenDropdowns((prevState) => {
      return prevState.map((_, idx) => idx === index);
    });
  };

  return (
    <>
      <div className="bg-sub_bg flex justify-center items-center w-full pb-20 md:pb-[124px]">
        <div className="w-full max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-lx px-4 mt-6 md:mt-8 md:px-5">
          <MobileMenu />
          <div className="flex gap-9">
            {/* 임시 메뉴 */}
            <LeftMenu />
            <div className="w-full">
              <p className="text-subtext2 text-mobile_body2_m md:text-h4 mb-4 md:mb-[22px]">
                총 {ACCEPTANCE_REVIEWS.length}개의 합격후기가 있어요.
              </p>
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
                {ACCEPTANCE_REVIEWS.map((item, index) => {
                  return (
                    <AcceptanceReviewDropdown
                      key={item.id}
                      title={item.title}
                      date={item.date}
                      document={0}
                      interview={0}
                      onClick={() => {}}
                      onBtnClick={() => {}}
                      isOpen={openDropdowns[index]}
                      onToggle={() => handleDropdownToggle(index)}
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
        <Image
          src={helpText}
          alt={"helpText"}
          className="fixed bottom-[125px] right-1.5 md:hidden"
          style={{ zIndex: 10 }}
        />
        <div className="fixed bottom-[77px] right-5 md:hidden">
          <WriteBtn onClick={handleWrite} />
        </div>
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 md:hidden">
          <DarkBtn title={"모집공고 보기"} onClick={handleRouter} />
        </div>
        {isMdUp
          ? openReview && (
              <AcceptanceReviewModal
                onClose={() => setOpenReview(false)}
                onSubmit={handleSubmitSuccess}
              />
            )
          : openReview && (
              <AcceptanceReviewBottomSheet
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
