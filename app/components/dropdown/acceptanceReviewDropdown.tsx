"use client";

import React from "react";
import TransparentSmallBtn from "../button/basicBtn/transparentSmallBtn";
import IconBadge from "../badge/iconBadge";

interface AcceptanceReviewDropdownProps {
  onClick: () => void;
  onBtnClick: () => void;
  title: string;
  date: string;
  document: number;
  interview: number;
}

const AcceptanceReviewDropdown = ({
  onClick,
  onBtnClick,
  title,
  date,
  document,
  interview,
}: AcceptanceReviewDropdownProps) => {
  return (
    <div
      className="w-full m-w-[1248px] p-4 md:pt-[18px] md:pb-[22px] md:pl-9 md:pr-[34px] rounded-lg
  bg-background focus:bg-hover md:hover:bg-hover md:focus:bg-pressed cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-col items-start gap-3 md:gap-0 md:flex-row md:justify-between md:items-center">
        <div className="flex flex-col items-start md:flex-row gap-3 md:gap-12">
          <div className="flex flex-col gap-4 md:gap-5">
            <h3 className="text-body1_m md:text-h4_sb text-text1">{title}</h3>
            <div className="flex flex-col gap-2 md:flex-row md:gap-[44px]">
              <IconBadge type={"서류"} text={`답변 문항 ${document}개`} />
              <IconBadge type={"면접"} text={`답변 문항 ${interview}개`} />
            </div>
          </div>
        </div>
        <div className="flex sm:justify-between sm:items-center sm:w-full md:w-auto md:self-start md:m-w-[194px] md:gap-7">
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
    </div>
  );
};

export default AcceptanceReviewDropdown;
