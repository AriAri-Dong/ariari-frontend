"use client";

import useResponsive from "@/hooks/useResponsive";
import { MembershipBalance } from "@/types/club";
import React from "react";

interface MembershipBalanceListProps {
  transactions: MembershipBalance[];
}

const MembershipBalanceList: React.FC<MembershipBalanceListProps> = ({
  transactions,
}) => {
  const isMdUp = useResponsive("md");

  return (
    <div className="w-full bg-white rounded-lg py-3 px-4 md:py-5 md:px-4">
      {transactions.map((transaction, index) => {
        const [year, month, day] = transaction.date.split(".");
        const isPositive = transaction.amount >= 0;
        const isFirst = index === 0;
        const isLast = index === transactions.length - 1;

        return (
          <div
            key={index}
            className={`flex items-center justify-between 
            md:border-b md:border-menuborder md:py-3 md:my-0 my-5
            ${isFirst ? "md:pt-0 mt-0" : ""} 
            ${isLast ? "md:pb-0 border-none mb-0" : ""}`}
          >
            <div className="flex w-full md:flex-row flex-col md:gap-10 gap-[6px]">
              {/* 날짜 */}
              {isMdUp ? (
                <div className="flex flex-col md:w-[65px] items-start text-subtext2 md:ml-5">
                  <p className="md:text-body3_m">{`${year}.${month}`}</p>
                  <p className="md:text-h1_contents_title">{day}</p>
                </div>
              ) : (
                <p className="text-mobile_body3_r text-subtext2">{`${year}.${month}.${day}`}</p>
              )}
              <div className="flex w-full justify-between md:items-center">
                {/* 타이틀 */}
                <div className="flex-1">
                  <p className="text-text1 text-mobile_body1_sb md:text-body1_sb">
                    {transaction.title}
                  </p>
                </div>

                {/* 입출금 금액 */}
                <div className="flex flex-col text-end md:gap-[6px] md:mr-5">
                  <div
                    className={`text-mobile_h4_sb md:text-h4_sb ${
                      isPositive ? "text-primary" : "text-noti"
                    }`}
                  >
                    {isPositive ? "+" : "-"}{" "}
                    {Math.abs(transaction.amount).toLocaleString()}원
                  </div>

                  {/* 잔액 */}
                  <div className="text-mobile_body3_r md:text-body3_r text-unselected">
                    {transaction.balance.toLocaleString()}원
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MembershipBalanceList;
