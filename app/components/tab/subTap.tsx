"use client";

import React, { useState } from "react";
import NotiPopUp from "../modal/notiPopUp";

interface SubTapProps {
  optionData: { id: number; label: string; number?: number }[];
}

const SubTap = ({ optionData }: SubTapProps) => {
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const schoolCertification = false; // 학교 인증 여부 임시값

  const handleValue = (index: number) => {
    if (
      !schoolCertification &&
      optionData[index].label == "교내" &&
      !isModalOpen
    ) {
      setModalOpen(true);
    } else {
      setSelectedOption(index);
    }
  };

  return (
    <div
      className={`h-[40px] p-[2px] flex justify-between items-center gap-[6px] bg-searchbar rounded-28 md:h-[44px] md:rounded-[28px] md:gap-[10px]`}
    >
      {optionData.map((option, index) =>
        selectedOption == index ? (
          <div
            key={index}
            className={`h-[36px] px-[16px] flex items-center justify-center gap-[4px] text-center font-semibold text-primary text-sm  bg-white shadow-default rounded-[28px] cursor-pointer transition-all duration-500 md:h-[40px] md:rounded-[28px] md:px-[20px] md:text-base`}
          >
            {option.label}
            {option.number && (
              <div className=" w-[20px] h-[20px] flex items-center justify-center bg-selectedoption_default rounded-full text-xs  md:w-[24px] md:h-[24px]">
                {option.number}
              </div>
            )}
          </div>
        ) : (
          <div
            key={index}
            className={`px-[16px] flex items-center justify-center gap-[4px] text-center text-unselected text-sm cursor-pointer md:px-[20px] md:text-base `}
            onClick={() => handleValue(index)}
          >
            {option.label}
            {option.number && (
              <div className="w-[20px] h-[20px] flex items-center justify-center bg-token_bg rounded-full text-xs text-center md:w-[24px] md:h-[24px]">
                {option.number}
              </div>
            )}
          </div>
        )
      )}

      {isModalOpen && (
        <NotiPopUp
          onClose={() => setModalOpen(false)}
          icon="school"
          title="학교 등록이 필요합니다"
          description={`교내 인기 동아리를 확인하기 위해서는\n학교 등록이 필요합니다.`}
          firstButton={() => {}}
          firstButtonText="학교 등록하기"
          secondButton={() => setModalOpen(false)}
          secondButtonText="다음에 할게요"
          modalType="button"
        />
      )}
    </div>
  );
};

export default SubTap;
