"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import defaultImg from "@/images/icon/defaultAriari.svg";
import defaultImgBg from "@/images/defaultAriariBg.svg";
import share from "@/images/icon/share.svg";
import dotMenu from "@/images/icon/dotMenu.svg";
import { MdFavorite } from "react-icons/md";
import Alert from "@/components/alert/alert";
import IconBtn from "@/components/button/withIconBtn/IconBtn";
import LargeBtn from "@/components/button/basicBtn/largeBtn";
import CommonBottomSheet from "@/components/bottomSheet/commonBottomSheet";
import { MENU_DATA } from "@/data/club";
import useResponsive from "@/hooks/useResponsive";
import ReportModal from "@/components/modal/reportModal";
import ReportBottomSheet from "@/components/bottomSheet/report/reportBottomSheet";
import { useClubContext } from "@/context/ClubContext";
import {
  CLUB_FIELD,
  CLUB_PARTICIPANT,
  CLUB_REGION,
} from "@/constants/clubInfo";
import ModifyClubInfoBottomSheet from "@/components/bottomSheet/modifyClubInfoBottomSheet";
import { useToggleClubBookmark } from "@/hooks/club/useToggleClubBookmark";

/**
 * Club 페이지에서 사용되는 clubInfo 공통 section
 * @returns
 */
const ClubInfoSection = () => {
  const isMdUp = useResponsive("md");

  const [isCopy, setIsCopy] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [isModifyBottomSheetOpen, setIsModifyBottomSheetOpen] =
    useState<boolean>(false);
  const { toggleClubBookmark } = useToggleClubBookmark();

  const { clubInfo, role } = useClubContext();
  const isClubMember = clubInfo?.clubMemberData;

  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  useEffect(() => {
    if (clubInfo) {
      setIsBookmarked(clubInfo.clubData.isMyBookmark);
    }
  }, [clubInfo]);

  if (!clubInfo) return null;

  // prettier-ignore
  const { clubData: { id, name, body, profileUri, bannerUri, clubCategoryType, clubRegionType, participantType, schoolData}} = clubInfo;

  const handleModifyClubInfo = () => {
    setIsModifyBottomSheetOpen(true);
  };

  const handleReport = () => {
    setIsReportOpen(true);
  };

  const handleReportSubmit = () => {
    setIsReportOpen(false);
    setAlertMessage("신고가 정상적으로 접수되었습니다.");
  };

  // 동아리 북마크
  const handleClickBookmark = async () => {
    await toggleClubBookmark({ clubId: id, isBookmarked });
    setIsBookmarked((prev) => !prev);
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

  // prettier-ignore
  const CLUB_CATEGORY = [
    { id: 0, label: "동아리 소속", type: "affiliation", value: schoolData == null ? '연합' : '교내'},
    { id: 1, label: "활동 분야", type: "field", value: CLUB_FIELD[clubCategoryType] },
    { id: 2, label: "활동 지역", type: "region", value: CLUB_REGION[clubRegionType]},
    { id: 3, label: "활동 대상", type: "target", value: CLUB_PARTICIPANT[participantType]},
  ];

  const handleSubmitSuccess = () => {
    setAlertMessage("동아리 정보가 수정되었습니다.");

    // 알럿 메시지 표시 후 3초 뒤 페이지 새로고침
    setTimeout(() => {
      window.location.reload();
      // 2초 후 새로고침
    }, 2000);
  };

  return (
    <>
      <div className="relative">
        {/* <Image
          src={bannerUri || defaultImgBg}
          alt={"Test Image"}
          className="rounded-20 w-full h-full object-cover"
        /> */}
        <div className="relative w-full h-[200px] md:h-[312px]">
          <Image
            src={bannerUri || defaultImgBg}
            alt="Test Image"
            fill
            className="rounded-20 object-cover"
          />
        </div>
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
            src={profileUri || defaultImg}
            alt={"프로필 이미지"}
            fill
            className="rounded-full object-cover p-[3px] md:p-[6px] bg-white"
          />
          <div className="absolute bottom-1 right-1 cursor-pointer">
            <button onClick={handleClickBookmark}>
              {isBookmarked ? (
                <MdFavorite
                  size={20}
                  color="#D1F75D"
                  className="md:w-7 md:h-7"
                />
              ) : (
                <MdFavorite
                  size={20}
                  color="#E3E3E3"
                  className="md:w-7 md:h-7"
                />
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="flex md:flex-row flex-col w-full pt-[47px] justify-between md:gap-10 md:mb-7 md:px-7 md:pt-[98px]">
        <div className="flex px-3 md:-px-0 w-full flex-col gap-2.5">
          <div className="flex gap-0 justify-between md:justify-normal md:gap-2">
            <h1 className="text-text1 text-mobile_h1_contents_title md:text-h1_contents_title">
              {name}
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
            {CLUB_CATEGORY.map((item) => item.value).join(" | ")}
          </p>
          <p className="text-subtext1 text-mobile_body1_r mt-1 md:mt-0 md:text-body1_r">
            {body}
          </p>
        </div>
        {/* === api 연동 과정에서 따로 분리할 가능성 있음 === */}
        {(role === "ADMIN" || role === "MANAGER") && (
          <div className="block mt-4 mb-4 md:hidden">
            <LargeBtn
              title={"동아리 정보 수정"}
              onClick={handleModifyClubInfo}
            />
          </div>
        )}

        {/* === === */}
        <div className="md:flex flex-row w-full md:justify-between md:max-w-[642px] hidden">
          {CLUB_CATEGORY.map((item) => {
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
              id={clubInfo.clubData.id}
              reportTargetType="CLUB"
              onClose={() => setIsReportOpen(false)}
              onSubmit={handleReportSubmit}
            />
          )
        : isReportOpen && (
            <ReportBottomSheet
              id={clubInfo.clubData.id}
              reportTargetType="CLUB"
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
          optionData={
            isClubMember ? MENU_DATA : MENU_DATA.filter((item) => item.id !== 2)
          }
          selectedOption=""
          handleMenuClick={handleMenuClick}
          onClose={() => setIsBottomSheetOpen(false)}
          alignType="center"
        />
      )}
      {isModifyBottomSheetOpen && (
        <ModifyClubInfoBottomSheet
          onClose={() => {
            setIsModifyBottomSheetOpen(false);
          }}
          onSubmit={handleSubmitSuccess}
        />
      )}
    </>
  );
};

export default ClubInfoSection;
