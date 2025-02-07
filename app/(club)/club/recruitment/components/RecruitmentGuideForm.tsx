"use client";

import React, { useEffect } from "react";
import useResponsive from "@/hooks/useResponsive";

import Image from "next/image";
import close from "@/images/icon/close.svg";

import LargeBtn from "@/components/button/basicBtn/largeBtn";
import NoticeBanner from "@/components/banner/noticeBanner";
import RecruitmentGuideBox from "./RecruitmentGuideBox";
import SmallBtn from "@/components/button/basicBtn/smallBtn";

interface RecruitmentPreviewFormProps {
  onClose: () => void;
  onSubmit: () => void;
}

/**
 *
 * @param onClose 닫기 함수
 * @param onSubmit 제출 함수
 */

const RecruitmentGuideForm = ({
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
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm z-50 flex flex-col justify-between pt-[46px] ">
      <div className="relative bg-background rounded-t-2xl">
        <div className="flex justify-between items-center px-4  pt-[22px] pb-4 border-b md:pb-5">
          <h2 className="text-mobile_h1_contents_title md:h1_contents_title">
            모집공고 작성
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

        <div
          className="px-4 py-[22px] overflow-y-scroll"
          // 상단, 버튼 부분 제외
          style={{ maxHeight: "calc(100vh - 46px - 65px - 80px)" }}
        >
          <NoticeBanner
            text={
              "모집공고 작성을 원하신다면 아리아리 운영원칙 제 4조 : 모집관련 조항에 동의해주세요."
            }
          />
          <h2 className="text-mobile_h2 mt-4 mb-3.5">
            아리아리 동아리 운영원칙 제 4조
            <br />
            :모집관련 조항
          </h2>
          <RecruitmentGuideBox />
        </div>
        <div className="fixed bottom-0 w-full px-4 pb-6 pt-1.5 bg-background">
          <LargeBtn title={"확인했습니다"} onClick={onSubmit} />
        </div>
      </div>
    </div>
  ) : (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      style={{ zIndex: 1000 }}
    >
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative w-3/4 p-5 pt-8 pb-[26px] bg-white rounded-[16px]">
        <h1 className="mb-4 text-h1_contents_title text-center">
          모집공고 작성
        </h1>
        <h4 className="mb-8 text-h4_r text-subtext1 text-center">
          모집공고 작성을 원하신다면
          <br />
          아리아리 운영원칙 제 4조 : 모집관련 조항에 동의해주세요.
        </h4>
        <div className="h-[260px] bg-searchbar rounded-12 p-5 pr-2.5 mb-8">
          <RecruitmentGuideBox />
        </div>
        <div className="w-fit mx-auto">
          <SmallBtn title={"확인했습니다"} onClick={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default RecruitmentGuideForm;
