import { useState, useEffect } from "react";
import {
  getExternalRecruitmentRanking,
  getInternalRecruitmentRanking,
} from "@/api/recruitment/api";
import MainRecruitmentCard from "@/components/card/mainRecruitmentCard";
import NotiPopUp from "@/components/modal/notiPopUp";
import SubTap from "@/components/tab/subTap";
import { AFFILIATION_TYPE } from "@/data/pulldown";
import { RecruitmentData } from "@/types/recruitment";
import { authStore } from "@/stores/userStore";
import LoginModal from "@/components/modal/login/loginModal";
import MobileLoginModal from "@/components/modal/login/mobileLoginModal";

const PopularRecruitment = () => {
  const [popularRecruitmentData, setPopularRecruitmentData] = useState<
    RecruitmentData[]
  >([]);
  const [affiliationType, setAffiliationType] = useState<string[]>([
    AFFILIATION_TYPE[1].label,
  ]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false); // 로그인 모달 상태
  const [isLoginNotiPopUpOpen, setIsLoginNotiPopUpOpen] =
    useState<boolean>(false); // 로그인 팝업 상태
  const [isSchoolNotiPopUpOpen, setIsSchoolNotiPopUpOpen] =
    useState<boolean>(false); // 학교 인증 팝업 상태

  const isAuthenticated = authStore.getState().isSignIn; // 로그인 상태 확인
  const schoolCertification = authStore.getState().schoolData === null; // 학교 인증 여부 확인

  useEffect(() => {
    if (
      isAuthenticated &&
      !schoolCertification &&
      affiliationType[0] === "교내"
    ) {
      // 학교 인증이 완료되었고 교내를 선택한 경우
      fetchInternal(); // 교내 동아리 데이터를 호출
    } else {
      fetchExternal();
    }
  }, [isAuthenticated, schoolCertification, affiliationType]);

  const handleOption = (value: string) => {
    if (!isAuthenticated) {
      // 로그인되지 않으면 로그인 팝업 띄우기
      setIsLoginNotiPopUpOpen(true);
    } else if (
      schoolCertification &&
      value === "교내" &&
      !isSchoolNotiPopUpOpen
    ) {
      // 로그인 되어 있고, 학교 인증이 안되어 있으면 학교 인증 팝업 띄우기
      setIsSchoolNotiPopUpOpen(true);
    } else {
      // 로그인 및 학교 인증이 된 상태에서 교내 동아리를 선택한 경우
      setAffiliationType([value]);
    }
  };

  const fetchExternal = async () => {
    try {
      const res = await getExternalRecruitmentRanking();
      setPopularRecruitmentData(res.recruitmentDataList);
    } catch (error) {
      console.error("Error fetching external recruitment ranking:", error);
    }
  };

  const fetchInternal = async () => {
    try {
      const res = await getInternalRecruitmentRanking();
      setPopularRecruitmentData(res.recruitmentDataList);
    } catch (error) {
      console.error("Error fetching internal recruitment ranking:", error);
    }
  };

  const handleLoginRedirect = () => {
    setIsLoginModalOpen(true);
    setIsLoginNotiPopUpOpen(false);
  };

  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <section className="py-10">
      <div className="flex justify-between items-center mb-[22px]">
        <h2 className="text-text1 text-mobile_h1_contents_title md:text-h1_contents_title">
          인기 모집공고
        </h2>
        <SubTap
          optionData={AFFILIATION_TYPE.slice(1, 3)}
          selectedOption={affiliationType[0]}
          handleOption={handleOption}
        />
      </div>

      <div className="flex flex-col gap-5 md:gap-x-4 md:gap-y-7 md:flex-row md:flex-wrap md:grid md:grid-cols-3 lx:grid-cols-4">
        <MainRecruitmentCard data={popularRecruitmentData} />
      </div>

      {/* 로그인 팝업 */}
      {isLoginModalOpen && (
        <>
          <LoginModal onClose={handleLoginModalClose} />
          <MobileLoginModal onClose={handleLoginModalClose} />
        </>
      )}

      {/* 로그인 팝업 */}
      {isLoginNotiPopUpOpen && (
        <NotiPopUp
          onClose={() => setIsLoginNotiPopUpOpen(false)}
          icon="school"
          title="로그인이 필요한 서비스입니다."
          description={`교내 인기 동아리를 확인하기 위해서는\n로그인이 필요합니다.`}
          firstButton={handleLoginRedirect}
          firstButtonText="로그인 후 이용하기"
          secondButton={() => setIsLoginNotiPopUpOpen(false)}
          secondButtonText="다음에 할게요"
          modalType="button"
        />
      )}

      {/* 학교 인증 팝업 */}
      {isSchoolNotiPopUpOpen && (
        <NotiPopUp
          onClose={() => setIsSchoolNotiPopUpOpen(false)}
          icon="school"
          title="학교 등록이 필요한 서비스입니다."
          description={`교내 인기 동아리를 확인하기 위해서는\n학교 등록이 필요합니다.`}
          firstButton={() => {}}
          firstButtonText="학교 등록하기"
          secondButton={() => setIsSchoolNotiPopUpOpen(false)}
          secondButtonText="다음에 할게요"
          modalType="button"
        />
      )}
    </section>
  );
};

export default PopularRecruitment;
