"use client";

import HeaderSection from "@/(club)/club/withdrawal/content/headerSection";
import NoticeCard from "@/components/card/NoticeCard";
import { TERMS_OF_SERVICE_INFO } from "@/data/policies";
import useResponsive from "@/hooks/useResponsive";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "회원 약관 | 아리아리",
  description:
    "아리아리 서비스 이용을 위한 회원 가입 및 이용 약관을 확인하세요.",
  openGraph: {
    title: "회원 약관 | 아리아리",
    description:
      "아리아리 서비스 이용을 위한 회원 가입 및 이용 약관을 확인하세요.",
    url: "https://ariari.com/terms/user",
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

const TermsPage = () => {
  const isMdUp = useResponsive("md");

  return (
    <div className="mt-[46px] mb-20 md:mb-0">
      {!isMdUp && <HeaderSection title="아리아리 이용수칙" />}
      <div className="hidden gap-[22px] mt-6 md:flex md:flex-col md:mt-8 md:">
        <h1 className="text-text1 md:text-h1_contents_title">
          아리아리 이용수칙
        </h1>
        <p className="text-subtext2 text-body2_r whitespace-pre">
          {`본 이용수칙은 아리아리가 제공하는 서비스를 이용함에 있어, 플랫폼과 사용자 간의 권리, 의무 및 책임을 규정합니다.\n서비스를 이용하기 전에 본 이용수칙을 주의 깊게 읽어주시기 바랍니다.\n사용자는 본 이용수칙에 동의해야만 아리아리 서비스를 이용할 수 있으며, 이용수칙에 동의하지 않을 경우 서비스 이용이 제한될 수 있습니다`}
        </p>
      </div>
      <div className="flex flex-col gap-7 rounded-8 bg-background mt-5 mb-20 md:mb-[124px] md:mt-[22px] md:px-6 md:py-[26px] md:gap-10">
        <div className="flex flex-col gap-10 md:gap-12">
          {TERMS_OF_SERVICE_INFO.map((info, index) => (
            <div key={index}>
              <NoticeCard info={info} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
