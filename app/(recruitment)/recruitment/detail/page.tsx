"use client";

import { Metadata } from "next";
import React, { Suspense } from "react";
import Loading from "@/components/feedback/loading";
import dynamic from "next/dynamic";

const RecruitmentDetail = dynamic(() => import("./content/recruitmentDetail"), {
  loading: () => <Loading />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "모집공고 상세 | 새로운 시작을 함께할 동료를 찾으세요.",
  description:
    "새로운 멤버를 모집합니다! 활동 내용, 지원 자격, 모집 일정 등 상세 정보를 확인하세요.",
  openGraph: {
    title: "모집공고 상세 | 새로운 시작을 함께할 동료를 찾으세요.",
    description:
      "새로운 멤버를 모집합니다! 활동 내용, 지원 자격, 모집 일정 등 상세 정보를 확인하세요.",
    url: "https://ariari.com/recruitment/detail",
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

export default function RecruitmentDetailPage() {
  return (
    <Suspense fallback={<Loading />}>
      <RecruitmentDetail />
    </Suspense>
  );
}
