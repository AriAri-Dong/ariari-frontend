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
  const [clubMember, setClubMember] = useState<ClubMemberData | null>(
    CLUB_MEMBER_DATA[1]
  ); // 0 => 일반회원, 1 => 관리자로 테스트가능

  return (
    <div>
      {!isMdUp && <HeaderSection title={"동아리 폐쇄하기"} />}
      <div className="flex lg:gap-9 md:mt-8">
        {/* 임시 메뉴 */}
        <LeftMenu />
        <ClubWithdrawalCard
          isWithdrawal={false}
          role={clubMember?.clubMemberRoleType || null}
        />
      </div>
    </div>
  );
};

export default ClubClosePage;
