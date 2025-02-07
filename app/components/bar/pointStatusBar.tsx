"use client";

import React from "react";
import Image from "next/image";
import dollar from "@/images/icon/dollar.svg";
import { DayFloatingBarProps } from "@/types/components/point";

/**
 * 포인트 현황 플로팅 바 컴포넌트
 * @param deductionPoint 차감 포인트
 * @param currentPoint 현재 포인트
 * @returns
 */
const PointStatusBar = ({
  deductionPoint,
  currentPoint,
}: DayFloatingBarProps) => {
  return (
    <div className="hidden w-full lg:flex justify-center">
      <div
        className="w-full bg-background rounded-48 border border-primary
        max-w-[1248px] px-10 py-4"
      >
        <div className="flex justify-between">
          <div className="flex items-center">
            <Image src={dollar} alt={"dollar"} width={40} height={40} />
            <div className="flex flex-col ml-4">
              <h3 className="text-h3 text-primary">나의 포인트 현황</h3>
              <p className="text-body2_m text-primary">
                후기 열람시 {deductionPoint}포인트가 차감됩니다.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-primary">
            <div className="text-28">{currentPoint}</div>
            <p className="text-h4_r">p</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointStatusBar;
