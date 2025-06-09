"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import test_image from "@/images/test/test_image.jpg";
import Keyword from "@/components/button/keyword";
import { MdFavorite } from "react-icons/md";
import RecruitmentBottomBar from "@/components/bar/floatingBar/recruitmentBottomBar";
import IconBtn from "@/components/button/withIconBtn/IconBtn";
import RecruitmentSummary from "../components/recruitmentSummary";
import ClubProfileCard from "@/components/card/clubProfileCard";
import ReportBottomSheet from "@/components/bottomSheet/report/reportBottomSheet";
import Alert from "@/components/alert/alert";
import ReportModal from "@/components/modal/reportModal";
import Tooltip from "@/components/tooltip";
import {
  fieldMap,
  participantMap,
  regionMap,
} from "@/utils/clubCategoryMapping";
import { deleteClubBookmark, postClubBookmark } from "@/api/club/api";
import useResponsive from "@/hooks/useResponsive";
import { ClubData } from "@/types/club";
import { RecruitmentData } from "@/types/recruitment";
import { ApplyFormData } from "@/types/application";
import { useUserStore } from "@/stores/userStore";

interface ClubInfoProps {
  recruitmentData: RecruitmentData;
  clubData: ClubData;
  applyFormData: ApplyFormData | null;
  isMyApply: boolean;
  isMyClub: boolean;
  bookmarks: number;
  myRecentApplyTempId?: string | null;
  type?: "PREVIEW" | "APPLYING" | "GENERAL";
}

/**
 * @param type 미리보기 | 지원중 | 모집공고(일반)
 */

const ClubInfo = ({
  recruitmentData,
  clubData,
  applyFormData,
  isMyApply,
  isMyClub,
  bookmarks,
  myRecentApplyTempId = null,
  type = "GENERAL",
}: ClubInfoProps) => {
  const isMdUp = useResponsive("md");
  const params = useSearchParams();
  const { user } = useUserStore();
  const isSignIn = !!user;

  const id = params.get("id") ?? "";
  const router = useRouter();

  const [isClubHeart, setIsClubHeart] = useState<boolean>(
    clubData.isMyBookmark
  );
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
  const [isBottomModalOpen, setIsBottomModalOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const onClubHeartClick = () => {
    if (!isSignIn) {
      setAlertMessage("로그인 후 이용 가능합니다.");
      return;
    }
    if (isClubHeart) {
      deleteClubBookmark(clubData.id)
        .then(() => {
          setIsClubHeart(!isClubHeart);
        })
        .catch((err) => {
          setAlertMessage(err.message);
        });
    } else {
      postClubBookmark(clubData.id)
        .then(() => {
          setIsClubHeart(!isClubHeart);
        })
        .catch((err) => {
          setAlertMessage(err.message);
        });
    }
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

  const handleClubClick = () => {
    router.push(`/club/activityHistory?clubId=${clubData.id}`);
  };
  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex flex-col mt-2 sm_md:flex-row sm_md:gap-[27px] md:pb-10 md:pt-8 md:flex-row md:gap-14 w-full max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-lx px-4 md:px-5">
        <div className="w-full max-w-[792px]">
          <Image
            src={recruitmentData.posterUri || test_image}
            alt={"main_image"}
            width={792}
            height={792}
            className="rounded-48 object-cover aspect-[1/1]"
          />
        </div>
        {/* 모바일 화면 */}
        <div>
          <div className="flex justify-between items-start mt-[18px] md:hidden">
            <p className="text-mobile_h1_contents_title text-text1">
              {recruitmentData.title}
            </p>
            {type !== "APPLYING" && (
              <IconBtn
                type={"declaration"}
                size={"large"}
                title={""}
                onClick={type === "PREVIEW" ? () => {} : toggleBottomSheet}
              />
            )}
          </div>
          <div className="border-t border-menuborder sm_md:w-[350px] mt-6 mb-6 md:hidden" />
          <div className="flex flex-col md:pt-[6px]">
            <div className="block md:hidden">
              <div className="flex flex-col">
                <div className="flex justify-between items-center">
                  <div
                    className="flex gap-3 items-center"
                    onClick={handleClubClick}
                  >
                    <Image
                      src={clubData.profileUri || test_image}
                      alt={"club_image"}
                      width={68}
                      height={68}
                      className="relative w-[68px] h-[68px] rounded-full overflow-hidden"
                    />
                    <ClubProfileCard
                      clubName={clubData.name}
                      affiliation={
                        clubData.schoolData ? clubData.schoolData.name : "교외"
                      }
                      field={fieldMap[clubData.clubCategoryType]}
                      region={regionMap[clubData.clubRegionType]}
                      target={participantMap[clubData.participantType]}
                    />
                  </div>
                  <div className="cursor-pointer" onClick={onClubHeartClick}>
                    {isClubHeart ? (
                      <MdFavorite size={24} color="#D1F75D" />
                    ) : (
                      <MdFavorite size={24} color="#E3E3E3" />
                    )}
                  </div>
                </div>
                <div className="border-t border-menuborder mt-6 mb-6" />
                <RecruitmentSummary
                  members={recruitmentData.limits}
                  startDate={recruitmentData.startDateTime}
                  endDate={recruitmentData.endDateTime}
                  procedureType={recruitmentData.procedureType}
                />
              </div>
            </div>
            {/* PC 화면 */}
            <div className="hidden md:block">
              <div className="flex items-center md:gap-5">
                <div className="relative w-[60px] h-[60px]">
                  <Image
                    src={clubData.profileUri || test_image}
                    alt={"club_image"}
                    width={60}
                    height={60}
                    className="relative w-[60px] h-[60px] rounded-full overflow-hidden"
                  />
                  <div
                    className="absolute bottom-0 right-0 cursor-pointer"
                    onClick={onClubHeartClick}
                  >
                    {isClubHeart ? (
                      <MdFavorite size={20} color="#D1F75D" />
                    ) : (
                      <MdFavorite size={20} color="#E3E3E3" />
                    )}
                  </div>
                </div>
                <Tooltip message="상세페이지로 이동하기">
                  <h3
                    className="text-subtext1 text-h3 cursor-pointer p-1"
                    onClick={handleClubClick}
                  >
                    {clubData.name}
                  </h3>
                </Tooltip>
              </div>
              <h1 className="text-h1_contents_title md:mt-8 md:mb-12">
                {recruitmentData.title}
              </h1>
              <div className="w-[340px] mt-10">
                <Keyword
                  tags={[
                    clubData.schoolData ? clubData.schoolData.name : "교외",
                    fieldMap[clubData.clubCategoryType],
                    regionMap[clubData.clubRegionType],
                    participantMap[clubData.participantType],
                  ]}
                />
              </div>
              <div className="border-t border-menuborder mt-8 mb-7" />
              <RecruitmentSummary
                members={recruitmentData.limits}
                startDate={recruitmentData.startDateTime}
                endDate={recruitmentData.endDateTime}
                procedureType={recruitmentData.procedureType}
              />
            </div>

            {(type === "GENERAL" ||
              (type === "PREVIEW" && isMdUp) ||
              type !== "APPLYING") && (
              <div className="fixed bottom-0 left-0 right-0 md:static mt-10">
                <div className="bg-background px-4 pt-2 pb-6 md:px-0 md:pt-0 md:pb-0">
                  <RecruitmentBottomBar
                    recruitmentData={recruitmentData}
                    bookmarks={bookmarks}
                    isMyApply={isMyApply}
                    isMyClub={isMyClub}
                    type={type}
                    myRecentApplyTempId={myRecentApplyTempId}
                  />
                </div>
              </div>
            )}
            <div className="h-5" />
            {type !== "APPLYING" && (
              <div className="hidden md:flex">
                <IconBtn
                  type={"declaration"}
                  size={"large"}
                  title={"신고하기"}
                  onClick={type === "GENERAL" ? toggleBottomModal : () => {}}
                />
              </div>
            )}
          </div>
        </div>

        {isBottomSheetOpen && (
          <ReportBottomSheet
            id={id}
            reportTargetType="RECRUITMENT"
            onClose={() => setIsBottomSheetOpen(false)}
            onSubmit={handleReportSubmit}
          />
        )}
        {isBottomModalOpen && (
          <ReportModal
            id={id}
            reportTargetType="RECRUITMENT"
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
