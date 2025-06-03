"use client";

import { Suspense } from "react";
import ClubMemberContent from "./content/ClubMemberContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "멤버 관리 | 구성원 정보를 관리하세요",
  description: "멤버 목록을 조회하고 권한 수정 및 멤버 초대를 할 수 있습니다.",
  openGraph: {
    title: "멤버 관리 | 구성원 정보를 관리하세요",
    description:
      "멤버 목록을 조회하고 권한 수정 및 멤버 초대를 할 수 있습니다.",
    url: "https://ariari.com/club/management/members",
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

const ClubMemberPage = () => {
  return (
    <Suspense
      fallback={<div className="text-center p-10 text-subtext1">로딩중...</div>}
    >
      <ClubMemberContent />
    </Suspense>
  );
};

export default ClubMemberPage;
