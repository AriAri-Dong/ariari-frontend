"use client";

import React, { useState } from "react";
import useResponsive from "@/hooks/useResponsive";

import TransparentSmallBtn from "../button/basicBtn/transparentSmallBtn";
import IconBtn from "../button/withIconBtn/IconBtn";
import ReportModal from "../modal/reportModal";
import Alert from "../alert/alert";
import ReviewBadge from "../badge/review/reviewBadge";
import Loading from "../feedback/loading";
import ReportBottomSheet from "../bottomSheet/report/reportBottomSheet";

import formatDateToDot from "@/utils/formatDateToDot";
import { getClubReviewDetail } from "@/api/review/api";
import { ClubReviewData, ClubReviewDetail } from "@/types/review";
import { useUserStore } from "@/stores/userStore";

interface ActivityReviewDropdownProps {
  onClick: () => void;
  review: ClubReviewData;
  isOpenReview: boolean;
}

const ActivityReviewDropdown = ({
  onClick,
  review,
  isOpenReview,
}: ActivityReviewDropdownProps) => {
  const memberId = useUserStore((state) => state.user?.memberData.memberId);
  const isMdUp = useResponsive("md");

  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const [activityDetail, setActivityDetail] = useState<ClubReviewDetail | null>(
    null
  );
  const handleToggleDropdown = () => {
    onClick();

    if (!activityDetail) {
      getClubReviewDetail(review.id).then((detail) => {
        setActivityDetail(detail);
      });
    }
  };

  const toggleBottomModal = () => {
    setIsReportOpen((prev) => !prev);
  };

  const handleReportSubmit = () => {
    setIsReportOpen(false);
    setAlertMessage("신고가 정상적으로 접수되었습니다.");
  };
  return (
    <div
      className="w-full max-w-[1248px] p-4 md:py-[18px] md:px-6
    rounded-lg bg-background"
      // focus:bg-hover md:hover:bg-hover md:focus:bg-pressed
    >
      {/* default */}
      <div className="flex flex-col items-start gap-3 md:gap-0 md:flex-row md:justify-between md:items-center">
        <h3 className="text-body1_m md:text-h4 text-text1">{review.title}</h3>
        <div
          className="flex sm:justify-between sm:items-center sm:w-full
        md:w-auto md:self-startmd:m-w-[194px] md:gap-7"
        >
          <p className="text-subtext2 text-body4_r content-center md:text-body3_r">
            {formatDateToDot(review.createdDateTime)}
          </p>
          <TransparentSmallBtn
            title={isOpenReview ? "리뷰닫기" : "열람하기"}
            onClick={handleToggleDropdown}
            round={true}
          />
        </div>
      </div>

      {/* 드롭다운 */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpenReview ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {activityDetail ? (
          <>
            <p className="text-subtext1 text-mobile_body1_r md:text-body1_r mt-7 mb-5 md:mt-[42px] md:mb-7">
              {activityDetail?.body}
            </p>
            <div className="flex flex-wrap gap-2.5 md:gap-3">
              {activityDetail?.tagDataList.map((type, index) => (
                <ReviewBadge key={index} tag={type} />
              ))}
            </div>
            <div className="flex justify-between items-center w-full mt-4">
              <p className="text-unselected text-mobile_body3_r md:text-body2_m">
                {activityDetail?.nickname}
              </p>
              {activityDetail.creatorId !== memberId && (
                <IconBtn
                  type={"declaration"}
                  size={"small"}
                  title={"신고하기"}
                  onClick={toggleBottomModal}
                />
              )}
            </div>
          </>
        ) : (
          <Loading
            className="md:min-h-[162px]"
            lottieClassName="md:w-[40px] md:h-[40px]"
          />
        )}
      </div>

      {isMdUp
        ? isReportOpen && (
            <ReportModal
              id={review.id}
              reportTargetType="CLUB_REVIEW"
              onClose={() => setIsReportOpen(false)}
              onSubmit={handleReportSubmit}
            />
          )
        : isReportOpen && (
            <ReportBottomSheet
              id={review.id}
              reportTargetType="CLUB_REVIEW"
              onClose={() => setIsReportOpen(false)}
              onSubmit={handleReportSubmit}
            />
          )}
      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </div>
  );
};

export default ActivityReviewDropdown;
