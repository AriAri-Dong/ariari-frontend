"use client";

import React, { useState } from "react";
import TransparentSmallBtn from "../button/basicBtn/transparentSmallBtn";
import IconBtn from "../button/withIconBtn/IconBtn";
import ReportModal from "../modal/reportModal";
import Alert from "../alert/alert";
import ReviewBadge from "../badge/review/reviewBadge";

interface ActivityReviewDropdownProps {
  onClick: () => void;
  onBtnClick: () => void;
  title: string;
  date: string;
  username: string;
  detail: string;
  badgeType: (
    | "employment"
    | "experience"
    | "health"
    | "interest"
    | "relationship"
    | "selfDevelopment"
    | "skill"
  )[];
}

const ActivityReviewDropdown = ({
  onClick,
  onBtnClick,
  title,
  date,
  username,
  detail,
  badgeType,
}: ActivityReviewDropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isBottomModalOpen, setIsBottomModalOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleToggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleBottomModal = () => {
    setIsBottomModalOpen((prev) => !prev);
  };

  const handleReportSubmit = () => {
    setIsBottomModalOpen(false);
    setAlertMessage("신고가 정상적으로 접수되었습니다.");
  };

  return (
    <div
      className="w-full max-w-[1248px] p-4 md:py-[18px] md:px-6
    rounded-lg bg-background cursor-pointer"
      // focus:bg-hover md:hover:bg-hover md:focus:bg-pressed
    >
      {/* default */}
      <div
        className="flex flex-col items-start gap-3 md:gap-0 md:flex-row md:justify-between md:items-center"
        onClick={handleToggleDropdown}
      >
        <h3 className="text-body1_m md:text-h4 text-text1">{title}</h3>
        <div
          className="flex sm:justify-between sm:items-center sm:w-full
        md:w-auto md:self-startmd:m-w-[194px] md:gap-7"
        >
          <p className="text-subtext2 text-body4_r content-center md:text-body3_r">
            {date}
          </p>
          <TransparentSmallBtn
            title={"열람하기"}
            onClick={onBtnClick}
            round={true}
          />
        </div>
      </div>

      {/* 드롭다운 */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-subtext1 text-mobile_body1_r md:text-body1_r mt-7 mb-5 md:mt-[42px] md:mb-7">
          {detail}
        </p>
        <div className="flex flex-wrap gap-2.5 md:gap-3">
          {badgeType.map((type, index) => (
            <ReviewBadge key={index} type={type} />
          ))}
        </div>
        <div className="flex justify-between items-center w-full mt-4">
          <p className="text-unselected text-mobile_body3_r md:text-body2_m">
            {username}
          </p>
          <IconBtn
            type={"declaration"}
            size={"small"}
            title={"신고하기"}
            onClick={toggleBottomModal}
          />
        </div>
      </div>
      {isBottomModalOpen && (
        <ReportModal
          onClose={() => setIsBottomModalOpen(false)}
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
