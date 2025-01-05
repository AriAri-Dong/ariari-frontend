"use client";

import React from "react";

interface DayFloatingBarProps {}

// 추후 수정 필요!
// 양쪽 패딩 값 없음 (추가해야함.)

const MobilePointStatusFloatingBar = ({}: DayFloatingBarProps) => {
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
              후기 열람시 5포인트가 차감됩니다.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-primary">
            <p className="text-h4_sb">20</p>
            <p className="text-body3_r">p</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePointStatusFloatingBar;
