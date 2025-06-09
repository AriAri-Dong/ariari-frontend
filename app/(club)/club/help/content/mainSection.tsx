"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useResponsive from "@/hooks/useResponsive";
import { useClubContext } from "@/context/ClubContext";
import { QUESTION_TYPE } from "@/data/pulldown";

import SubTap from "@/components/tab/subTap";
import WriteBtn from "@/components/button/iconBtn/writeBtn";
import DarkBtn from "@/components/button/withIconBtn/darkBtn";
import RecruitmentGuideFloatingBar from "@/components/bar/floatingBar/recruitmentGuideFloatingBar";
import HelpText from "@/components/button/helpText/helpText";

import helpTextQnaMobile from "@/images/icon/helptextQnaMobile.svg";
import helpTextQnaPc from "@/images/icon/helptextQnaPc.svg";
import helpTextFaqPc from "@/images/icon/helptextFaqPc.svg";
import helpTextFaqMobile from "@/images/icon/helptextFaqMobile.svg";

import Alert from "@/components/alert/alert";
import NotiPopUp from "@/components/modal/notiPopUp";
import LoginModal from "@/components/modal/login/loginModal";
import MobileLoginModal from "@/components/modal/login/mobileLoginModal";
import FaqSection from "./faqSection";
import QnaSection from "./qnaSection";
import MobileMenu from "../../components/menu/mobileMenu";
import LeftMenu from "../../components/menu/leftMenu";
import QnaForm from "../components/qnaForm";
import FaqForm from "../components/faqForm";
import { useUserStore } from "@/stores/userStore";

const MainSection = () => {
  const [type, setType] = useState<string>(QUESTION_TYPE[0].label);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isQnaFormOpen, setIsQnaFormOpen] = useState<boolean>(false);
  const [isFaqFormOpen, setIsFaqFormOpen] = useState<boolean>(false);

  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [isNotiPopUpOpen, setIsNotiPopUpOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const { role } = useClubContext();
  const { user } = useUserStore();
  const isSignIn = !!user;

  const isTapOver = useResponsive("md");

  const router = useRouter();

  const handleRouter = () => {
    // 모집 공고 임시 경로
    router.push("/");
  };
  const handleOpenForm = () => {
    if (!isSignIn) {
      setIsNotiPopUpOpen(true);
      return;
    } else {
      type == "FAQ" ? setIsFaqFormOpen(true) : setIsQnaFormOpen(true);
    }
  };

  const handleTotalCount = (cnt: number) => {
    setTotalCount(cnt);
  };

  return (
    <div className="bg-sub_bg flex justify-center items-center w-full pb-20 md:pb-[124px]">
      <div className="w-full max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-lx px-4 mt-6 md:mt-8 md:px-5">
        <MobileMenu />
        <div className="flex lg:gap-9">
          <LeftMenu />
          <div className="w-full">
            <div className="flex items-center justify-between mb-[22px]">
              <p className="text-subtext2">
                총 {totalCount}
                개의 {type}가 있어요
              </p>
              <SubTap
                optionData={QUESTION_TYPE}
                selectedOption={type}
                handleOption={setType}
              />
            </div>
            <div className="hidden pl-6 pr-[114px] py-1.5 mb-2.5 justify-between bg-white70 text-subtext2 rounded-[4px] text-body1_m md:flex">
              <div className="flex gap-[42px]">
                <div className="px-[19px]">분류</div>
                <div>제목</div>
              </div>
              <div className={type == "FAQ" ? "hidden" : ""}>작성일</div>
            </div>
            {type === "FAQ" ? (
              <FaqSection onListCount={handleTotalCount} />
            ) : (
              <QnaSection onListCount={handleTotalCount} />
            )}
          </div>
        </div>
      </div>

      {/* ====== PC 해상도에서만 보이는 하단 버튼 ======  */}
      {/* 모집안내 바 : 로그인 x or 동아리 가입 x */}
      {(role == null || !isSignIn) && (
        <RecruitmentGuideFloatingBar
          isWriteButtonVisible={type == "Q&A"}
          handleWrite={handleOpenForm}
        />
      )}

      {/* ====== 모바일 해상도에서만 보이는 하단 버튼 ======  */}
      {(role == null || !isSignIn) && (
        <div
          className={`fixed bottom-5 md:hidden  ${
            type == "FAQ" ? "left-50% translate-1/2" : "left-4 "
          }`}
        >
          <DarkBtn title={"모집공고 보기"} onClick={handleRouter} />
        </div>
      )}

      {/* ====== 공통 작성버튼 : FAQ - 관리자, 매니저, QNA - 일반회원 ======*/}
      {((type == "Q&A" && (role == "GENERAL" || role == null || !isSignIn)) ||
        (type == "FAQ" && (role == "ADMIN" || role == "MANAGER"))) && (
        <div className="fixed w-full bottom-5 px-5 flex justify-end md:bottom-[44px] md:max-w-[1248px] md:px-5">
          <WriteBtn onClick={handleOpenForm} />
        </div>
      )}
      {/* ====== form 모달/바텀시트 ====== */}
      {isQnaFormOpen && (
        <QnaForm
          onClose={() => setIsQnaFormOpen(false)}
          onSubmit={() => {
            setAlertMessage("정상 등록되었습니다");
          }}
        />
      )}
      {isFaqFormOpen && (
        <FaqForm
          onClose={() => setIsFaqFormOpen(false)}
          onSubmit={() => {
            setAlertMessage("정상 등록되었습니다");
          }}
        />
      )}
      {/* ====== 알림 ======*/}
      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
      {isNotiPopUpOpen && (
        <NotiPopUp
          onClose={() => setIsNotiPopUpOpen(false)}
          icon={"login"}
          title="로그인 후 이용 부탁드립니다"
          description={`Q&A를 등록하기 위해서는\n아리아리 서비스 로그인이 필요합니다.`}
          modalType={"button"}
          firstButton={() => {
            setIsNotiPopUpOpen(false);
            setIsLoginModalOpen(true);
          }}
          firstButtonText="로그인 후 이용하기"
          secondButton={() => setIsNotiPopUpOpen(false)}
          secondButtonText="다음에 할게요"
        />
      )}
      <HelpText
        imageVisible={
          (type == "FAQ" && (role == "ADMIN" || role == "MANAGER")) ||
          (type == "Q&A" && (role == "GENERAL" || role == null || !isSignIn))
        }
        image={
          type == "FAQ"
            ? isTapOver
              ? helpTextFaqPc
              : helpTextFaqMobile
            : isTapOver
            ? helpTextQnaPc
            : helpTextQnaMobile
        }
      />
      {isLoginModalOpen && (
        <>
          <LoginModal onClose={() => setIsLoginModalOpen(false)} />
          <MobileLoginModal onClose={() => setIsLoginModalOpen(false)} />
        </>
      )}
    </div>
  );
};

export default MainSection;
