"use client";

import React, { useState } from "react";
import Image from "next/image";
import test_image from "@/images/test/test12.png";
import baby from "@/images/test/baby.png";
import share from "@/images/icon/share.svg";
import dotMenu from "@/images/icon/dotMenu.svg";
import { MdFavorite } from "react-icons/md";
import Alert from "@/components/alert/alert";
import IconBtn from "@/components/button/withIconBtn/IconBtn";
import LargeBtn from "@/components/button/basicBtn/largeBtn";
import RecruitmentGuideFloatingBar from "@/components/bar/floatingBar/recruitmentGuideFloatingBar";
import CommonBottomSheet from "@/components/bottomSheet/commonBottomSheet";
import { CATEGORY, MENU_DATA } from "@/data/club";
import useResponsive from "@/hooks/useResponsive";
import ReportModal from "@/components/modal/reportModal";
import ReportBottomSheet from "@/components/bottomSheet/report/reportBottomSheet";

/**
 * Club 페이지에서 사용되는 clubInfo 공통 section
 * @returns
 */
const ClubInfoSection = () => {
  const isMdUp = useResponsive("md");

  const [isHeart, setIsHeart] = useState<boolean>(false);
  const [isCopy, setIsCopy] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const onHeartClick = () => {
    setIsHeart(!isHeart);
  };

  const handleModify = () => {
    console.log("동아리 정보 수정 핸들러");
  };

  const handleReport = () => {
    setIsReportOpen(true);
  };

  const handleReportSubmit = () => {
    setIsReportOpen(false);
    setAlertMessage("신고가 정상적으로 접수되었습니다.");
  };

  // URL이 복사
  const handleShare = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      setIsCopy(true);
      setMessage("URL이 복사 되었습니다.");
      setTimeout(() => {
        setIsCopy(false);
      }, 1500);
      return;
    } catch (err) {
      setIsCopy(true);
      setMessage("URL 복사에 실패했습니다.");
      setTimeout(() => {
        setIsCopy(false);
      }, 1500);
      return;
    }
  };

  // 모바일 해상도에서 바텀시트 메뉴 클릭 이벤트
  const handleMenuClick = (label: string) => {
    switch (label) {
      case "공유하기":
        handleShare();
        break;
      case "신고하기":
        alert("신고하기 동작");
        break;
      case "동아리 탈퇴하기":
        alert("동아리 탈퇴하기 동작");
        break;
      default:
        break;
    }
    setIsBottomSheetOpen(false);
  };

  return (
    <>
      <div className="relative">
        <Image
          src={test_image}
          alt={"Test Image"}
          className="rounded-20 w-full md:h-[312px] h-[82px]"
        />
        <div
          className="bg-white p-2 border-[1px] rounded-full border-menuborder
        absolute bottom-5 right-5 cursor-pointer hidden md:block"
        >
          <Image
            src={share}
            alt={"공유하기"}
            width={24}
            height={24}
            onClick={handleShare}
          />
        </div>
        <div className="absolute bottom-[-40px] md:bottom-[-60px] left-2 md:left-6 w-[80px] h-[80px] md:w-[130px] md:h-[130px]">
          <Image
            src={baby}
            alt={"Test Image"}
            fill
            className="rounded-full object-cover p-[3px] md:p-[6px] bg-white"
          />
          <div
            className="absolute bottom-1 right-1 cursor-pointer"
            onClick={onHeartClick}
          >
            {isHeart ? (
              <MdFavorite size={20} color="#D1F75D" className="md:w-7 md:h-7" />
            ) : (
              <MdFavorite size={20} color="#E3E3E3" className="md:w-7 md:h-7" />
            )}
          </div>
        </div>
      </div>
      <div className="flex md:flex-row flex-col w-full pt-[47px] justify-between md:gap-10 md:mb-7 md:px-7 md:pt-[98px]">
        <div className="flex px-3 md:-px-0 w-full flex-col gap-2.5">
          <div className="flex gap-0 justify-between md:justify-normal md:gap-2">
            <h1 className="text-text1 text-mobile_h1_contents_title md:text-h1_contents_title">
              유쥬니
            </h1>
            <IconBtn
              type={"declaration"}
              size={"large"}
              title={""}
              onClick={handleReport}
              className="hidden md:block"
            />
            <Image
              src={dotMenu}
              alt={"menu"}
              width={16}
              height={16}
              className="md:hidden"
              onClick={() => setIsBottomSheetOpen(true)}
            />
          </div>
          <p className="text-subtext2 text-mobile_body3_m md:hidden">
            {CATEGORY.map((item) => item.value).join(" | ")}
          </p>
          <p className="text-subtext1 text-mobile_body1_r mt-1 md:mt-0 md:text-body1_r">
            아이들에게 애정이 있는 사람들만-
          </p>
        </div>
        {/* === api 연동 과정에서 따로 분리할 가능성 있음 === */}
        <div className="block mt-4 mb-4 md:hidden">
          <LargeBtn title={"동아리 정보 수정"} onClick={handleModify} />
        </div>
        {/* === === */}
        <div className="md:flex flex-row w-full md:justify-between md:max-w-[642px] hidden">
          {CATEGORY.map((item) => {
            return (
              <div
                className="flex flex-col gap-[14px] items-center"
                key={item.id}
              >
                <p className="text-subtext2 md:text-body2_m">{item.label}</p>
                <h3 className="text-text1 md:text-h3">{item.value}</h3>
              </div>
            );
          })}
        </div>
      </div>
      {isMdUp
        ? isReportOpen && (
            <ReportModal
              onClose={() => setIsReportOpen(false)}
              onSubmit={handleReportSubmit}
            />
          )
        : isReportOpen && (
            <ReportBottomSheet
              onClose={() => setIsReportOpen(false)}
              onSubmit={handleReportSubmit}
            />
          )}
      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
      {isCopy && <Alert text={message} />}
      {/* <RecruitmentGuideFloatingBar deadline={new Date("2024-12-31T23:59:59")} /> */}
      {isBottomSheetOpen && (
        <CommonBottomSheet
          optionData={MENU_DATA}
          selectedOption=""
          handleMenuClick={handleMenuClick}
          onClose={() => setIsBottomSheetOpen(false)}
          alignType="center"
        />
      )}
    </>
  );
};

export default ClubInfoSection;
