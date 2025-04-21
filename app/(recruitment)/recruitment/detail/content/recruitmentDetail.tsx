"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import ClubInfo from "./clubInfo";
import ClubActivities from "./clubActivities";

import { RecruitmentData, RecruitmentResponse } from "@/types/recruitment";

import {
  getClubRecruitmentList,
  getRecruitmentDetail,
} from "@/api/recruitment/api";
import Loading from "@/components/feedback/loading";
import ErrorNotice from "@/components/feedback/error";
import { useRecruitmentDetailQuery } from "@/hooks/recruitment/useRecruitmentDetailQuery";

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
