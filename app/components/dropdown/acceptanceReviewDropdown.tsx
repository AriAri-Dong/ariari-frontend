"use client";

import React, { useState } from "react";
import TransparentSmallBtn from "../button/basicBtn/transparentSmallBtn";
import IconBadge from "../badge/iconBadge";
import IconBtn from "../button/withIconBtn/IconBtn";
import ReportModal from "../modal/reportModal";
import Alert from "../alert/alert";
import ProgressBar from "../bar/progressBar";
import CustomInput from "../input/customInput";

interface AcceptanceReviewDropdownProps {
  onClick: () => void;
  onBtnClick: () => void;
  title: string;
  date: string;
  document: number;
  interview: number;
  isOpen: boolean;
  onToggle: () => void;
}

const SECTIONS = [
  {
    title: "서류문항",
    subDescription: "문항",
    questions: [
      { id: 1, question: "작성된 문항 1", answer: "작성된 답변 1" },
      { id: 2, question: "작성된 문항 2", answer: "작성된 답변 2" },
    ],
  },
  {
    title: "면접질문",
    subDescription: "질문",
    questions: [
      { id: 1, question: "작성된 질문 1", answer: "작성된 답변 1" },
      { id: 2, question: "작성된 질문 2", answer: "작성된 답변 2" },
      { id: 3, question: "작성된 질문 3", answer: "작성된 답변 3" },
    ],
  },
];

const AcceptanceReviewDropdown = ({
  onClick,
  onBtnClick,
  title,
  date,
  document,
  interview,
  isOpen,
  onToggle,
}: AcceptanceReviewDropdownProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isBottomModalOpen, setIsBottomModalOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

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
    rounded-lg bg-background cursor-pointer"
    >
      {/* 기본 내용 */}
      <div className="flex flex-col items-start gap-3 md:gap-0 md:flex-row md:justify-between md:items-center">
        <div className="flex flex-col w-full items-start md:flex-row gap-3 md:gap-12">
          <div className="flex flex-col w-full gap-4 md:gap-5">
            <div className="flex items-center justify-between">
              <h3 className="text-body1_m md:text-h4_sb text-text1">{title}</h3>
              <div className="md:flex hidden sm:justify-between sm:items-center sm:w-full md:w-auto md:self-startmd:m-w-[194px] md:gap-7">
                <p className="text-subtext2 text-body4_r content-center md:text-body3_r">
                  {date}
                </p>
                <TransparentSmallBtn
                  title={"열람하기"}
                  onClick={onToggle}
                  round={true}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 md:flex-row md:gap-[44px]">
              <IconBadge type={"서류"} text={`답변 문항 ${document}개`} />
              <IconBadge type={"면접"} text={`답변 문항 ${interview}개`} />
            </div>
          </div>
        </div>
        <div
          className="flex sm:justify-between sm:items-center sm:w-full
        md:hidden"
        >
          <p className="text-subtext2 text-body4_r content-center md:text-body3_r">
            {date}
          </p>
          <TransparentSmallBtn
            title={"열람하기"}
            onClick={onToggle}
            round={true}
          />
        </div>
      </div>

      {/* 드롭다운 */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col md:flex-row w-full justify-between mb-4 mt-7 md:mt-9 md:mb-2 md: gap-[56px]">
          <div className="flex md:flex-col w-full justify-between md:justify-normal md:w-[183px] md:gap-[44px]">
            {["합격전형", "면접방식", "면접인원"].map((label, index) => (
              <div key={index} className="flex flex-col gap-2.5 md:gap-[14px]">
                <h3 className="text-mobile_body1_sb md:text-h4_sb text-text1">
                  {label}
                </h3>
                <p className="text-subtext2 text-mobile_body1_r md:text-body2_m">
                  {index === 0
                    ? "서류 · 면접 전형"
                    : index === 1
                    ? "온라인"
                    : "그룹면접"}
                </p>
              </div>
            ))}
            {/* PC */}
            <div className="hidden md:flex flex-col md:gap-[14px] mb-6">
              <h3 className="text-mobile_body1_sb md:text-h4_sb text-text1">
                면접분위기
              </h3>
              <ProgressBar disabled={true} initialStep={4} />
            </div>
          </div>
          {/* 모바일 */}
          <div className="flex md:hidden flex-col gap-2.5 mb-8 mt-[26px]">
            <h3 className="text-mobile_body1_sb md:text-h4_sb text-text1">
              면접분위기
            </h3>
            <ProgressBar disabled={true} initialStep={2} />
          </div>
          <div className="flex flex-col w-full  md:gap-10 md:max-h-none">
            {SECTIONS.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="md:block hidden text-body1_m md:text-h4_sb mb-6 text-text1">
                  {section.title}
                </h3>
                <div className="flex flex-col md:max-h-[380px] md:overflow-y-auto no-scrollbar">
                  {section.questions.map((question, questionIdx) => (
                    <div
                      key={questionIdx}
                      className={`${questionIdx === 0 ? "" : "mt-6"}`}
                    >
                      <p
                        className={`md:text-h4 text-mobile_body1_sb text-text1 mb-4 md:mb-[18px]
                          ${
                            section.subDescription === "질문" &&
                            question.id === 1
                              ? "md:mt-0 mt-7"
                              : ""
                          }`}
                      >
                        {section.subDescription}-{question.id}
                      </p>
                      <div className="flex flex-col gap-[14px]">
                        <CustomInput
                          value={question.question}
                          placeholder="작성된 문항"
                          disable={true}
                          onChange={() => {}}
                        />
                        <CustomInput
                          value={question.answer}
                          placeholder="작성된 답변"
                          disable={true}
                          onChange={() => {}}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
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
