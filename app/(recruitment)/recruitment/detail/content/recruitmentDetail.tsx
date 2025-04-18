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

const RecruitmentDetail = () => {
  const params = useSearchParams();
  const recruitmentId = params.get("id");

  // 이전 모집공고
  const [prevRecruitmentList, setPrevRecruitmentList] = useState<
    RecruitmentData[]
  >([]);
  // 모집상세
  const [recruitmentData, setRecruitmentData] = useState<RecruitmentResponse>();

  const [loading, setLoading] = useState(true);
  const [errorMsg, setError] = useState<string | null>(null);

  // 모집공고 상세
  useEffect(() => {
    if (!recruitmentId) return;

    setLoading(true);
    getRecruitmentDetail(recruitmentId)
      .then((res) => {
        setRecruitmentData(res);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [recruitmentId]);

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

  if (loading) {
    return <Loading />;
  }
  if (errorMsg) {
    return <ErrorNotice description={errorMsg} />;
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
