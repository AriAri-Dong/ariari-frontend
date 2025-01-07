"use client";

import { DayFloatingBarProps } from '@/data/point';
import React from "react";

// 추후 수정 필요!
// 양쪽 패딩 값 없음 (추가해야함.)


/**
 * 포인트 현황 플로팅 바 컴포넌트
 * @param deductionPoint 차감 포인트
 * @param currentPoint 현재 포인트
 * @returns 
 */

const MobilePointStatusFloatingBar = ({deductionPoint, currentPoint}: DayFloatingBarProps) => {
  return (
    <div
      className="fixed bottom-0 left-0 w-full flex justify-center md:hidden"
      style={{ zIndex: 1000 }}
    >
      <div
        className="w-full bg-selectedoption_default rounded-lg
        max-w-[1248px] mb-9 px-5 py-2"
      >
        <div className="flex justify-between">
          <div className="flex flex-col">
            <h3 className="text-body1_sb text-primary">내 포인트 현황</h3>
            <p className="text-body3_r text-primary">
              후기 열람시 {deductionPoint}포인트가 차감됩니다.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-primary">
            <p className="text-h4_sb">{currentPoint}</p>
            <p className="text-body3_r">p</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePointStatusFloatingBar;
