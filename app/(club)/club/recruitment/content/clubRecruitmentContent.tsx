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

import formatDateToDot from "@/utils/formatDateToDot";

import { RecruitmentData } from "@/types/recruitment";

import {
  deleteRecruitment,
  endRecruitment,
  getClubRecruitment,
} from "@/api/recruitment/api";
import { useUserStore } from "@/providers/userStoreProvider";

const ClubRecruitmentContent = () => {
  const params = useSearchParams();
  const clubId = params.get("clubId");
  const router = useRouter();
  const { role } = useClubContext();
  const isSignIn = useUserStore(useShallow((state) => state.isSignIn));

  const [recruitmentData, setRecruitmentData] = useState<
    RecruitmentData[] | null
  >(null);
  const [selectedRecruitment, setSelectedRecruitment] = useState<string | null>(
    null
  );

  const [isRecruitingModalOpen, setIsRecruitingModalOpen] =
    useState<boolean>(false);
  const [isRecruitementGuideOpen, setIsRecruitmentGuideOpen] =
    useState<boolean>(false);
  const [isRecruitmentCloseModalOpen, setIsRecruitmentCloseModalOpen] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
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

  // 모집 삭제 핸들러
  const handleDeleteRecruitment = async (id: string) => {
    try {
      await deleteRecruitment(id);
      setRecruitmentData((prev) =>
        prev ? prev.filter((item) => item.id !== id) : []
      );
      setAlertMessage("삭제되었습니다.");
    } catch (error) {
      console.error("모집 삭제 실패:", error);
      setAlertMessage("문제가 발생했습니다.");
    }
  };
  // 모집 종료 핸들러
  const handleEndRecruitment = async (id: string) => {
    try {
      await endRecruitment(id);
      setRecruitmentData((prev) =>
        prev
          ? prev.map((item) =>
              item.id === id
                ? { ...item, recruitmentStatusType: "CLOSED" }
                : item
            )
          : []
      );
    } catch (error) {
      console.error("모집 마감 실패:", error);
      setAlertMessage("문제가 발생했습니다.");
    }
  };

  useEffect(() => {
    if (clubId) {
      // 동아리 모집 정보
      const fetchClubRecruitment = async () => {
        try {
          setLoading(true);
          const data = await getClubRecruitment(clubId);
          setRecruitmentData(data!.recruitmentDataList);
        } finally {
          setLoading(false);
        }
      };

      fetchClubRecruitment();
    }
  }, [clubId]);
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

            {loading ? (
              <div className="text-center p-10 text-subtext1">로딩중...</div>
            ) : (
              recruitmentData?.map((item, index) => (
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
                    )} ~ ${formatDateToDot(item.endDateTime, false, true)}`}
                    status={item.recruitmentStatusType}
                    isManager={role === "MANAGER" || role === "ADMIN"}
                    onDelete={handleDeleteRecruitment}
                    onEnd={() => {
                      setIsRecruitmentCloseModalOpen(true);
                      setSelectedRecruitment(item.id);
                    }}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      {/* PC 모집안내 바 :  동아리 가입 x */}
      {role == null && isSignIn && (
        <RecruitmentGuideFloatingBar
          deadline={new Date("2025-03-01T23:59:59")}
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
          onSubmit={() => router.push("/club/management/recruitment/create")}
        />
      )}

      {/* 모집공고 종료 확인 모달 */}
      {isRecruitmentCloseModalOpen && (
        <NotiPopUp
          onClose={() => {
            setIsRecruitmentCloseModalOpen(false);
          }}
          icon={"check"}
          title={"모집을 종료할까요?"}
          description={
            "동아리 모집공고 게시물을 내리고,<br/>지원서 접수를 마감할까요?"
          }
          modalType={"button"}
          firstButton={() => {
            handleEndRecruitment(selectedRecruitment || "");
            setIsRecruitmentCloseModalOpen(false);
          }}
          firstButtonText={"모집 종료하기"}
          secondButton={() => {
            setIsRecruitmentCloseModalOpen(false);
          }}
          secondButtonText={"취소하기"}
        />
      )}

      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </div>
  );
};

export default ClubRecruitmentContent;
