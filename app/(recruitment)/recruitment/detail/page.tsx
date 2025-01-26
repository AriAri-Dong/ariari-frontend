import React from "react";
import { RECRUITMENT_CARD } from "@/data/main";
import { MainRecruitmentCardProps } from "@/types/components/card";
import ClubActivities from "./content/clubActivities";
import ClubInfo from "./content/clubInfo";

export async function generateStaticParams() {
  const paths = RECRUITMENT_CARD.map((item) => ({
    id: item.id.toString(),
  }));

  return paths.map((path) => ({
    params: path,
  }));
}

async function fetchRecruitmentData(
  id: number
): Promise<MainRecruitmentCardProps | null> {
  return RECRUITMENT_CARD.find((item) => item.id === id) || null;
}

interface RecruitmentDetailPageProps {
  recruitmentData: MainRecruitmentCardProps | null;
}

const RecruitmentDetailPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const recruitmentData = await fetchRecruitmentData(Number(params.id));

  if (!recruitmentData) {
    return <h1>해당 모집 공고를 찾을 수 없습니다.</h1>;
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
