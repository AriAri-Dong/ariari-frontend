"use client";

import React, { useEffect, useRef, useState } from "react";
import useResponsive from "@/hooks/useResponsive";

import Image from "next/image";
import close from "@/images/icon/close.svg";

import ClubInfo from "@/(recruitment)/recruitment/detail/content/clubInfo";
import ClubActivities from "@/(recruitment)/recruitment/detail/content/clubActivities";
import LargeBtn from "@/components/button/basicBtn/largeBtn";

interface RecruitmentPreviewFormProps {
  onClose: () => void;
  onSubmit: () => void;
}

/**
 *
 * @param onClose 닫기 함수
 * @param onSubmit 제출 함수
 */

const RecruitmentPreviewForm = ({
  onClose,
  onSubmit,
}: RecruitmentPreviewFormProps) => {
  const isTapOver = useResponsive("md");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

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
            <ClubInfo isPreview={true} />
            <ClubActivities />
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
      <div
        className="relative w-3/4 p-5 pb-6 bg-white rounded-[16px]"
        style={{ pointerEvents: "none" }} // 내부 클릭 차단
      >
        <ClubInfo />
      </div>
    </div>
  );
};

export default RecruitmentPreviewForm;
