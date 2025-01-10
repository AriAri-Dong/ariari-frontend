"use client";

import { DayFloatingBarProps } from "@/types/components/point";
import React from "react";

/**
 * 포인트 현황 플로팅 바 컴포넌트
 * @param deductionPoint 차감 포인트
 * @param currentPoint 현재 포인트
 * @param className
 * @returns
 */

const MobilePointStatusBar = ({
  deductionPoint,
  currentPoint,
  className,
}: DayFloatingBarProps) => {
  return (
    <div className={`w-full flex justify-center lg:hidden ${className}`}>
      <div
        className="w-full bg-selectedoption_default rounded-lg
        max-w-[1248px] px-5 py-2"
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

export default MobilePointStatusBar;
