import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ClubInfo from "./clubInfo";
import ClubActivities from "./clubActivities";
import { RecruitmentData } from "@/types/recruitment";
import { getClubRecruitmentList } from "@/api/recruitment/api";
import Loading from "@/components/feedback/loading";
import ErrorNotice from "@/components/feedback/error";
import { useRecruitmentDetailQuery } from "@/hooks/recruitment/useRecruitmentDetailQuery";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "모집공고 상세 | 아리아리",
  description:
    "새로운 멤버를 모집합니다! 활동 내용, 지원 자격, 모집 일정 등 상세 정보를 확인하세요.",
  openGraph: {
    title: "모집공고 상세 | 아리아리",
    description:
      "새로운 멤버를 모집합니다! 활동 내용, 지원 자격, 모집 일정 등 상세 정보를 확인하세요.",
    url: "https://www.ariari.kr/recruitment",
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

const RecruitmentDetail = () => {
  const params = useSearchParams();
  const recruitmentId = params.get("id") || "";
  // 모집 상세
  const {
    data: recruitmentData,
    isLoading,
    error,
  } = useRecruitmentDetailQuery(recruitmentId);

  // 이전 모집공고
  const [prevRecruitmentList, setPrevRecruitmentList] = useState<
    RecruitmentData[]
  >([]);

  // 이전 모집공고
  useEffect(() => {
    if (!recruitmentData?.clubData.id) return;

    const fetchPrevRecruitment = async () => {
      try {
        const data = await getClubRecruitmentList(recruitmentData.clubData.id);
        setPrevRecruitmentList(data!.recruitmentDataList);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPrevRecruitment();
  }, [recruitmentData?.clubData.id]);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return (
      <ErrorNotice
        title="Notice"
        description={
          error.message || "페이지를 불러오는 중 문제가 발생했습니다"
        }
      />
    );
  }

  if (!recruitmentData || !recruitmentId) {
    return <ErrorNotice title="" description="모집공고를 찾을 수 없습니다." />;
  }
  return (
    <>
      <ClubInfo
        recruitmentData={recruitmentData.recruitmentData}
        clubData={recruitmentData.clubData}
        applyFormData={recruitmentData.applyFormData}
        isMyApply={recruitmentData.isMyApply}
        isMyClub={recruitmentData.isMyClub}
        bookmarks={recruitmentData.bookmarks}
        myRecentApplyTempId={recruitmentData.myRecentApplyTempId}
      />
      <ClubActivities
        clubId={recruitmentData.clubData.id}
        recruitmentId={recruitmentId}
        body={recruitmentData.recruitmentData.body}
        recruitmentNoteDataList={recruitmentData.recruitmentNoteDataList}
        prevRecruitmentList={prevRecruitmentList || []}
      />
    </>
  );
};

export default RecruitmentDetail;
