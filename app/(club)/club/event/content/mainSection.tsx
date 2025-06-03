"use client";

import React, { useState } from "react";
import { useClubContext } from "@/context/ClubContext";
import { useUserStore } from "@/providers/userStoreProvider";
import { useShallow } from "zustand/shallow";

import useResponsive from "@/hooks/useResponsive";

import WriteBtn from "@/components/button/iconBtn/writeBtn";
import DarkBtn from "@/components/button/withIconBtn/darkBtn";
import Alert from "@/components/alert/alert";
import ClubEventModal from "@/components/modal/club/clubEventModal";
import ClubEventBottomSheet from "@/components/bottomSheet/clubEventBottomSheet";

import RecruitmentGuideFloatingBar from "@/components/bar/floatingBar/recruitmentGuideFloatingBar";
import { useAutoSubmitAttendance } from "@/hooks/club/evnet/useAutoSubmitAttendance";
import ListSection from "./listSection";
import MobileMenu from "../../components/menu/mobileMenu";

const MainSection = () => {
  const isSignIn = useUserStore(useShallow((state) => state.isSignIn));
  const isMdUp = useResponsive("md");
  const { role } = useClubContext();

  const [isEventModalOpen, setEventModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const handleRouter = () => {};

  useAutoSubmitAttendance({
    onSuccess: () => setAlertMessage("출석이 완료되었습니다."),
    onError: () => setAlertMessage("출석에 실패했습니다."),
  });

  return (
    <div className="bg-sub_bg flex justify-center items-center w-full pb-20 md:pb-[124px]">
      <div className="w-full max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-lx px-4 mt-6 md:mt-8 md:px-5">
        <MobileMenu />

        <ListSection setEventModalOpen={setEventModalOpen} />
      </div>
      {/* 일정 작성 모달 */}
      {(role === "ADMIN" || role === "MANAGER") &&
        isEventModalOpen &&
        (isMdUp ? (
          <ClubEventModal
            onClose={() => {
              setEventModalOpen(false);
            }}
            onSubmit={() => setAlertMessage("일정이 등록되었습니다.")}
            type="create"
          />
        ) : (
          <ClubEventBottomSheet
            onClose={() => {
              setEventModalOpen(false);
            }}
            onSubmit={() => setAlertMessage("일정이 등록되었습니다.")}
            type="create"
          />
        ))}

      {/* ====== PC 해상도에서만 보이는 하단 버튼 ======  */}
      {/* 모집안내 바 : 로그인 x or 동아리 가입 x */}
      {(role == null || !isSignIn) && (
        <RecruitmentGuideFloatingBar
          isWriteButtonVisible={false}
          handleWrite={() => {}}
        />
      )}

      {/* ====== 모바일 해상도에서만 보이는 하단 버튼 ======  */}
      {(role == null || !isSignIn) && (
        <div className={`fixed bottom-5 left-50% translate-1/2 md:hidden`}>
          <DarkBtn title={"모집공고 보기"} onClick={handleRouter} />
        </div>
      )}

      {/* ====== 작성버튼 - 관리자, 매니저 ======*/}
      {(role === "ADMIN" || role === "MANAGER") && (
        <div className="fixed w-full bottom-5 px-5 flex justify-end md:bottom-[44px] md:max-w-[1248px] md:px-5">
          <WriteBtn
            onClick={() => {
              setEventModalOpen(true);
            }}
          />
        </div>
      )}

      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </div>
  );
};

export default MainSection;
