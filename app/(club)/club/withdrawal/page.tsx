"use client";

import { useState } from "react";
import useResponsive from "@/hooks/useResponsive";

import HeaderSection from "./content/headerSection";
import LeftMenu from "@/(club)/club/components/menu/leftMenu";
import ClubWithdrawalCard from "@/components/card/clubWithdrawalCard";

const ClubWithdrawalPage = () => {
  const isMdUp = useResponsive("md");

  return (
    <div className="md:bg-sub_bg">
      {!isMdUp && <HeaderSection title={"동아리 탈퇴하기"} />}
      <div className="flex lg:gap-9 md:pt-8 flex lg:gap-9 md:pt-8 max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-lx mx-auto">
        {/* 임시 메뉴 */}
        <LeftMenu />
        <ClubWithdrawalCard isWithdrawal={true} />
      </div>
    </div>
  );
};

export default ClubWithdrawalPage;
