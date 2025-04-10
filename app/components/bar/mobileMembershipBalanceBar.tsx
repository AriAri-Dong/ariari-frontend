import React from "react";
import { MembershipBalanceBarProps } from "./membershipBalanceBar";
import { formatNumber } from "@/utils/formatNumber";

/**
 * 포인트 현황 플로팅 바 컴포넌트
 * @param currentPoint 현재 포인트
 * @param className
 * @returns
 */

const MobileMembershipBalanceBar = ({
  currentPoint,
  className,
}: MembershipBalanceBarProps) => {
  return (
    <div className={`w-full flex justify-center ${className}`}>
      <div
        className="w-full bg-selectedoption_default rounded-lg
        px-5 py-[18px]"
      >
        <div className="flex justify-between items-center">
          <h3 className="text-body1_sb text-primary">동아리 회비 잔액</h3>
          <div className="flex items-center gap-0.5 text-primary text-h4_sb">
            <p>{formatNumber(currentPoint)}</p>
            <p>원</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMembershipBalanceBar;
