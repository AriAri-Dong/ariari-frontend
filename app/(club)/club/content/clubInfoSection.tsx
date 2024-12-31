"use client";

import React, { useState } from "react";
import Image from "next/image";
import test_image from "@/images/test/test_image.jpg";
import share from "@/images/icon/share.svg";
import dotMenu from "@/images/icon/dotMenu.svg";
import { MdFavorite } from "react-icons/md";
import Alert from "@/components/alert/alert";
import IconBtn from "@/components/button/withIconBtn/IconBtn";
import LargeBtn from "@/components/button/basicBtn/largeBtn";
import RecruitmentGuideFloatingBar from "@/components/bar/floatingBar/recruitmentGuideFloatingBar";
import CommonBottomSheet from "@/components/bottomSheet/commonBottomSheet";

const CATEGORY = [
  { id: 0, label: "동아리 소속", type: "affiliation", value: "아리아리" },
  { id: 1, label: "활동 분야", type: "field", value: "프로그래밍" },
  { id: 2, label: "활동 지역", type: "region", value: "서울" },
  { id: 3, label: "활동 대상", type: "target", value: "대학생 및 직장인" },
];

// const MENU_DATA = [
//   { id: 0, label: "공유하기", image: share, url: "/recruitment/detail" },
//   { id: 1, label: "신고하기", image: dotMenu, url: "/club" },
//   { id: 2, label: "동아리 탈퇴하기", image: test_image, url: "/" },
// ];

const MENU_DATA = [
  { id: 0, label: "공유하기" },
  { id: 1, label: "신고하기" },
  { id: 2, label: "동아리 탈퇴하기" },
];

const ClubInfoSection = () => {
  const [isHeart, setIsHeart] = useState<boolean>(false);
  const [isCopy, setIsCopy] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);

  const onHeartClick = () => {
    setIsHeart(!isHeart);
  };

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
            src={test_image}
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
              동아리 이름
            </h1>
            <IconBtn
              type={"declaration"}
              size={"large"}
              title={""}
              onClick={() => {}}
              className="hidden md:block"
            />
            <Image
              src={dotMenu}
              alt={"menu"}
              width={16}
              height={16}
              className="md:hidden"
              onClick={() => setIsBottomSheetOpen(true)} // 바텀시트 열기
            />
          </div>
          <p className="text-subtext2 text-mobile_body3_m md:hidden">
            {CATEGORY.map((item) => item.value).join(" | ")}
          </p>
          <p className="text-subtext1 text-mobile_body1_r mt-1 md:mt-0 md:text-body1_r">
            동아리 소개 소개소개소래소개소래소개입니다ㅏ아아아ㅏ
          </p>
        </div>
        <div className="block mt-4 md:hidden">
          <LargeBtn title={"동아리 정보 수정"} onClick={() => {}} />
        </div>
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
      {isCopy && <Alert text={message} />}
      <RecruitmentGuideFloatingBar deadline={new Date("2024-12-31T23:59:59")} />
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
