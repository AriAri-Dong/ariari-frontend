"use client";

import React, { useEffect } from "react";
import useResponsive from "@/hooks/useResponsive";

import Image from "next/image";
import close from "@/images/icon/close.svg";

import ClubInfo from "@/(recruitment)/recruitment/detail/content/clubInfo";
import ClubActivities from "@/(recruitment)/recruitment/detail/content/clubActivities";
import LargeBtn from "@/components/button/basicBtn/largeBtn";
import { ClubInfoCard } from "@/types/components/card";
import {
  ProcedureType,
  RecruitmentData,
  RecruitmentNoteData,
} from "@/types/recruitment";
import { useClubInfoQuery } from "@/hooks/club/useClubInfoQuery";
import { useSearchParams } from "next/navigation";
import formatDateToDot from "@/utils/formatDateToDot";
import no_image from "@/images/noImage/no-image.jpg";

interface RecruitmentPreviewFormProps {
  title: string;
  imageUrl: string | null;
  date: [Date | null, Date | null];
  limits: number | null;
  procedureType: ProcedureType;
  body: string;
  recruitmentNoteDataList: RecruitmentNoteData[];
  prevRecruitmentList: RecruitmentData[];

  onClose: () => void;
  onSubmit: () => void;
}

/**
 *
 * @param title 제목
 * @param imageUrl 모집 이미지
 * @param date [시작 날짜, 마감 날짜]
 * @param procedureType 절차
 * @param body 활동 내용
 * @param recruitmentNoteDataList 추가 항목
 * @param prevRecruitmentList 이전 모집 공고
 * @param onClose 닫기 함수
 * @param onSubmit 제출 함수
 */

const RecruitmentPreviewForm = ({
  title,
  imageUrl,
  date,
  limits,
  procedureType,
  body,
  recruitmentNoteDataList,
  prevRecruitmentList,
  onClose,
  onSubmit,
}: RecruitmentPreviewFormProps) => {
  const isTapOver = useResponsive("md");
  const params = useSearchParams();
  const clubId = params.get("clubId") ?? "";

  const { clubInfo } = useClubInfoQuery(clubId);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const recruitmentData: ClubInfoCard = {
    id: "",
    startDate: date[0] ? formatDateToDot(date[0].toISOString()) : "",
    endDate: date[1] ? formatDateToDot(date[1].toISOString()) : "",
    clubName: clubInfo!.clubData.name,
    clubImageUrl: clubInfo!.clubData.profileUri,
    title: title,
    imageUrl: imageUrl || no_image,
    limits: limits || 0,
    tag: {
      affiliation: clubInfo!.clubData.schoolData ? "교내" : "연합",
      field: clubInfo!.clubData.clubCategoryType,
      region: clubInfo!.clubData.clubRegionType,
      target: clubInfo!.clubData.participantType,
    },
    clubId: clubInfo!.clubData.id,
    isMyRecruitmentScrap: false,
    procedureType: procedureType,
    recruitmentBookmarks: 0,
    isMyClub: true,
    isMyApply: false,
    isMyClubBookmark: clubInfo!.clubData.isMyBookmark,
  };

  return !isTapOver ? (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm z-50 flex flex-col justify-between pt-[46px] pb-5  md:hidden">
      <div className="bg-background rounded-t-2xl">
        <div className="flex justify-between items-center px-4  pt-[22px] pb-4 border-b md:pb-5">
          <h2 className="text-mobile_h1_contents_title md:h1_contents_title">
            모집공고 미리보기
          </h2>
          <button
            onClick={onClose}
            className="flex justify-between items-center"
          >
            <Image
              src={close}
              alt="닫기"
              width={20}
              height={20}
              className="md:w-7 md:h-7"
            />
          </button>
        </div>

        <div className="overflow-y-scroll h-[calc(100vh-65px)]">
          <div className="h-5" />
          <div style={{ pointerEvents: "none" }}>
            <ClubInfo isPreview={true} recruitmentData={recruitmentData} />
            <ClubActivities
              recruitmentId={""}
              body={body}
              recruitmentNoteDataList={recruitmentNoteDataList}
              prevRecruitmentList={prevRecruitmentList}
            />
          </div>
          <section className="flex flex-col items-center gap-5 bg-sub_bg px-4 mt-[-40px] pb-[80px]">
            <LargeBtn title={"등록하기"} onClick={onSubmit} />
            <button
              onClick={onClose}
              className="border-none py-1 px-1.5 text-subtext2 text-mobile_body3_m"
            >
              모집공고 작성하기
            </button>
          </section>
        </div>
      </div>
    </div>
  ) : (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      style={{ zIndex: 1000 }}
    >
      <div className="absolute inset-0" onClick={onClose}></div>
      <div
        className="absolute top-4 right-4 cursor-pointer bg-white p-2 border border-menuborder rounded-full"
        onClick={onClose}
      >
        <Image src={close} alt={"닫기"} width={24} height={24} />
      </div>
      <div className="relative w-3/4 h-4/5 p-5 pb-6 bg-white rounded-[16px] overflow-y-scroll no-scrollbar">
        <div style={{ pointerEvents: "none" }}>
          <ClubInfo isPreview={true} recruitmentData={recruitmentData} />
          <ClubActivities
            recruitmentId={""}
            body={body}
            recruitmentNoteDataList={recruitmentNoteDataList}
            prevRecruitmentList={prevRecruitmentList}
          />
        </div>
      </div>
    </div>
  );
};

export default RecruitmentPreviewForm;
