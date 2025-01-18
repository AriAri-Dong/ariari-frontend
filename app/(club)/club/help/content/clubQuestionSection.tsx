"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useResponsive from "../../../../../hooks/useResponsive";

import { FAQ_DATA } from "@/data/faq";
import { QUESTION_TYPE } from "@/data/pulldown";
import { pageInfo, QNA_DATA } from "@/data/qna";
import { ClubFaqData, ClubQuestionData } from "@/models/club";
import { PageInfo } from "@/models/page";

import SubTap from "@/components/tab/subTap";
import QuestionDropdown from "../components/questionDropdown";
import PlusBtn from "@/components/button/withIconBtn/plusBtn";
import WriteBtn from "@/components/button/iconBtn/writeBtn";
import DarkBtn from "@/components/button/withIconBtn/darkBtn";
import RecruitmentGuideFloatingBar from "@/components/bar/floatingBar/recruitmentGuideFloatingBar";
import HelpText from "@/components/button/helpText/helpText";

import helpTextFaqMobile from "@/images/icon/helptextFaqMobile.svg";
import helpTextQnaMobile from "@/images/icon/helptextQnaMobile.svg";
import helpTextQnaPc from "@/images/icon/helptextQnaPc.svg";
import helpTextFaqPc from "@/images/icon/helptextFaqPc.svg";
import QnaForm from "../components/qnaForm";
import Alert from "@/components/alert/alert";
import FaqForm from "../components/faqForm";
import NotiPopUp from "@/components/modal/notiPopUp";
import LoginModal from "@/components/modal/login/loginModal";
import MobileLoginModal from "@/components/modal/login/mobileLoginModal";
import { ClubMemberData } from "@/models/member";
import { CLUM_MEMBER_DATA } from "@/data/clubmember";

const ClubQuestionSection = () => {
  const [type, setType] = useState<string>(QUESTION_TYPE[0].label);
  const [isQnaFormOpen, setIsQnaFormOpen] = useState<boolean>(false);
  const [isFaqFormOpen, setIsFaqFormOpen] = useState<boolean>(false);

  const [faqData, setFaqData] = useState<ClubFaqData[]>(FAQ_DATA);
  const [faqPageInfo, setFaqPageInfo] = useState<PageInfo>(pageInfo);
  const [faqCurrentPage, setFaqCurrentPage] = useState<number>(1);

  const [qnaData, setQnaData] = useState<ClubQuestionData[]>(QNA_DATA);
  const [qnaPageInfo, setQnaPageInfo] = useState<PageInfo>(pageInfo);
  const [qnaCurrentPage, setQnaCurrentPage] = useState<number>(1);

  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [isNotiPopUpOpen, setIsNotiPopUpOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const [clubMember, setClubMember] = useState<ClubMemberData | null>(
    CLUM_MEMBER_DATA[1]
  ); // 멤버타입 (null - 미소속회원)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true); // 로그인여부 임시값
  const isTapOver = useResponsive("md");

  const handleLoadMoreFaq = () => {
    setFaqCurrentPage((prev) => prev + 1);
    // 데이터 받아오기
    setFaqData((prev) => [...prev, ...faqData]);
  };

  const handleLoadMoreQna = () => {
    setQnaCurrentPage((prev) => prev + 1);
    // 데이터 받기
    setQnaData((prev) => [...prev, ...qnaData]);
  };

  const router = useRouter();

  const handleRouter = () => {
    // 모집 공고 임시 경로
    router.push("/");
  };
  const handleOpenForm = () => {
    if (!isLoggedIn) {
      setIsNotiPopUpOpen(true);
      return;
    } else {
      type == "FAQ" ? setIsFaqFormOpen(true) : setIsQnaFormOpen(true);
    }
  };

  return (
    <div className="bg-sub_bg flex justify-center items-center w-full pb-20 md:pb-[124px]">
      <div className="w-full max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-lx px-4 mt-6 md:px-5">
        <div className="flex items-center justify-between mb-[22px]">
          <p className="text-subtext2">
            총 {type == "FAQ" ? faqPageInfo.totalSize : qnaPageInfo.totalSize}
            개의 FAQ가 있어요
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

        {type == "FAQ"
          ? faqData.map((item, index) => (
              <div key={index} className="mb-2.5">
                <QuestionDropdown
                  data={item}
                  myRoleType={clubMember?.clubMemberRoleType}
                  myProfileType={clubMember?.profileType}
                />
              </div>
            ))
          : qnaData.map((item, index) => (
              <div key={index} className="mb-2.5">
                <QuestionDropdown
                  data={item}
                  myRoleType={clubMember?.clubMemberRoleType}
                  myProfileType={clubMember?.profileType}
                />
              </div>
            ))}

        {type == "FAQ" && faqPageInfo.totalPages > faqCurrentPage && (
          <div className="flex justify-center mt-9 md:mt-10">
            <PlusBtn title={"더보기"} onClick={handleLoadMoreFaq} />
          </div>
        )}
        {type == "Q&A" && qnaPageInfo.totalPages > qnaCurrentPage && (
          <div className="flex justify-center  mt-9 md:mt-10">
            <PlusBtn title={"더보기"} onClick={handleLoadMoreQna} />
          </div>
        )}
      </div>
      {/* ====== PC 해상도에서만 보이는 하단 버튼 ======  */}
      {/* 모집안내 바 : 로그인 x or 동아리 가입 x */}
      {(clubMember == null || !isLoggedIn) && (
        <RecruitmentGuideFloatingBar
          deadline={new Date("2024-12-31T23:59:59")}
          isWriteButtonVisible={type == "Q&A"}
          handleWrite={handleOpenForm}
        />
      )}

      {/* ====== 모바일 해상도에서만 보이는 하단 버튼 ======  */}

      <div className="fixed bottom-5 left-4  md:hidden">
        <DarkBtn title={"모집공고 보기"} onClick={handleRouter} />
      </div>

      {/* ====== 공통 작성버튼 : FAQ - 관리자, 매니저, QNA - 일반회원 ======*/}
      {((type == "Q&A" &&
        (clubMember?.clubMemberRoleType == "GENERAL" ||
          clubMember == null ||
          !isLoggedIn)) ||
        (type == "FAQ" &&
          (clubMember?.clubMemberRoleType == "ADMIN" ||
            clubMember?.clubMemberRoleType == "MANAGER"))) && (
        <div className="fixed w-full fixed bottom-[20px] px-5 flex justify-end md:bottom-[44px] md:max-w-[1248px] md:px-5">
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
          (type == "FAQ" &&
            (clubMember?.clubMemberRoleType == "ADMIN" ||
              clubMember?.clubMemberRoleType == "MANAGER")) ||
          (type == "Q&A" &&
            (clubMember?.clubMemberRoleType == "GENERAL" ||
              clubMember == null ||
              !isLoggedIn))
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

export default ClubQuestionSection;
