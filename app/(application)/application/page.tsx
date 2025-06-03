"use client";

import React, { Suspense } from "react";
import Loading from "@/components/feedback/loading";
import dynamic from "next/dynamic";
import { Metadata } from "next";

const Application = dynamic(() => import("./content/application"), {
  loading: () => <Loading />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "내 지원 내역 | 지원 현황을 확인하세요",
  description:
    "지원한 동아리 목록과 합격 여부, 진행 상황을 확인할 수 있는 공간입니다.",
  openGraph: {
    title: "내 지원 내역 | 지원 현황을 확인하세요",
    description:
      "지원한 동아리 목록과 합격 여부, 진행 상황을 확인할 수 있는 공간입니다.",
    url: "https://ariari.com/application",
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

export default function ApplicationPage() {
  return (
    <Suspense fallback={<></>}>
      <Application />
    </Suspense>
  );
}
