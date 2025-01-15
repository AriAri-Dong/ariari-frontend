import Image from "next/image";
import React, { useEffect, useState } from "react";
import close from "@/images/icon/close.svg";
import CustomInput from "../input/customInput";
import RadioBtn from "../button/radioBtn";
import DeleteBtn from "../button/iconBtn/deleteBtn";
import LargeBtn from "../button/basicBtn/largeBtn";
import PullDown from "../pulldown/pullDown";
import ProgressBar from "../bar/progressBar";

export const INTERVIEWER = [
  { id: 0, label: "면접인원" },
  { id: 1, label: "0명" },
  { id: 2, label: "1명" },
  { id: 3, label: "2명" },
  { id: 4, label: "3명" },
  { id: 5, label: "4명" },
  { id: 6, label: "5명" },
  { id: 7, label: "5명 이상" },
];

export const INTERVIEWE_STYLE = [
  { id: 0, label: "면접방식" },
  { id: 1, label: "온라인" },
  { id: 2, label: "오프라인" },
  { id: 2, label: "기타" },
];

interface BottomSheetProps {
  onClose: () => void;
  className?: string;
}

const AcceptanceReviewBottomSheet = ({
  onClose,
  className,
}: BottomSheetProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [interviewer, setInterviewer] = useState<string[]>([]);
  const [intervieweStyle, setIntervieweStyle] = useState<string[]>([]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/50">
      <div className="absolute inset-0" onClick={handleClose} />
      <div
        className={`relative w-full h-[480px] overflow-y-auto px-4 bg-background rounded-t-[24px] shadow-default transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* title 영역 */}
        <div className="flex justify-between mt-[22px] mb-4">
          <h1 className="text-text1 text-mobile_h1_contents_title">
            합격후기 작성하기
          </h1>
          <Image src={close} alt={"닫기"} width={20} height={20} />
        </div>
        {/* 구분선 */}
        <div className="h-[1px] bg-menuborder " />
        {/* content 영역 */}
        <div>
          <h3 className="flex text-text1 text-mobile_h2 mt-[22px] mb-2.5">
            합격후기 제목
            <span className="text-noti text-mobile_body3_m pl-1">*</span>
          </h3>
          <CustomInput
            value={""}
            placeholder={"합격후기 제목을 작성해주세요"}
            onChange={() => {}}
          />
          <h3 className="flex text-text1 text-mobile_h2 mt-[30px] mb-2.5">
            합격 전형
            <span className="text-noti text-mobile_body3_m pl-1">*</span>
          </h3>
          <div className="flex gap-[14px] p-2">
            <RadioBtn isChecked={true} label={"서류"} onClick={() => {}} />
            <RadioBtn
              isChecked={false}
              label={"서류 · 면접"}
              onClick={() => {}}
            />
          </div>
          <div className="flex justify-between mt-[30px] mb-2.5 items-center">
            <h3 className="flex text-text1 text-mobile_h2">
              서류 문항
              <span className="text-noti text-mobile_body3_m pl-1">*</span>
            </h3>
            <p className="text-primary text-mobile_body3_m">+ 추가</p>
          </div>
          <div className="h-[1px] bg-menuborder " />
          <div className="flex flex-col">
            <div className="flex justify-between mt-[14px] mb-2.5">
              <h3 className="text-text1 text-mobile_h4_sb">문항 - 1</h3>
              <DeleteBtn onClick={() => {}} />
            </div>
            <div className="flex flex-col gap-2">
              <CustomInput
                value={""}
                placeholder={"문항을 작성해주세요"}
                onChange={() => {}}
              />
              <CustomInput
                value={""}
                placeholder={"답변을 작성해주세요"}
                onChange={() => {}}
              />
            </div>
          </div>
          <div className="flex justify-between mt-[30px] mb-2.5 items-center">
            <h3 className="flex text-text1 text-mobile_h2">
              면접
              <span className="text-noti text-mobile_body3_m pl-1">*</span>
            </h3>
          </div>
          <div className="flex w-full">
            <div className="flex flex-col">
              <div className="flex gap-[14px] mb-[14px]">
                <PullDown
                  optionData={INTERVIEWE_STYLE}
                  selectedOption={intervieweStyle}
                  handleOption={setIntervieweStyle}
                  optionSize={"mobile"}
                  forceDropdown={true}
                />
                <PullDown
                  optionData={INTERVIEWER}
                  selectedOption={interviewer}
                  handleOption={setInterviewer}
                  optionSize={"mobile"}
                  forceDropdown={true}
                />
              </div>
              <div className="flex gap-[6px] border px-3 py-[6px] rounded-20">
                <p className="flex text-text1 text-mobile_body2_m whitespace-nowrap">
                  분위기
                  <span className="text-noti text-mobile_body3_m pl-1">*</span>
                </p>
                <ProgressBar align="horizontal" />
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-[30px] mb-2.5 items-center">
            <h3 className="flex text-text1 text-mobile_h2">
              면접 질문
              <span className="text-noti text-mobile_body3_m pl-1">*</span>
            </h3>
            <p className="text-primary text-mobile_body3_m">+ 추가</p>
          </div>
          <div className="h-[1px] bg-menuborder " />
          <div className="flex flex-col">
            <div className="flex justify-between mt-[14px] mb-2.5">
              <h3 className="text-text1 text-mobile_h4_sb">질문 - 1</h3>
              <DeleteBtn onClick={() => {}} />
            </div>
            <div className="flex flex-col gap-2">
              <CustomInput
                value={""}
                placeholder={"질문을 작성해주세요"}
                onChange={() => {}}
              />
              <CustomInput
                value={""}
                placeholder={"답변을 작성해주세요"}
                onChange={() => {}}
              />
            </div>
          </div>
        </div>
        <div className="h-[113px] w-full bg-white" />
      </div>
      {/* 버튼 영역 */}
      <div className="fixed bottom-0 left-0 px-4 w-full">
        <div className="h-[6px] w-full bg-white" />
        <LargeBtn title={"등록하기"} onClick={() => {}} />
        <div className="h-6 w-full bg-white" />
      </div>
    </div>
  );
};

export default AcceptanceReviewBottomSheet;
