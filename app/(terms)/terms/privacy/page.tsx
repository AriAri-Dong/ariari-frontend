"use client";

import HeaderSection from "@/(club)/club/withdrawal/content/headerSection";
import NoticeCard from "@/components/card/NoticeCard";
import { TERMS_OF_PRIVACY } from "@/data/policies";
import useResponsive from "@/hooks/useResponsive";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침 | 아리아리",
  description:
    "아리아리에서 수집되는 개인정보 처리 방침과 보호 정책을 확인하세요.",
  openGraph: {
    title: "개인정보처리방침 | 아리아리",
    description:
      "아리아리에서 수집되는 개인정보 처리 방침과 보호 정책을 확인하세요.",
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

const PrivacyPolicyPage = () => {
  const isMdUp = useResponsive("md");
  return (
    <div className="mt-[46px] mb-20 md:mb-0">
      {!isMdUp && <HeaderSection title={"개인정보 처리방침"} />}
      <div className="hidden gap-[22px] mt-6 md:flex md:flex-col md:mt-8 md:">
        <h1 className="text-text1 md:text-h1_contents_title">
          개인정보처리방침
        </h1>
        <p className="text-subtext2 text-body2_r">최종 수정일: [2025-03-21]</p>
      </div>
      <div className="flex flex-col gap-7 rounded-8 bg-background mt-5 mb-20 md:mb-[124px] md:mt-[22px] md:px-6 md:py-[26px] md:gap-10">
        <div className="flex flex-col gap-10 md:gap-12">
          {TERMS_OF_PRIVACY.map((info, index) => (
            <div key={index}>
              <NoticeCard info={info} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
