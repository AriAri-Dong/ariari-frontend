"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import ClubInfo from "./clubInfo";
import ClubActivities from "./clubActivities";

import { ClubInfoCard } from "@/types/components/card";
import { RecruitmentData, RecruitmentNoteData } from "@/types/recruitment";
import { transformRecruitmentToMainCard } from "../util/transformRecruitmentToMainCard";

import {
  getClubRecruitmentList,
  getRecruitmentDetail,
} from "@/api/recruitment/api";
import Loading from "@/components/feedback/loading";
import ErrorNotice from "@/components/feedback/error";

const RecruitmentDetail = () => {
  const params = useSearchParams();
  const recruitmentId = params.get("id");

  const [clubId, setClubId] = useState<string>("");

  // 이전 모집공고
  const [prevRecruitmentList, setPrevRecruitmentList] = useState<
    RecruitmentData[]
  >([]);
  // 변환된 모집 정보 정보
  const [recruitmentData, setRecruitmentData] = useState<ClubInfoCard | null>(
    null
  );
  // 활동 내용
  const [body, setBody] = useState<string>("");
  // 추가 질문 정보
  const [recruitmentNoteDataList, setRecruitmentNoteDataList] = useState<
    RecruitmentNoteData[] | null
  >(null);

  const [loading, setLoading] = useState(true);
  const [errorMsg, setError] = useState<string | null>(null);

  useEffect(() => {
    if (recruitmentId) {
      getRecruitmentDetail(recruitmentId)
        .then((res) => {
          setLoading(true);
          setRecruitmentData(null);
          setClubId(res.clubData.id);
          setBody(res.recruitmentData.body);
          const parsedData = transformRecruitmentToMainCard(res!);
          setRecruitmentData(parsedData);
          setRecruitmentNoteDataList(res!.recruitmentNoteDataList);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    if (clubId) {
      const fetchPrevRecruitment = async () => {
        try {
          const data = await getClubRecruitmentList(clubId);
          setPrevRecruitmentList(data!.recruitmentDataList);
        } catch (error) {
          console.error(error);
        }
      };
      fetchPrevRecruitment();
    }
  }, [recruitmentId, clubId, errorMsg]);

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
      <ClubInfo recruitmentData={recruitmentData} />
      <ClubActivities
        recruitmentId={recruitmentId}
        body={body}
        recruitmentNoteDataList={recruitmentNoteDataList}
        prevRecruitmentList={prevRecruitmentList || []}
      />
    </>
  );
};

export default RecruitmentDetail;
