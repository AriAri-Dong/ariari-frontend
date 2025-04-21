"use client";

import React from "react";
import Image from "next/image";
import wallet from "@/images/icon/wallet.svg";
import { formatNumber } from "@/utils/formatNumber";

export interface MembershipBalanceBarProps {
  currentPoint: number;
  className?: string;
}

/**
 * 포인트 현황 플로팅 바 컴포넌트
 * @param currentPoint 현재 포인트
 * @returns
 */
const MembershipBalanceBar = ({
  currentPoint,
  className,
}: MembershipBalanceBarProps) => {
  return (
    <div className={`w-full justify-center ${className}`}>
      <div
        className="w-full bg-background rounded-48 border border-primary
        px-10 py-4"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Image src={wallet} alt={"wallet"} width={40} height={40} />
            <h3 className="text-h3 text-primary">동아리 회비 잔액</h3>
          </div>
          <div className="flex items-center gap-1 text-primary">
            <div className="text-h1_contents_title">
              {formatNumber(currentPoint)}
            </div>
            <p className="text-h4">원</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipBalanceBar;
