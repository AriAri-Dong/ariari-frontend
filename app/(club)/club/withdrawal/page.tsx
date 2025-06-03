"use client";

import { Metadata } from "next";
import useResponsive from "@/hooks/useResponsive";

import HeaderSection from "./content/headerSection";
import LeftMenu from "@/(club)/club/components/menu/leftMenu";
import ClubWithdrawalCard from "@/components/card/clubWithdrawalCard";

export const metadata: Metadata = {
  title: "탈퇴 신청 | 탈퇴 절차를 안내합니다",
  description: "탈퇴 절차를 안내하고, 간편하게 탈퇴를 신청할 수 있습니다.",
  openGraph: {
    title: "탈퇴 신청 | 탈퇴 절차를 안내합니다",
    description: "탈퇴 절차를 안내하고, 간편하게 탈퇴를 신청할 수 있습니다.",
    url: "https://ariari.com/club/withdrawal",
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

const ClubWithdrawalPage = () => {
  const isMdUp = useResponsive("md");

  return (
    <div className="md:bg-sub_bg">
      {!isMdUp && <HeaderSection title={"동아리 탈퇴하기"} />}
      <div className="flex lg:gap-9 md:pt-8 max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-lx mx-auto">
        <LeftMenu />
        <ClubWithdrawalCard isWithdrawal={true} />
      </div>
    </div>
  );
};

export default ClubWithdrawalPage;
