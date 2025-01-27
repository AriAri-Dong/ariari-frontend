"use client";

import React, { useState } from "react";
import Image from "next/image";
import close from "@/images/icon/close.svg";
import Alert from "../../../../components/alert/alert";
import LargeBtn from "../../../../components/button/basicBtn/largeBtn";
import SmallBtn from "@/components/button/basicBtn/smallBtn";
import { colorMapping, tokenBg } from "../../../../utils/colorMapping";

interface FaqFormContentProps {
  title: string;
  setTitle: (value: string) => void;
  detail: string;
  setDetail: (value: string) => void;
  classification: string;
  setClassification: (value: string) => void;
  onClose: () => void;
  onSubmit: () => void;
}

/**
 * faq 모달/바텀시트 공통내용 컴포넌트
 * @param title qna 제목
 * @param setTitle
 * @param detail qna 내용
 * @param setDetail
 * @param onClose 바텀시트/모달 닫는 함수
 * @param onSubmit 신고 제출 함수
 * @returns
 */
const QnaFormContent = ({
  title,
  setTitle,
  classification,
  setClassification,
  detail,
  setDetail,
  onClose,
  onSubmit,
}: FaqFormContentProps) => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<number>(1);

  // 클릭 시 색상 변경
  const handleColorClick = (index: number) => {
    setSelectedColor(index);
  };

  const handleSubmit = () => {
    if (!title || !classification || !detail) {
      setAlertMessage("미입력한 항목이 있습니다");
      return;
    }

    setTitle("");
    setDetail("");
    onSubmit();
    onClose();
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center pb-4 border-b md:pb-5">
          <h2 className="text-mobile_h1_contents_title md:h1_contents_title">
            FAQ 작성하기
          </h2>
          <button
            onClick={onClose}
            className="w-5 h-5 flex justify-center items-center md:w-7 md:h-7"
          >
            <Image
              src={close}
              alt="닫기"
              width={16}
              height={16}
              className="md:w-6 md:h-6"
            />
          </button>
        </div>

        <div className="mt-[30px] md:mt-[22px]">
          <h3 className="flex text-mobile_h2 mb-[14px] md:mb-[18px] md:text-h3">
            FAQ 제목
            <span className="text-noti text-mobile_body3_m pl-1">*</span>
          </h3>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="FAQ 제목을 입력해주세요"
            className="w-full px-4 py-3 rounded-[12px] bg-searchbar text-mobile_body1_r md:px-[22px] md:py-[13px] md:text-body1_r focus:outline-none  placeholder:text-subtext2"
          />
        </div>
        <div className="mt-[30px] md:mt-7">
          <h3 className="flex text-mobile_h2 mb-[14px] md:mb-[18px] md:text-h3 md:flex-[6] ">
            FAQ 분류
            <span className="text-noti text-mobile_body3_m pl-1">*</span>
          </h3>
          <div className="items-center md:flex md:gap-5">
            <div className="w-full px-4 py-3 rounded-[12px] bg-searchbar text-mobile_body1_r md:px-[22px] md:py-[13px] md:text-body1_r  md:flex md:gap-5 md:justify-between">
              <input
                type="text"
                value={classification}
                onChange={(e) => setClassification(e.target.value)}
                placeholder="FAQ의 분류를 작성해 주세요. (예 : 일정)"
                maxLength={5}
                className="w-full text-mobile_body1_r bg-searchbar focus:outline-none placeholder:text-subtext2 md:text-body1_r"
              />
              <p className="hidden md:block text-unselected text-h4">
                {classification.length}/5
              </p>
            </div>
            <div className=" flex px-3 py-1.5 mt-[14px] bg-white rounded-3xl border border-neutral-200 justify-between items-center md:h-[45px] md:justify-start md:gap-2.5 md:flex-shrink md:mt-0 md:px-5 md:py-3 ">
              <div className="text-subtext1 whitespace-nowrap text-mobile_body1_m md:text-body2_m ">
                컬러
              </div>
              <div className="justify-center items-center gap-2 flex">
                {tokenBg.map((color, index) => {
                  const c = colorMapping[color];
                  const bg = c.bg;
                  const isSelected = index + 1 === selectedColor;

                  return (
                    <div
                      key={index}
                      className={`w-5 h-5 justify-center items-center flex `}
                      onClick={() => handleColorClick(index + 1)}
                    >
                      <div
                        className={`justify-center items-center flex  rounded-full ${bg} ${
                          isSelected ? "w-[18px] h-[18px]" : "w-5 h-5"
                        }`}
                      >
                        {isSelected && (
                          <div className="w-2 h-2 bg-white rounded-full m-auto" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <h3 className="flex text-mobile_h2 mb-[14px] mt-[30px] md:mb-[18px] md:text-h3  md:mt-7">
          FAQ 상세
          <span className="text-noti text-mobile_body3_m pl-1">*</span>
        </h3>
        <textarea
          placeholder="자주 묻는 질문, 혹은 질문이 예상되는 내용을 작성해주세요."
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          maxLength={1000}
          className="w-full h-full p-1 border-0 rounded-md resize-none text-mobile_body1_r 
          text-subtext1 md:h-[200px] focus:outline-none
          focus:ring-searchbarborder placeholder:text-unselected"
        />
      </div>
      <div className="mt-[6px] flex items-center gap-6 md:justify-end">
        <p className="text-right text-unselected text-mobile_h4 md:h4">
          {detail.length}/1000
        </p>
        <div className="w-full md:hidden">
          <LargeBtn onClick={handleSubmit} title={"등록하기"} />
        </div>
        <div className="hidden md:block">
          <SmallBtn
            onClick={handleSubmit}
            title={"등록하기"}
            className="hidden"
          />
        </div>
      </div>
      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </div>
  );
};

export default QnaFormContent;
