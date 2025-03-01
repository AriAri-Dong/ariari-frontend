"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useResponsive from "@/hooks/useResponsive";

import { PageInfo } from "@/types/pageInfo";

import PlusBtn from "@/components/button/withIconBtn/plusBtn";
import WriteBtn from "@/components/button/iconBtn/writeBtn";
import RecruitmentGuideFloatingBar from "@/components/bar/floatingBar/recruitmentGuideFloatingBar";
import { ClubMemberData } from "@/types/member";
import { CLUB_MEMBER_DATA } from "@/data/clubMembers";
import LeftMenu from "../components/menu/leftMenu";
import MobileMenu from "../components/menu/mobileMenu";
import { RECRUITMENT_DATA } from "@/data/recruitment";
import { RecruitmentData } from "@/types/recruitment";

import { pageInfo as dummyPageInfo } from "@/data/qna";
import RecruitmentCard from "@/components/card/recruitmentCard";
import formatDateToDot from "@/utils/formatDateToDot";
import DarkBtn from "@/components/button/withIconBtn/darkBtn";
import NotiPopUp from "@/components/modal/notiPopUp";
import RecruitmentGuidelines from "./components/RecruitmentGuideBox";
import RecruitmentGuideForm from "./components/RecruitmentGuideForm";
import { set } from "react-datepicker/dist/date_utils";

const ClubRecruitmentPage = () => {
  const [recruitmentData, setRecruitmentData] =
    useState<RecruitmentData[]>(RECRUITMENT_DATA);
  const [pageInfo, setPageInfo] = useState<PageInfo>(dummyPageInfo);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [isRecruitingModalOpen, setIsRecruitingModalOpen] =
    useState<boolean>(false);
  const [isRecruitementGuideOpen, setIsRecruitmentGuideOpen] =
    useState<boolean>(false);

  const [clubMember, setClubMember] = useState<ClubMemberData | null>(
    CLUB_MEMBER_DATA[1]
  ); // 멤버타입 (null - 미소속회원)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  const handleLoadMore = () => {
    setCurrentPage((prev) => prev + 1);
    // 데이터 받아오기
    setRecruitmentData((prev) => [...prev, ...recruitmentData]);
  };

  const hasActivatedRecruitment = (recruitmentData: RecruitmentData[]) => {
    return recruitmentData.some(
      (item) => item.recruitmentStatusType === "OPEN"
    );
  };

  const router = useRouter();

  const handleWrite = () => {
    if (hasActivatedRecruitment(recruitmentData)) {
      setIsRecruitingModalOpen(true);
    } else {
      setIsRecruitmentGuideOpen(true);
    }
  };

  // 모집 삭제 핸들러
  const handleDeleteRecruitment = (id: string) => {
    setRecruitmentData((prev) => prev.filter((item) => item.id !== id));
  };
  // 모집 종료 핸들러
  const handleEndRecruitment = (id: string) => {
    setRecruitmentData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, recruitmentStatusType: "CLOSED" } : item
      )
    );
  };

  return (
    <div className="bg-sub_bg flex justify-center items-center w-full pb-20 md:pb-[124px]">
      <div className="w-full max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-lx px-4 mt-6 md:mt-8 md:px-5">
        <MobileMenu />
        <div className="flex lg:gap-9">
          <LeftMenu />
          <div className="w-full mt-5 md:mt-0">
            <div className="flex items-center justify-between mb-[22px]">
              <p className="text-subtext2 text-mobile_body2_m md:text-h4">
                총 20개의 모집공고가 있어요
              </p>
            </div>
            <div className="hidden pl-6 pr-[114px] py-1.5 mb-2.5 justify-between bg-white70 text-subtext2 rounded-[4px] text-body1_m md:flex">
              <div className="flex gap-[40px]">
                <div className="px-1.5">모집상태</div>
                <div>제목</div>
              </div>
              <div>모집 기간</div>
            </div>

            {recruitmentData.map((item, index) => (
              <div key={index} className="mb-2.5">
                <RecruitmentCard
                  id={item.id}
                  title={item.title}
                  onClick={() =>
                    router.push(`/recruitment/detail?id=${item.id}`)
                  }
                  date={`${formatDateToDot(
                    item.startDateTime,
                    false,
                    true
                  )} ~ ${formatDateToDot(item.endDateTime, false, true)} `}
                  status={item.recruitmentStatusType}
                  isManager={
                    clubMember?.clubMemberRoleType == "MANAGER" ||
                    clubMember?.clubMemberRoleType == "ADMIN"
                  }
                  onDelete={handleDeleteRecruitment}
                  onEnd={handleEndRecruitment}
                />
              </div>
            ))}

            {pageInfo.totalPages > currentPage && (
              <div className="flex justify-center mt-9 md:mt-10">
                <PlusBtn title={"더보기"} onClick={handleLoadMore} />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* ====== PC 해상도에서만 보이는  모집공고 보기 ====== */}
      {/* 모집안내 바 : 로그인 x or 동아리 가입 x */}
      {(clubMember == null || !isLoggedIn) && (
        <RecruitmentGuideFloatingBar
          deadline={new Date("2025-03-01T23:59:59")}
          isWriteButtonVisible={false}
          handleWrite={() => {}}
        />
      )}
      {/* ====== 모바일 해상도에서만 보이는 모집공고 보기 ======  */}
      {/* 모집안내 바 : 로그인 x or 동아리 가입 x */}

      {(clubMember == null || !isLoggedIn) && (
        <div className="fixed bottom-5 md:hidden left-50% translate-1/2">
          <DarkBtn title={"모집공고 보기"} onClick={handleWrite} />
        </div>
      )}

      {/* 작성버튼 - 관리자 */}
      {clubMember?.clubMemberRoleType == "MANAGER" ||
        (clubMember?.clubMemberRoleType == "ADMIN" && (
          <div className="fixed w-full bottom-5 px-5 flex justify-end md:bottom-[44px] md:max-w-[1248px] md:px-5">
            <WriteBtn onClick={handleWrite} />
          </div>
        ))}
      {/* 모집중인 공고 O - 관리자 */}
      {isRecruitingModalOpen && (
        <NotiPopUp
          modalType="x-button"
          icon="not"
          title="모집중인 공고가 있어요"
          description={`모집중인 공고가 있을때는\n새로운 모집공고를 작성할 수 없어요.`}
          onClose={() => setIsRecruitingModalOpen(false)}
        />
      )}
      {/* 모집안내 가이드 */}
      {isRecruitementGuideOpen && (
        <RecruitmentGuideForm
          onClose={() => setIsRecruitmentGuideOpen(false)}
          onSubmit={() => router.push("/club/management/recruitment/create")}
        />
      )}
    </div>
  );
};

export default ClubRecruitmentPage;
