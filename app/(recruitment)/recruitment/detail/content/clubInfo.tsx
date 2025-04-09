"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
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
import { ClubInfoCard } from "@/types/components/card";
import {
  fieldMap,
  participantMap,
  regionMap,
} from "@/utils/clubCategoryMapping";
import { deleteClubBookmark, postClubBookmark } from "@/api/club/api";
import { useShallow } from "zustand/shallow";
import { useUserStore } from "@/providers/userStoreProvider";

interface ClubInfoProps {
  recruitmentId?: string;
  recruitmentData: ClubInfoCard;

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
  const params = useSearchParams();
  const isSignIn = useUserStore(useShallow((state) => state.isSignIn));
  const id = params.get("id") ?? "";

  const [isClubHeart, setIsClubHeart] = useState<boolean>(
    recruitmentData.isMyClubBookmark
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
      deleteClubBookmark(recruitmentData.clubId)
        .then(() => {
          setIsClubHeart(!isClubHeart);
        })
        .catch((err) => {
          setAlertMessage(err.message);
        });
    } else {
      postClubBookmark(recruitmentData.clubId)
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

  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex flex-col mt-2 sm_md:flex-row sm_md:gap-[27px] md:pb-10 md:pt-8 md:flex-row md:gap-14 w-full max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-lx px-4 md:px-5">
        <div className="w-full max-w-[792px]">
          <Image
            src={recruitmentData.imageUrl || test_image}
            alt={"main_image"}
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
              {recruitmentData.title}
            </p>
            <IconBtn
              type={"declaration"}
              size={"large"}
              title={""}
              onClick={toggleBottomSheet}
            />
          </div>
          <div className="border-t border-menuborder sm_md:w-[350px] mt-6 mb-6 md:hidden" />
          <div className="flex flex-col md:pt-[6px]">
            <div className="block md:hidden">
              <div className="flex flex-col">
                <div className="flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <Image
                      src={recruitmentData.clubImageUrl || test_image}
                      alt={"club_image"}
                      width={68}
                      height={68}
                      className="relative w-[68px] h-[68px] rounded-full overflow-hidden"
                    />
                    <ClubProfileCard
                      clubName={recruitmentData.clubName}
                      affiliation={recruitmentData.tag.affiliation}
                      field={fieldMap[recruitmentData.tag.field]}
                      region={regionMap[recruitmentData.tag.region]}
                      target={participantMap[recruitmentData.tag.target]}
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
                  startDate={recruitmentData.startDate}
                  endDate={recruitmentData.endDate}
                  procedureType={recruitmentData.procedureType}
                />
              </div>
            </div>
            {/* PC 화면 */}
            <div className="hidden md:block">
              <div className="flex items-center md:gap-5">
                <div className="relative w-[60px] h-[60px]">
                  <Image
                    src={recruitmentData.clubImageUrl || test_image}
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
                <h3 className="text-subtext1 text-h3">
                  {recruitmentData.clubName}
                </h3>
              </div>
              <h1 className="text-h1_contents_title md:mt-8 md:mb-12">
                {recruitmentData.title}
              </h1>
              <div className="w-[340px] mt-10">
                <Keyword
                  tags={[
                    recruitmentData.tag.affiliation,
                    fieldMap[recruitmentData.tag.field],
                    regionMap[recruitmentData.tag.region],
                    participantMap[recruitmentData.tag.target],
                  ]}
                />
              </div>
              <div className="border-t border-menuborder mt-8 mb-7" />
              <RecruitmentSummary
                members={recruitmentData.limits}
                startDate={recruitmentData.startDate}
                endDate={recruitmentData.endDate}
                procedureType={recruitmentData.procedureType}
              />
            </div>
            {!isPreview && (
              <div className="fixed bottom-0 left-0 right-0 md:static mt-10">
                <div className="bg-background px-4 pt-2 pb-6 md:px-0 md:pt-0 md:pb-0">
                  <RecruitmentBottomBar
                    isMyBookmark={recruitmentData.isMyRecruitmentScrap}
                    bookmarks={recruitmentData.recruitmentBookmarks}
                    endDate={recruitmentData.endDate}
                    isMyApply={recruitmentData.isMyApply}
                  />
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
