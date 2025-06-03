"use client";

import useResponsive from "@/hooks/useResponsive";

import LeftMenu from "@/(club)/club/components/menu/leftMenu";
import ClubWithdrawalCard from "@/components/card/clubWithdrawalCard";
import HeaderSection from "./content/headerSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "폐쇄 신청 | 동아리 운영을 종료합니다",
  description: "운영진이 동아리를 종료하고 폐쇄할 수 있는 페이지입니다.",
  openGraph: {
    title: "폐쇄 신청 | 동아리 운영을 종료합니다",
    description: "운영진이 동아리를 종료하고 폐쇄할 수 있는 페이지입니다.",
    url: "https://ariari.com/club/management/close",
    siteName: "아리아리",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "아리아리",
      },
    ],
    type: "website",
  },
};

const ClubClosePage = () => {
  const isMdUp = useResponsive("md");

  return (
    <div className="md:bg-sub_bg">
      {!isMdUp && <HeaderSection title={"동아리 폐쇄하기"} />}
      <div className="flex lg:gap-9 md:pt-8 max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-lx mx-auto">
        {/* 임시 메뉴 */}
        <LeftMenu />
        <ClubWithdrawalCard isWithdrawal={false} />
      </div>
    </div>
  );
};

export default ClubClosePage;
