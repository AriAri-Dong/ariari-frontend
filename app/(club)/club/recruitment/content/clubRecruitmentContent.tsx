"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useClubContext } from "@/context/ClubContext";
import { useShallow } from "zustand/shallow";

import WriteBtn from "@/components/button/iconBtn/writeBtn";
import RecruitmentGuideFloatingBar from "@/components/bar/floatingBar/recruitmentGuideFloatingBar";
import RecruitmentCard from "@/components/card/recruitmentCard";
import DarkBtn from "@/components/button/withIconBtn/darkBtn";
import NotiPopUp from "@/components/modal/notiPopUp";
import MobileMenu from "../../components/menu/mobileMenu";
import LeftMenu from "../../components/menu/leftMenu";
import RecruitmentGuideForm from "../components/RecruitmentGuideForm";
import Alert from "@/components/alert/alert";

import { RecruitmentData } from "@/types/recruitment";

import { useUserStore } from "@/providers/userStoreProvider";
import { formatKSTTime } from "@/utils/formatKSTTime";
import { useClubRecruitmentQuery } from "@/hooks/club/recruitment/useClubRecruitmentQuery";

const ClubRecruitmentContent = () => {
  const params = useSearchParams();
  const clubId = params.get("clubId") || "";
  const router = useRouter();
  const { role } = useClubContext();
  const isSignIn = useUserStore(useShallow((state) => state.isSignIn));

  const {
    data: recruitmentData,
    isLoading,
    isError,
  } = useClubRecruitmentQuery(clubId);

  const [isRecruitingModalOpen, setIsRecruitingModalOpen] =
    useState<boolean>(false);
  const [isRecruitementGuideOpen, setIsRecruitmentGuideOpen] =
    useState<boolean>(false);

  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const hasActivatedRecruitment = (recruitmentData: RecruitmentData[]) => {
    return recruitmentData.some(
      (item) => item.recruitmentStatusType === "OPEN"
    );
  };

  const handleWrite = () => {
    if (recruitmentData && hasActivatedRecruitment(recruitmentData)) {
      setIsRecruitingModalOpen(true);
    } else {
      setIsRecruitmentGuideOpen(true);
    }
  };

  return (
    <div className="bg-sub_bg flex justify-center items-center w-full pb-20 md:pb-[124px]">
      <div className="w-full max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-lx px-4 mt-6 md:mt-8 md:px-5">
        <MobileMenu />
        <div className="flex lg:gap-9">
          <LeftMenu />
          <div className="w-full">
            <div className="flex items-center justify-between mb-[22px]">
              <p className="text-subtext2 text-mobile_body2_m md:text-h4">
                총 {recruitmentData?.length}개의 모집공고가 있어요
              </p>
            </div>
            <div className="hidden pl-6 pr-[114px] py-1.5 mb-2.5 justify-between bg-white70 text-subtext2 rounded-[4px] text-body1_m md:flex">
              <div className="flex gap-[40px]">
                <div className="px-1.5">모집상태</div>
                <div>제목</div>
              </div>
              <div>모집 기간</div>
            </div>

            {recruitmentData &&
              recruitmentData?.map((item, index) => (
                <div key={index} className="mb-2.5">
                  <RecruitmentCard
                    id={item.id}
                    clubId={clubId}
                    title={item.title}
                    onClick={() =>
                      router.push(`/recruitment/detail?id=${item.id}`)
                    }
                    date={`${formatKSTTime(
                      item.startDateTime,
                      "YYYY.MM.DD"
                    )} ~ ${formatKSTTime(item.endDateTime, "YYYY.MM.DD")}`}
                    status={item.recruitmentStatusType}
                    isManager={role === "MANAGER" || role === "ADMIN"}
                    setAlertMessage={setAlertMessage}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* PC 모집안내 바 :  동아리 가입 x */}
      {role == null && isSignIn && (
        <RecruitmentGuideFloatingBar
          isWriteButtonVisible={false}
          handleWrite={() => {}}
        />
      )}
      {/* 모바일 모집안내 바 : 동아리 가입 x */}

      {role == null && isSignIn && (
        <div className="fixed bottom-5 md:hidden left-50% translate-1/2">
          <DarkBtn title={"모집공고 보기"} onClick={handleWrite} />
        </div>
      )}

      {/* 작성버튼 - 관리자 */}
      {(role == "MANAGER" || role == "ADMIN") && (
        <div className="fixed w-full bottom-5 px-5 flex justify-end md:bottom-[44px] md:max-w-[1248px] md:px-5">
          <WriteBtn onClick={handleWrite} />
        </div>
      )}
      {/* 작성 불가 모달 - 모집중인 공고 O */}
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
          onSubmit={() =>
            router.push(`/club/management/recruitment/create?clubId=${clubId}`)
          }
        />
      )}

      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </div>
  );
};

export default ClubRecruitmentContent;
