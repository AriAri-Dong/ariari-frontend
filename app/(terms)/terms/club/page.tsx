"use client";

import HeaderSection from "@/(club)/club/withdrawal/content/headerSection";
import NoticeCard from "@/components/card/NoticeCard";
import { TERMS_OF_CLUB } from "@/data/policies";
import useResponsive from "@/hooks/useResponsive";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "운영원칙 | 아리아리",
  description:
    "아리아리에서 제공하는 동아리 운영 관련 기본 원칙과 규정을 안내합니다.",
  openGraph: {
    title: "운영원칙 | 아리아리",
    description:
      "아리아리에서 제공하는 동아리 운영 관련 기본 원칙과 규정을 안내합니다.",
    url: "https://ariari.com/terms/privacy",
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

const ClubPolicyPage = () => {
  const isMdUp = useResponsive("md");
  return (
    <div className="mt-[46px] mb-20 md:mb-0">
      {!isMdUp && <HeaderSection title={"동아리 운영원칙"} />}
      <div className="hidden gap-[22px] mt-6 md:flex md:flex-col md:mt-8 md:">
        <h1 className="text-text1 md:text-h1_contents_title">
          동아리 운영원칙
        </h1>
      </div>
      <div className="flex flex-col gap-7 rounded-8 bg-background mt-5 mb-20 md:mb-[124px] md:mt-[22px] md:px-6 md:py-[26px] md:gap-10">
        <div className="flex flex-col gap-10 md:gap-12">
          {TERMS_OF_CLUB.map((info, index) => (
            <div key={index}>
              <NoticeCard info={info} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClubPolicyPage;
