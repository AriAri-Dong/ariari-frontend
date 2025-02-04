"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import ClubInfo from "./content/clubInfo";
import ClubActivities from "./content/clubActivities";

import { MainRecruitmentCardProps } from "@/types/components/card";
import { RecruitmentData, RecruitmentNoteData } from "@/types/recruitment";
import { transformRecruitmentToMainCard } from "./util/transformRecruitmentToMainCard";

import { getClubRecruitmentList, getRecruitmentDetail } from "@/api/api";

//테스트용 => /recruitment/detail?id=673127617679043209&clubId=673127617498687669

const RecruitmentDetailPage = () => {
  const params = useSearchParams();
  const recruitmentId = params.get("id");
  const clubId = params.get("clubId");

  // 이전 모집공고
  const [prevRecruitmentList, setPrevRecruitmentList] = useState<
    RecruitmentData[]
  >([]);
  // 변환된 모집 정보 정보
  const [recruitmentData, setRecruitmentData] =
    useState<MainRecruitmentCardProps | null>(null);
  // 추가 질문 정보
  const [recruitmentNoteDataList, setRecruitmentNoteDataList] = useState<
    RecruitmentNoteData[] | null
  >(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (recruitmentId) {
      const fetchRecruitmentDetail = async () => {
        try {
          setLoading(true);
          setRecruitmentData(null);
          const data = await getRecruitmentDetail(recruitmentId);
          const parsedData = transformRecruitmentToMainCard(data);

          setRecruitmentData(parsedData);
          setRecruitmentNoteDataList(data.recruitmentNoteDataList);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

      fetchRecruitmentDetail();
    }
    if (clubId) {
      const fetchAccectanceReview = async () => {
        try {
          const data = await getClubRecruitmentList(clubId);
          setPrevRecruitmentList(data.recruitmentDataList);
        } catch (error) {
          console.error(error);
        }
      };
      fetchAccectanceReview();
    }
  }, [recruitmentId, clubId]);

  if (loading) {
    return <h4 className="w-full text-center text-h4">로딩 중...</h4>;
  }
  if (!recruitmentData) {
    return (
      <h4 className="w-full text-center text-h4">
        모집공고 데이터를 찾을 수 없습니다.
      </h4>
    );
  }

  return (
    <>
      <ClubInfo recruitmentData={recruitmentData} />
      <ClubActivities
        recruitmentNoteDataList={recruitmentNoteDataList}
        prevRecruitmentList={prevRecruitmentList || []}
      />
    </>
  );
};

export default RecruitmentDetailPage;
