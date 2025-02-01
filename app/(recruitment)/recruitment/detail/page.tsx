"use client";

import React from "react";
import ClubInfo from "./content/clubInfo";
import ClubActivities from "./content/clubActivities";
import { RECRUITMENT_CARD } from "@/data/main";

const RecruitmentDetailPage = () => {
  const recruitmentId = Math.floor(Math.random() * 17) + 1;

  const recruitmentData = RECRUITMENT_CARD.find(
    (item) => item.id === recruitmentId
  );

  if (!recruitmentData) {
    return <div>데이터를 찾을 수 없습니다.</div>;
  }

  return (
    <>
      <ClubInfo recruitmentData={recruitmentData} />
      <ClubActivities recruitmentData={recruitmentData} />
    </>
  );
};

export default RecruitmentDetailPage;

// "use client";

// import React, { useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";
// import ClubActivities from "./content/clubActivities";
// import ClubInfo from "./content/clubInfo";
// import { RECRUITMENT_CARD } from "@/data/main";
// import { MainRecruitmentCardProps } from "@/types/components/card";

// const RecruitmentDetailPage = () => {
//   const params = useSearchParams();
//   const id = params.get("id");

//   // recruitmentData를 단일 객체로 변경
//   const [recruitmentData, setRecruitmentData] =
//     useState<MainRecruitmentCardProps | null>(null);

//   useEffect(() => {
//     if (id) {
//       const foundData = RECRUITMENT_CARD.find((item) => item.id === Number(id));
//       if (foundData) {
//         setRecruitmentData(foundData);
//       }
//     }
//   }, [id]);

//   return (
//     <>
//       {/* recruitmentData가 없으면 로딩 또는 에러 메시지 보여주기 */}
//       {recruitmentData ? (
//         <>
//           <ClubInfo recruitmentData={recruitmentData} />
//           <ClubActivities recruitmentData={recruitmentData} />
//         </>
//       ) : (
//         <>
//           <h1>로딩 페이지 필요</h1>
//         </>
//       )}
//     </>
//   );
// };

// export default RecruitmentDetailPage;
