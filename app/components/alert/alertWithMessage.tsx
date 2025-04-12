"use client";

import React from "react";
import SmallBtn from "../button/basicBtn/smallBtn";

export interface AlertProps {
  text: string;
  description: string;
  leftBtnText: string;
  rightBtnText: string;
  onLeftBtnClick?: () => void;
  onRightBtnClick?: () => void;
}

/**
 * AlertWithMessage component
 * @param text 메인 텍스트
 * @param description 서브 텍스트
 * @param leftBtnText 왼쪽 버튼 텍스트
 * @param rightBtnText 오른쪽 버튼 텍스트
 * @param onLeftBtnClick 왼쪽 버튼 클릭 핸들러
 * @param onRightBtnClick 오른쪽 버튼 클릭 핸들러
 */
const AlertWithMessage = ({
  text,
  description,
  leftBtnText,
  rightBtnText,
  onLeftBtnClick = () => {},
  onRightBtnClick = () => {},
}: AlertProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500">
      <div
        className="flex flex-col gap-4 py-4 px-3 md:px-4
      bg-white rounded-xl shadow-default md:w-[320px] w-[300px]"
      >
        <div className="flex flex-col gap-2 md:gap-3">
          <h1 className="text-mobile_body1_sb text-text1 md:text-body1_sb">
            {text}
          </h1>
          <p className="text-mobile_body2_r text-subtext1 md:text-body2_r whitespace-pre-wrap">
            {description}
          </p>
        </div>
        {/* 버튼 영역 */}
        <div className="flex gap-5 items-center justify-end text-mobile_body2_sb md:text-body1_sb">
          <button className="text-primary" onClick={onLeftBtnClick}>
            {leftBtnText}
          </button>
          <SmallBtn title={rightBtnText} onClick={onRightBtnClick} round />
        </div>
      </div>
    </div>
  );
};

export default AlertWithMessage;
