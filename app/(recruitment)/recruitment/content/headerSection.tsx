"use client";

import { useState } from "react";
import Image from "next/image";
import reset from "@/images/icon/reset.svg";
import IconBtn from "@/components/button/withIconBtn/IconBtn";
import FilterBtn from "@/components/button/iconBtn/filterBtn";
import PullDown from "@/components/pulldown/pullDown";
import {
  AFFILIATION_TYPE,
  AREA_TYPE,
  FIELD_TYPE,
  TARGET_TYPE,
} from "@/data/pulldown";
import { useUserStore } from "@/stores/userStore";
import NotiPopUp from "@/components/modal/notiPopUp";
import LoginModal from "@/components/modal/login/loginModal";
import MobileLoginModal from "@/components/modal/login/mobileLoginModal";
import router from "next/router";

const HeaderSection = ({
  setAffiliationFilter,
  setFieldFilter,
  setAreaFilter,
  setTargetFilter,
  setSortType,
}: any) => {
  const { user } = useUserStore();
  const isSignIn = !!user;
  const schoolCertification = user?.schoolData;

  const [filter, setFilter] = useState<boolean>(false);
  const [affiliationType, setAffiliationType] = useState<string | null>(null);
  const [areaType, setAreaType] = useState<string | null>(null);
  const [fieldType, setFieldType] = useState<string | null>(null);
  const [targetType, setTargetType] = useState<string | null>(null);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isLoginNotiPopUpOpen, setIsLoginNotiPopUpOpen] =
    useState<boolean>(false);
  const [isSchoolNotiPopUpOpen, setIsSchoolNotiPopUpOpen] =
    useState<boolean>(false);

  const handleRefresh = () => {
    setAffiliationType(null);
    setAreaType(null);
    setFieldType(null);
    setTargetType(null);
    setAffiliationFilter(null);
    setAreaFilter(null);
    setFieldFilter(null);
    setTargetFilter(null);
  };

  const handleLoginRedirect = () => {
    setIsLoginModalOpen(true);
    setIsLoginNotiPopUpOpen(false);
  };

  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false);
  };

  const handleAffiliationOption = (selectedOptions: string[]) => {
    const label = selectedOptions[0] || null;
    const option = AFFILIATION_TYPE.find((opt) => opt.label === label);
    setAffiliationType(label);
    if (!isSignIn) {
      setIsLoginNotiPopUpOpen(true);
    } else if (!schoolCertification && option?.value === "교내") {
      setIsSchoolNotiPopUpOpen(true);
    } else {
      if (label) {
        setAffiliationFilter(option ? option.value : null);
        console.log(`선택된 소속: ${label}, 값: ${option?.value}`);
      } else {
        setAffiliationFilter(null);
        console.log("소속 필터 해제");
      }
    }
  };

  const handleFieldOption = (selectedOptions: string[]) => {
    const label = selectedOptions[0] || null;
    setFieldType(label);

    if (label) {
      const option = FIELD_TYPE.find((opt) => opt.label === label);
      setFieldFilter(option ? option.value : null);
      console.log(`선택된 분야: ${label}, 값: ${option?.value}`);
    } else {
      setFieldFilter(null);
      console.log("분야 필터 해제");
    }
  };

  const handleAreaOption = (selectedOptions: string[]) => {
    const label = selectedOptions[0] || null;
    setAreaType(label);

    if (label) {
      const option = AREA_TYPE.find((opt) => opt.label === label);
      setAreaFilter(option ? option.value : null);
      console.log(`선택된 지역: ${label}, 값: ${option?.value}`);
    } else {
      setAreaFilter(null);
      console.log("지역 필터 해제");
    }
  };

  const handleTargetOption = (selectedOptions: string[]) => {
    const label = selectedOptions[0] || null;
    setTargetType(label);

    if (label) {
      const option = TARGET_TYPE.find((opt) => opt.label === label);
      setTargetFilter(option ? option.value : null);
      console.log(`선택된 대상: ${label}, 값: ${option?.value}`);
    } else {
      setTargetFilter(null);
      console.log("대상 필터 해제");
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between">
      <div className="flex justify-between gap-2">
        <h1 className="text-text1 text-mobile_h1_contents_title md:text-h1_contents_title">
          모집공고
        </h1>
        <div className="md:hidden">
          <FilterBtn onClick={() => setFilter(!filter)} />
        </div>
      </div>

      <div
        className={`flex-row-reverse md:flex-row md:gap-4 ${
          filter ? `flex` : `hidden md:flex`
        }`}
      >
        <div className="hidden md:flex md:gap-4">
          <IconBtn
            type="reset"
            size="small"
            title="초기화"
            onClick={handleRefresh}
          />
        </div>
        <div className="flex gap-2 mt-4 md:mt-0 md:gap-4">
          <PullDown
            optionData={AFFILIATION_TYPE.slice(1).filter(Boolean)}
            optionSize="small"
            handleOption={handleAffiliationOption}
            selectedOption={affiliationType ? [affiliationType] : []}
            placeholder={AFFILIATION_TYPE[0].label}
          />
          <PullDown
            optionData={FIELD_TYPE.slice(1).filter(Boolean)}
            optionSize="small"
            handleOption={handleFieldOption}
            selectedOption={fieldType ? [fieldType] : []}
            placeholder={FIELD_TYPE[0].label}
          />
          <PullDown
            optionData={AREA_TYPE.slice(1).filter(Boolean)}
            optionSize="small"
            handleOption={handleAreaOption}
            selectedOption={areaType ? [areaType] : []}
            placeholder={AREA_TYPE[0].label}
          />
          <PullDown
            optionData={TARGET_TYPE.slice(1).filter(Boolean)}
            optionSize="small"
            handleOption={handleTargetOption}
            selectedOption={targetType ? [targetType] : []}
            placeholder={TARGET_TYPE[0].label}
          />
          <Image
            src={reset}
            alt="reset"
            width={16}
            height={16}
            onClick={handleRefresh}
            className="md:hidden mr-2"
          />
        </div>
      </div>

      {/* 로그인 팝업 */}
      {isLoginModalOpen && (
        <>
          <LoginModal onClose={handleLoginModalClose} />
          <MobileLoginModal onClose={handleLoginModalClose} />
        </>
      )}

      {isLoginNotiPopUpOpen && (
        <NotiPopUp
          onClose={() => setIsLoginNotiPopUpOpen(false)}
          icon="login"
          title="로그인이 필요한 서비스입니다."
          description={`교내 인기 동아리를 확인하기 위해서는\n로그인이 필요합니다.`}
          firstButton={handleLoginRedirect}
          firstButtonText="로그인 후 이용하기"
          secondButton={() => setIsLoginNotiPopUpOpen(false)}
          secondButtonText="다음에 할게요"
          modalType="button"
        />
      )}

      {isSchoolNotiPopUpOpen && (
        <NotiPopUp
          onClose={() => setIsSchoolNotiPopUpOpen(false)}
          icon="school"
          title="학교 등록이 필요한 서비스입니다."
          description={`교내 인기 동아리를 확인하기 위해서는\n학교 등록이 필요합니다.`}
          firstButton={() => {
            router.push("/user/userInfo");
          }}
          firstButtonText="학교 등록하기"
          secondButton={() => setIsSchoolNotiPopUpOpen(false)}
          secondButtonText="다음에 할게요"
          modalType="button"
        />
      )}
    </div>
  );
};

export default HeaderSection;
