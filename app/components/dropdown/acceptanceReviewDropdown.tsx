"use client";

import React, { useState } from "react";
import TransparentSmallBtn from "../button/basicBtn/transparentSmallBtn";
import IconBadge from "../badge/iconBadge";
import IconBtn from "../button/withIconBtn/IconBtn";
import ReportModal from "../modal/reportModal";
import Alert from "../alert/alert";
import ProgressBar from "../bar/progressBar";

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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
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
      className="w-full max-w-[1248px] p-4 md:pt-[18px] md:pb-[22px] md:pl-9 md:pr-[34px]
    rounded-lg bg-background focus:bg-hover md:hover:bg-hover md:focus:bg-pressed cursor-pointer"
    >
      {/* default */}
      <div
        className="flex flex-col items-start gap-3 md:gap-0 md:flex-row md:justify-between md:items-center"
        onClick={handleToggleDropdown}
      >
        <div className="flex flex-col items-start md:flex-row gap-3 md:gap-12">
          <div className="flex flex-col gap-4 md:gap-5">
            <h3 className="text-body1_m md:text-h4_sb text-text1">{title}</h3>
            <div className="flex flex-col gap-2 md:flex-row md:gap-[44px]">
              <IconBadge type={"서류"} text={`답변 문항 ${document}개`} />
              <IconBadge type={"면접"} text={`답변 문항 ${interview}개`} />
            </div>
          </div>
        </div>
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
        <div className="flex flex-col md:flex-row w-full justify-between mb-4 mt-7 md:mt-9 md:mb-2">
          <div className="flex md:flex-col w-full justify-between md:justify-normal md:w-[183px] md:gap-[44px]">
            <div className="flex flex-col gap-2.5 md:gap-[14px]">
              <h3 className="text-mobile_body1_sb md:text-h4_sb text-text1">
                합격전형
              </h3>
              <p className="text-subtext2 text-mobile_body1_r md:text-body2_m">
                서류 · 면접 전형
              </p>
            </div>
            <div className="flex flex-col gap-2.5 md:gap-[14px]">
              <h3 className="text-mobile_body1_sb md:text-h4_sb text-text1">
                면접방식
              </h3>
              <p className="text-subtext2 text-mobile_body1_r md:text-body2_m">
                온라인
              </p>
            </div>
            <div className="flex flex-col gap-2.5 md:gap-[14px]">
              <h3 className="text-mobile_body1_sb md:text-h4_sb text-text1">
                면접인원
              </h3>
              <p className="text-subtext2 text-mobile_body1_r md:text-body2_m">
                그룹면접
              </p>
            </div>
            <div className="hidden md:flex flex-col md:gap-[14px]">
              <h3 className="text-mobile_body1_sb md:text-h4_sb text-text1">
                면접분위기
              </h3>
              <ProgressBar />
            </div>
          </div>
          <div className="flex md:hidden flex-col gap-2.5 mb-2 mt-[26px]">
            <h3 className="text-mobile_body1_sb md:text-h4_sb text-text1">
              면접분위기
            </h3>
            <ProgressBar />
          </div>
          <div className="flex flex-col w-full max-w-[669px] md:gap-10">
            <div>
              <h3 className="md:block hidden text-body1_m md:text-h4_sb text-text1">
                서류문항
              </h3>
              <div className="mt-6">
                <p className="md:text-h4 text-mobile_body1_sb text-text1 mb-4 md:mb-[18px]">
                  문항-1
                </p>
                <div className="flex flex-col gap-[14px]">
                  <input
                    type="text"
                    value={inputValue}
                    placeholder="작성된 문항"
                    className="w-full p-3 md:px-[22px] md:py-[14px] rounded-xl md:text-body1_r text-mobile_body1_r bg-searchbar text-black focus:outline-none"
                  />
                  <input
                    type="text"
                    value={inputValue}
                    placeholder="어떤 문항을 작성할까용가리가리가리"
                    className="w-full p-3 md:px-[22px] md:py-[14px] rounded-xl md:text-body1_r text-mobile_body1_r bg-searchbar text-black focus:outline-none"
                  />
                </div>
              </div>
              <div className="mt-6">
                <p className="md:text-h4 text-mobile_body1_sb text-text1 mb-4 md:mb-[18px]">
                  문항-1
                </p>
                <div className="flex flex-col gap-[14px]">
                  <input
                    type="text"
                    value={inputValue}
                    placeholder="작성된 문항"
                    className="w-full p-3 md:px-[22px] md:py-[14px] rounded-xl md:text-body1_r text-mobile_body1_r bg-searchbar text-black focus:outline-none"
                  />
                  <input
                    type="text"
                    value={inputValue}
                    placeholder="어떤 문항을 작성할까용가리가리가리"
                    className="w-full p-3 md:px-[22px] md:py-[14px] rounded-xl md:text-body1_r text-mobile_body1_r bg-searchbar text-black focus:outline-none"
                  />
                </div>
              </div>
            </div>
            <div>
              <h3 className="md:block hidden text-body1_m md:text-h4_sb text-text1">
                면접문항
              </h3>
              <div className="mt-7 md:mt-6">
                <p className="md:text-h4 text-mobile_body1_sb text-text1 mb-4 md:mb-[18px]">
                  문항-1
                </p>
                <div className="flex flex-col gap-2.5 md:gap-[14px]">
                  <input
                    type="text"
                    value={inputValue}
                    placeholder="작성된 문항"
                    className="w-full p-3 md:px-[22px] md:py-[14px] rounded-xl md:text-body1_r text-mobile_body1_r bg-searchbar text-black focus:outline-none"
                  />
                  <input
                    type="text"
                    value={inputValue}
                    placeholder="어떤 문항을 작성할까용가리가리가리"
                    className="w-full p-3 md:px-[22px] md:py-[14px] rounded-xl md:text-body1_r text-mobile_body1_r bg-searchbar text-black focus:outline-none"
                  />
                </div>
              </div>
              <div className="mt-7 md:mt-6">
                <p className="md:text-h4 text-mobile_body1_sb text-text1 mb-4 md:mb-[18px]">
                  문항-1
                </p>
                <div className="flex flex-col gap-2.5 md:gap-[14px]">
                  <input
                    type="text"
                    value={inputValue}
                    placeholder="작성된 문항"
                    className="w-full p-3 md:px-[22px] md:py-[14px] rounded-xl md:text-body1_r text-mobile_body1_r bg-searchbar text-black focus:outline-none"
                  />
                  <input
                    type="text"
                    value={inputValue}
                    placeholder="어떤 문항을 작성할까용가리가리가리"
                    className="w-full p-3 md:px-[22px] md:py-[14px] rounded-xl md:text-body1_r text-mobile_body1_r bg-searchbar text-black focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <IconBtn
          type={"declaration"}
          size={"large"}
          title={"신고하기"}
          onClick={toggleBottomModal}
        />
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

export default AcceptanceReviewDropdown;
