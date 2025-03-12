"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import ClubInfo from "./clubInfo";
import ClubActivities from "./clubActivities";

import { ClubInfoCard } from "@/types/components/card";
import { RecruitmentData, RecruitmentNoteData } from "@/types/recruitment";
import { transformRecruitmentToMainCard } from "../util/transformRecruitmentToMainCard";

import axios from "axios";
import {
  getClubRecruitmentList,
  getRecruitmentDetail,
} from "@/api/recruitment/api";

const RecruitmentDetail = () => {
  const params = useSearchParams();
  const recruitmentId = params.get("id");
  const clubId = params.get("clubId") ?? "";

  // 이전 모집공고
  const [prevRecruitmentList, setPrevRecruitmentList] = useState<
    RecruitmentData[]
  >([]);
  // 변환된 모집 정보 정보
  const [recruitmentData, setRecruitmentData] = useState<ClubInfoCard | null>(
    null
  );
  // 추가 질문 정보
  const [recruitmentNoteDataList, setRecruitmentNoteDataList] = useState<
    RecruitmentNoteData[] | null
  >(null);

  const [loading, setLoading] = useState(true);
  const [errorMsg, setError] = useState<string | null>(null);

  useEffect(() => {
    if (recruitmentId) {
      const fetchRecruitmentDetail = async () => {
        try {
          setLoading(true);
          setRecruitmentData(null);
          const data = await getRecruitmentDetail(recruitmentId);
          const parsedData = transformRecruitmentToMainCard(data!);
          setRecruitmentData(parsedData);
          setRecruitmentNoteDataList(data!.recruitmentNoteDataList);
          setError(null);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const errorMessage =
              (error.response?.data as { message?: string })?.message ||
              "문제가 발생했습니다.";
            setError(errorMessage);
            console.log("error", errorMsg);
          } else {
            console.error("Unexpected error", error);
          }
        } finally {
          setLoading(false);
        }
      };
      fetchRecruitmentDetail();
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
    return <h4 className="w-full text-center text-h4">Loading...</h4>;
  }
  if (errorMsg) {
    return <h4 className="w-full text-center text-h4">{errorMsg}</h4>;
  }

  if (!recruitmentData || !recruitmentId) {
    return (
      <h4 className="w-full text-center text-h4">
        모집공고를 찾을 수 없습니다.
      </h4>
    );
  }
  return (
    <>
      <ClubInfo recruitmentData={recruitmentData} />
      <ClubActivities
        recruitmentId={recruitmentId}
        recruitmentNoteDataList={recruitmentNoteDataList}
        prevRecruitmentList={prevRecruitmentList || []}
      />
    </>
  );
};

export default RecruitmentDetail;
