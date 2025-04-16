"use client";

import { useState } from "react";
import useResponsive from "@/hooks/useResponsive";

import LeftMenu from "@/(club)/club/components/menu/leftMenu";
import ClubWithdrawalCard from "@/components/card/clubWithdrawalCard";
import { CLUB_MEMBER_DATA } from "@/data/clubMembers";
import { ClubMemberData } from "@/types/member";
import HeaderSection from "./content/headerSection";

const ClubClosePage = () => {
  const isMdUp = useResponsive("md");

  return (
    <div>
      {!isMdUp && <HeaderSection title={"동아리 폐쇄하기"} />}
      <div className="flex lg:gap-9 md:mt-8 max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-lx mx-auto">
        {/* 임시 메뉴 */}
        <LeftMenu />
        <ClubWithdrawalCard isWithdrawal={false} />
      </div>
    </div>
  );
};

export default ClubClosePage;
