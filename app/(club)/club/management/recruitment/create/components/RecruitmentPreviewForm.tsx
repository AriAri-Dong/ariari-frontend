"use client";

import React, { useEffect } from "react";
import useResponsive from "@/hooks/useResponsive";

import Image from "next/image";
import noimage from "@/images/test/test.svg";

import close from "@/images/icon/close.svg";

import ClubInfo from "@/(recruitment)/recruitment/detail/content/clubInfo";
import ClubActivities from "@/(recruitment)/recruitment/detail/content/clubActivities";
import LargeBtn from "@/components/button/basicBtn/largeBtn";
import {
  ProcedureType,
  RecruitmentData,
  RecruitmentNoteData,
} from "@/types/recruitment";
import { useClubInfoQuery } from "@/hooks/club/useClubInfoQuery";
import { useSearchParams } from "next/navigation";

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

  const recruitmentData: RecruitmentData = {
    id: "",
    clubId: "",
    title: title,
    body: "",
    posterUri: imageUrl || noimage,
    procedureType: procedureType,
    limits: limits || 0,
    startDateTime: date[0] ? date[0].toISOString() : "",
    endDateTime: date[1] ? date[1].toISOString() : "",
    createdDateTime: new Date().toISOString(),
    recruitmentStatusType: "OPEN",
    isMyBookmark: false,
    recruitmentNoteDataList: recruitmentNoteDataList,
  };

  return !isTapOver ? (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm z-50 flex flex-col justify-between pt-[46px] ">
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
            <ClubInfo
              recruitmentData={recruitmentData}
              clubData={clubInfo!.clubData}
              applyFormData={null}
              isMyApply={false}
              isMyClub={false}
              bookmarks={0}
              type="PREVIEW"
            />
            <ClubActivities
              clubId={clubId}
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
      <div className="relative w-3/4 h-[calc(100vh-130px)] bg-white rounded-[16px] overflow-y-scroll no-scrollbar">
        <div style={{ pointerEvents: "none" }}>
          <div className="md:px-[60px] md:pt-[30px] lg:px-[100px] lg:pt-[50px] ">
            <ClubInfo
              recruitmentData={recruitmentData}
              clubData={clubInfo!.clubData}
              applyFormData={null}
              isMyApply={false}
              isMyClub={false}
              bookmarks={0}
              type="PREVIEW"
            />
          </div>
          <div className="bg-sub_bg md:px-[60px] md:pt-[30px] lg:px-[100px] lg:pt-[50px] ">
            <ClubActivities
              clubId={clubId}
              recruitmentId={""}
              body={body}
              recruitmentNoteDataList={recruitmentNoteDataList}
              prevRecruitmentList={prevRecruitmentList}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentPreviewForm;
