"use client";

import React, { useState } from "react";
import ClubInfoSection from "../../content/clubInfoSection";
import AcceptanceReviewDropdown from "@/components/dropdown/acceptanceReviewDropdown";
import { ACCEPTANCE_REVIEWS } from "@/data/club";
import PlusBtn from "@/components/button/withIconBtn/plusBtn";
import PointStatusBar from "@/components/bar/pointStatusBar";
import MobilePointStatusBar from "@/components/bar/mobilePointStatusBar";
import { useRouter } from "next/navigation";
import WriteBtn from "@/components/button/iconBtn/writeBtn";
import Image from "next/image";
import DarkBtn from "@/components/button/withIconBtn/darkBtn";
import helpText from "@/images/icon/mobile_point_Helptext.svg";
import SubTap from "@/components/tab/subTap";
import NotificationRoundBtn from "@/components/button/iconBtn/notificationRound";
import RoundVectorBtn from "@/components/button/iconBtn/roundVectorBtn";
import AcceptanceReviewBottomSheet from "@/components/bottomSheet/acceptanceReviewBottomSheet";
import Alert from "@/components/alert/alert";
import useResponsive from "../../../../../hooks/useResponsive";
import AcceptanceReviewModal from "@/components/modal/review/acceptanceReviewModal";

const options = [
  { id: 0, label: "모집관리" },
  { id: 1, label: "동아리 멤버 관리" },
  { id: 2, label: "활동관리" },
  { id: 3, label: "활동내역" },
  { id: 4, label: "FAQ/Q&A" },
  { id: 5, label: "활동후기" },
  { id: 6, label: "합격후기" },
];

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
    setAlertMessage("합격후기가 등록되었습니다.");
    setOpenReview(false);
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
          <div className="flex mb-4 mt-6 md:mt-0 lg:hidden">
            <div className="w-10 h-10">
              <NotificationRoundBtn onClick={() => {}} />
            </div>
            <div className="flex overflow-x-auto no-scrollbar ml-2 relative">
              <div className="flex whitespace-nowrap">
                <SubTap optionData={options} />
              </div>
            </div>
            <div className="flex items-center">
              <RoundVectorBtn
                imageSize={20}
                className="w-7 h-7 p-0 rotate-90"
                onClick={() => {}}
              />
            </div>
          </div>

          <div className="flex gap-9">
            {/* 임시 메뉴 */}
            <div className="w-[256px] h-[536px] bg-white hidden lg:block" />
            <div className="w-full">
              <p className="text-subtext2 text-mobile_body2_m md:text-h4 mb-4 md:mb-[22px]">
                총 nnn개의 합격후기가 있어요.
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
                {ACCEPTANCE_REVIEWS.map((item) => {
                  return (
                    <AcceptanceReviewDropdown
                      key={item.id}
                      title={item.title}
                      date={item.date}
                      onClick={() => {}}
                      onBtnClick={() => console.log("열람하기")}
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
      </div>
    </>
  );
};

export default ReviewPage;
