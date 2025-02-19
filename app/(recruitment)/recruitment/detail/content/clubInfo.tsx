"use client";

import React, { useState } from "react";
import Image from "next/image";
import test_image from "@/images/test/test_image.jpg";
import Keyword from "@/components/button/keyword";
import { MdFavorite } from "react-icons/md";
import DayFloatingBar from "@/components/bar/floatingBar/dayFloatinBar";
import RecruitmentGuideFloatingBar from "@/components/bar/floatingBar/recruitmentGuideFloatingBar";
import PointStatusFloatingBar from "@/components/bar/floatingBar/pointStatusFloatingBar";
import MobilePointStatusFloatingBar from "@/components/bar/floatingBar/mobilePointStatusFloatingBar";
import RecruitmentBottomBar from "@/components/bar/floatingBar/recruitmentBottomBar";
import IconBtn from "@/components/button/withIconBtn/IconBtn";
import RecruitmentSummary from "../components/recruitmentSummary";
import ClubProfileCard from "@/components/card/clubProfileCard";
import ReportBottomSheet from "@/components/bottomSheet/report/reportBottomSheet";
import Alert from "@/components/alert/alert";
import ReportModal from "@/components/modal/reportModal";
import { MainRecruitmentCardProps } from "@/types/components/card";

interface ClubInfoProps {
  recruitmentId?: number;
  recruitmentData?: MainRecruitmentCardProps;
  isPreview?: boolean;
}

/**
 * @param isPreview 미리보기 페이지인지 여부
 */

const ClubInfo = ({
  recruitmentId,
  recruitmentData,
  isPreview = false,
}: ClubInfoProps) => {
  const [isHeart, setIsHeart] = useState<boolean>(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
  const [isBottomModalOpen, setIsBottomModalOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const clubImageSrc =
    typeof recruitmentData?.clubImageUrl === "string"
      ? recruitmentData?.clubImageUrl
      : recruitmentData?.clubImageUrl?.src || test_image;

  const imageSrc =
    typeof recruitmentData?.imageUrl === "string"
      ? recruitmentData?.imageUrl
      : recruitmentData?.imageUrl?.src || test_image;

  const onHeartClick = () => {
    setIsHeart(!isHeart);
  };
  const toggleBottomSheet = () => {
    setIsBottomSheetOpen((prev) => !prev);
  };

  const toggleBottomModal = () => {
    setIsBottomModalOpen((prev) => !prev);
  };

  const handleReportSubmit = () => {
    setIsBottomSheetOpen(false);
    setIsBottomModalOpen(false);
    setAlertMessage("신고가 정상적으로 접수되었습니다.");
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex flex-col mt-2 sm_md:flex-row sm_md:gap-[27px] md:pb-10 md:pt-8 md:flex-row md:gap-14 w-full max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-lx px-4 md:px-5">
        <div className="w-full max-w-[792px]">
          <Image
            src={clubImageSrc}
            alt={"test_image"}
            width={792}
            height={792}
            layout="responsive"
            className="rounded-48 object-cover"
          />
        </div>
        {/* 모바일 화면 */}
        <div>
          <div className="flex justify-between items-start mt-[18px] md:hidden">
            <p className="text-mobile_h1_contents_title text-text1">
              모집공고 제목 혹은 <br />
              동아리 한줄 소개 작성
            </p>
            <IconBtn
              type={"declaration"}
              size={"large"}
              title={""}
              onClick={toggleBottomSheet}
            />
          </div>
          <div className="h-0.5 bg-menuborder sm_md:w-[350px] mt-6 mb-6 md:hidden" />
          <div className="flex flex-col md:pt-[6px]">
            <div className="block md:hidden">
              <div className="flex flex-col">
                <div className="flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <Image
                      src={imageSrc}
                      alt={"Test Image"}
                      width={68}
                      height={68}
                      className="relative w-[68px] h-[68px] rounded-full overflow-hidden"
                    />
                    <ClubProfileCard
                      clubName={"동아리 이름"}
                      affiliation={"소속"}
                      field={"분야"}
                      region={"지역"}
                      target={"대상"}
                    />
                  </div>
                  <div className="cursor-pointer" onClick={onHeartClick}>
                    {isHeart ? (
                      <MdFavorite size={24} color="#D1F75D" />
                    ) : (
                      <MdFavorite size={24} color="#E3E3E3" />
                    )}
                  </div>
                </div>
                <div className="h-0.5 bg-menuborder mt-6 mb-6" />
                <RecruitmentSummary
                  members={6}
                  startDate={"2024.10.07"}
                  endDate={"2024.11.02"}
                  email={"123Sysys@gamil.com"}
                />
              </div>
            </div>
            {/* PC 화면 */}
            <div className="hidden md:block">
              <div className="flex items-center md:gap-5">
                <div className="relative w-[60px] h-[60px]">
                  <Image
                    src={imageSrc}
                    alt={"Test Image"}
                    width={60}
                    height={60}
                    className="relative w-[60px] h-[60px] rounded-full overflow-hidden"
                  />
                  <div
                    className="absolute bottom-0 right-0 cursor-pointer"
                    onClick={onHeartClick}
                  >
                    {isHeart ? (
                      <MdFavorite size={20} color="#D1F75D" />
                    ) : (
                      <MdFavorite size={20} color="#E3E3E3" />
                    )}
                  </div>
                </div>
                <h3 className="text-subtext1 text-h3">동아리 이름</h3>
              </div>
              <h1 className="text-h1_contents_title md:mt-8 md:mb-12">
                모집공고 제목 혹은 <br />
                동아리 한줄 소개 작성
              </h1>
              <div className="w-[340px] mt-10">
                <Keyword />
              </div>
              <div className="h-0.5 bg-menuborder mt-8 mb-7" />
              <RecruitmentSummary
                members={6}
                startDate={"2024.10.07"}
                endDate={"2024.11.02"}
                email={"123Sysys@gamil.com"}
              />
            </div>
            {!isPreview && (
              <div className="fixed bottom-0 left-0 right-0 md:static mt-10">
                <div className="bg-background px-4 pt-2 pb-6 md:px-0 md:pt-0 md:pb-0">
                  <RecruitmentBottomBar />
                </div>
              </div>
            )}
            <div className="h-5" />
            <div className="hidden md:flex">
              <IconBtn
                type={"declaration"}
                size={"large"}
                title={"신고하기"}
                onClick={toggleBottomModal}
              />
            </div>
          </div>
        </div>
        {/* <RecruitmentGuideFloatingBar deadline={new Date("2024-12-31T23:59:59")} /> */}
        {/* <DayFloatingBar deadline={new Date("2024-12-31T23:59:59")} /> */}
        {/* <PointStatusFloatingBar /> */}
        {/* <MobilePointStatusFloatingBar /> */}
        {isBottomSheetOpen && (
          <ReportBottomSheet
            onClose={() => setIsBottomSheetOpen(false)}
            onSubmit={handleReportSubmit}
          />
        )}
        {isBottomModalOpen && (
          <ReportModal
            onClose={() => setIsBottomModalOpen(false)}
            onSubmit={handleReportSubmit}
          />
        )}
        {alertMessage && (
          <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
        )}
      </div>
    </div>
  );
};

export default ClubInfo;
