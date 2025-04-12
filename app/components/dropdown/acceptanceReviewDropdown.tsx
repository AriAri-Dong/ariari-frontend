"use client";

import React, { useState } from "react";
import { useUserStore } from "@/providers/user-store-provider";
import { useShallow } from "zustand/shallow";
import useResponsive from "@/hooks/useResponsive";
import TransparentSmallBtn from "../button/basicBtn/transparentSmallBtn";
import IconBadge from "../badge/iconBadge";
import IconBtn from "../button/withIconBtn/IconBtn";
import ReportModal from "../modal/reportModal";
import Alert from "../alert/alert";
import ProgressBar from "../bar/progressBar";
import { PassReviewData, PassReviewDetail } from "@/types/review";
import ReportBottomSheet from "../bottomSheet/report/reportBottomSheet";
import formatDateToDot from "@/utils/formatDateToDot";
import { getAccectanceReviewDetail } from "@/api/review/api";
import ReviewField from "../input/reviewField";
import {
  getInterviewRatioLabel,
  getInterviewTypeLabel,
  getProcedureTypeLabel,
} from "@/utils/reviewMapping";

interface AcceptanceReviewDropdownProps {
  onClick: () => void;
  review: PassReviewData;
  isOpenReview: boolean;
}

const AcceptanceReviewDropdown = ({
  onClick,
  review,
  isOpenReview,
}: AcceptanceReviewDropdownProps) => {
  const isMdUp = useResponsive("md");
  const memberId = useUserStore(useShallow((state) => state.memberData.id));

  const [reviewDetail, setReviewDetail] = useState<PassReviewDetail | null>(
    null
  );
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const [isInterview, setIsInterview] = useState<boolean>(false);

  const toggleBottomModal = () => {
    setIsReportOpen((prev) => !prev);
  };

  const handleReportSubmit = () => {
    setIsReportOpen(false);
    setAlertMessage("신고가 정상적으로 접수되었습니다.");
  };

  const handleToggleDropdown = () => {
    onClick();

    if (!reviewDetail) {
      getAccectanceReviewDetail(review.id).then((detail) => {
        setReviewDetail(detail);
        setIsInterview(detail.procedureType === "INTERVIEW");
      });
    }
  };

  return (
    <div
      className="w-full max-w-[1248px] p-4 md:py-[26px] md:px-6 
    rounded-lg bg-background cursor-pointer"
    >
      {/* 기본 내용 */}
      <div className="flex flex-col items-start gap-3 md:gap-0 md:flex-row md:justify-between md:items-center">
        <div className="flex flex-col w-full items-start md:flex-row gap-3 md:gap-12">
          <div className="flex flex-col w-full gap-4 md:gap-5">
            <div className="flex items-center justify-between">
              <h3 className="text-body1_m md:text-h4_sb text-text1">
                {review.title}
              </h3>
              <div className="md:flex hidden sm:justify-between sm:items-center sm:w-full md:w-auto md:self-startmd:m-w-[194px] md:gap-7">
                <p className="text-subtext2 text-body4_r content-center md:text-body3_r">
                  {formatDateToDot(review.createdDateTime)}
                </p>
                <TransparentSmallBtn
                  title={isOpenReview ? "후기닫기" : "열람하기"}
                  onClick={handleToggleDropdown}
                  round={true}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 md:flex-row md:gap-[44px]">
              <IconBadge
                type={"서류"}
                text={`답변 문항 ${review.documentNoteCount}개`}
              />
              {review.interviewNoteCount !== 0 && (
                <IconBadge
                  type={"면접"}
                  text={`답변 문항 ${review.interviewNoteCount}개`}
                />
              )}
            </div>
          </div>
        </div>
        <div
          className="flex sm:justify-between sm:items-center sm:w-full
        md:hidden"
        >
          <p className="text-subtext2 text-body4_r content-center md:text-body3_r">
            {formatDateToDot(review.createdDateTime)}
          </p>
          <TransparentSmallBtn
            title={"열람하기"}
            onClick={handleToggleDropdown}
            round={true}
          />
        </div>
      </div>

      {/* 드롭다운 */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpenReview && reviewDetail ? "opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col md:flex-row w-full justify-between mb-4 mt-7 md:mt-9 md:mb-2 md:gap-[56px]">
          <div className="grid grid-cols-3 md:grid-cols-1 w-full justify-between md:justify-normal md:w-[183px] md:gap-[44px]">
            {(isInterview
              ? ["합격전형", "면접방식", "면접인원"]
              : ["합격전형"]
            ).map((label, index) => (
              <div
                key={index}
                className={`flex flex-col gap-2.5 md:gap-[14px]
                  ${index === 1 && "items-center"}
                  ${index === 2 && "items-end"}
                  md:items-start`}
              >
                <h3 className="text-mobile_body1_sb md:text-h4_sb text-text1">
                  {label}
                </h3>
                <p className="text-subtext2 text-mobile_body1_r md:text-body2_m">
                  {index === 0
                    ? getProcedureTypeLabel(reviewDetail?.procedureType)
                    : index === 1
                    ? getInterviewTypeLabel(reviewDetail?.interviewType)
                    : getInterviewRatioLabel(reviewDetail?.interviewRatioType)}
                </p>
              </div>
            ))}

            {/* PC */}
            {isInterview && (
              <div className="hidden md:flex flex-col md:gap-[14px] mb-6">
                <h3 className="text-mobile_body1_sb md:text-h4_sb text-text1">
                  면접분위기
                </h3>
                <ProgressBar
                  disabled={true}
                  currentStep={reviewDetail?.interviewMood}
                />
              </div>
            )}
          </div>
          {/* 모바일 */}
          {isInterview && (
            <div className="flex md:hidden flex-col gap-2.5 mt-[26px]">
              <h3 className="text-mobile_body1_sb md:text-h4_sb text-text1">
                면접분위기
              </h3>
              <ProgressBar
                disabled={true}
                currentStep={reviewDetail?.interviewMood}
              />
            </div>
          )}
          <div className="flex flex-col w-full gap-7 mt-8 md:mt-0 md:gap-10 md:max-h-none">
            <div>
              <h3 className="md:block hidden text-body1_m md:text-h4_sb mb-6 text-text1">
                서류 문항
              </h3>
              <div className="flex flex-col gap-6 md:max-h-[380px] md:overflow-y-auto no-scrollbar">
                {reviewDetail?.documentNotes.map((note, idx) => (
                  <div key={idx}>
                    <ReviewField note={note} title={"문항"} idx={idx + 1} />
                  </div>
                ))}
              </div>
            </div>
            {isInterview && (
              <div>
                <h3 className="md:block hidden text-body1_m md:text-h4_sb mb-6 text-text1">
                  면접 질문
                </h3>
                <div className="flex flex-col md:max-h-[380px] md:overflow-y-auto no-scrollbar">
                  {reviewDetail?.interviewNotes.map((note, idx) => (
                    <div key={idx}>
                      <ReviewField note={note} title={"질문"} idx={idx + 1} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        {reviewDetail?.creatorId !== memberId && (
          <IconBtn
            type={"declaration"}
            size={"large"}
            title={"신고하기"}
            onClick={toggleBottomModal}
          />
        )}
      </div>

      {isMdUp
        ? isReportOpen && (
            <ReportModal
              id={review.id}
              reportTargetType="PASS_REVIEW"
              onClose={() => setIsReportOpen(false)}
              onSubmit={handleReportSubmit}
            />
          )
        : isReportOpen && (
            <ReportBottomSheet
              id={review.id}
              reportTargetType="PASS_REVIEW"
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

export default AcceptanceReviewDropdown;
