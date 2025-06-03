"use client";

import React, { Suspense } from "react";

import ClubRecruitmentContent from "./content/clubRecruitmentContent";

// export const metadata: Metadata = {
//   title: "모집공고 관리 | 새로운 멤버를 모집하세요",
//   description: "모집 공고를 등록하고 관리할 수 있는 페이지입니다.",
//   openGraph: {
//     title: "모집공고 관리 | 새로운 멤버를 모집하세요",
//     description: "모집 공고를 등록하고 관리할 수 있는 페이지입니다.",
//     url: "https://ariari.com/club/recruitment",
//     siteName: "아리아리",
//     images: [
//       {
//         url: "/logo.svg",
//         width: 1200,
//         height: 630,
//         alt: "아리아리",
//       },
//     ],
//     type: "website",
//   },
// };

const ClubRecruitmentPage = () => {
  return (
    <Suspense
      fallback={<div className="text-center p-10 text-subtext1">로딩중...</div>}
    >
      <ClubRecruitmentContent />
    </Suspense>
  );
};

export default ClubRecruitmentPage;
