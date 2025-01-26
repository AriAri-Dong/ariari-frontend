"use client";

import React, { useState } from "react";
import Image from "next/image";
import close from "@/images/icon/close.svg";

import useResponsive from "@/hooks/useResponsive";

import LargeBtn from "@/components/button/basicBtn/largeBtn";

interface Step2ContentProps {
  nickname: string;
  setNickname: (value: string) => void;
  errorMessage: string | null;
  setErrorMessage: (value: string | null) => void;
  handleSubmit: () => void;
  onClose: () => void;
}

/**


 * @returns
 */
const Step2Content = ({
  nickname,
  setNickname,
  errorMessage,
  setErrorMessage,
  handleSubmit,
  onClose,
}: Step2ContentProps) => {
  const isTapOver = useResponsive("md");

  return (
    <div className="h-full flex flex-col">
      <div className="md:hidden">
        <div className="flex justify-between items-center pb-4 border-b md:pb-5">
          <h2 className="text-mobile_h1_contents_title md:h1_contents_title">
            동아리 활동 이름
          </h2>
          <button
            onClick={onClose}
            className="md:w-5 md:h-5 flex justify-center items-center md:w-7 md:h-7"
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
      </div>

      <div className="mt-[22px] md:m-0">
        <div className="flex gap-1">
          <h3
            className={`flex text-mobile_h2 mb-2.5 md:text-h1_contents_title md:mx-auto md:mb-4`}
          >
            {isTapOver ? "동아리 활동 이름" : "동아리 활동 이름 작성"}
          </h3>
          <span className="text-noti text-body3_m md:hidden">*</span>
        </div>
        <p className="mb-[14px] text-mobile_body3_r text-subtext2 md:text-h4 md:mb-8 md:text-center md:text-subtext1">
          동아리 활동을 하며 사용하실 이름을 작성해 주세요.
        </p>
        <div className="flex flex-col gap-[14px] md:gap-8">
          <div className="w-full">
            <input
              type="text"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
                setErrorMessage(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  // 엔터 키가 눌렸을 때 실행할 로직
                  handleSubmit();
                }
              }}
              placeholder="예 : 홍길동"
              className="w-full px-4 py-3 rounded-[12px] bg-searchbar text-mobile_body1_r md:px-[22px] md:py-[13px] md:text-body1_r focus:outline-none  placeholder:text-subtext2"
            />
            {errorMessage && (
              <p className="pl-4 mt-1 text-noti text-mobile_body3_r md:pl-[22px] md:text-body4_r md:mt-2">
                {errorMessage}
              </p>
            )}
          </div>
          <LargeBtn title={"작성완료"} onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Step2Content;
