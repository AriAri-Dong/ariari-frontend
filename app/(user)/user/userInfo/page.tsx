"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import TextInputWithCounter from "@/components/input/textInputWithCounter";
import defaultImg from "@/images/icon/defaultAriari.svg";
import Image from "next/image";
import WriteBtn from "@/components/button/iconBtn/writeBtn";
import vector from "@/images/icon/backVector.svg";
import Alert from "@/components/alert/alert";
import NotiPopUp from "@/components/modal/notiPopUp";
import TextInputWithBtn from "@/components/input/textInputWithBtn";
import { useUserStore } from "@/providers/userStoreProvider";
import CustomInput from "@/components/input/customInput";
import TransparentSmallBtn from "@/components/button/basicBtn/transparentSmallBtn";
import Contour from "@/components/bar/contour";
import RegistrationModal from "@/components/modal/school/registrationModal";
import ModifyProfileModal from "@/components/modal/profileSetting/modifyProfileModal";
import { PROFILE_SETTING } from "@/data/profileSetting";
import { unregister } from "@/api/login/api";
import AlertWithMessage from "@/components/alert/alertWithMessage";

const UserInfoPage = () => {
  const router = useRouter();
  const schoolData = useUserStore((state) => state.schoolData);
  const nickname = useUserStore((state) => state.memberData.nickname);
  const profileType = useUserStore((state) => state.memberData.profileType);

  const [cancelModal, setCancelModal] = useState<boolean>(false);
  const [registrationSchoolModal, setRegistrationSchoolModal] =
    useState<boolean>(false);
  const [profileModal, setProfileModal] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>(nickname);
  const [clubIntroduction, setClubIntroduction] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alert, setAlert] = useState<boolean>(false);

  // Alert 메시지 설정 및 표시
  const showAlert = (message: string) => {
    setAlertMessage(message);
  };

  // Alert 닫기
  const closeAlert = () => {
    setAlertMessage(null);
  };

  const profileImage =
    PROFILE_SETTING.find((item) => item.alias === profileType) ||
    PROFILE_SETTING[0];

  const handleGoBack = () => {
    // 임시 경로
    router.push("/club");
  };

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleClubIntroductionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setClubIntroduction(event.target.value);
  };

  const handleProfileChange = () => {
    setProfileModal(true);
  };

  const handleCancelRegistration = () => {
    setCancelModal(true);
  };

  const handleRegistrationComplete = (message: string) => {
    showAlert(message);
    setRegistrationSchoolModal(false);
  };

  // 학교 등록 취소 확인
  const handleCancellationConfirmation = () => {
    showAlert("학교 등록이 취소되었습니다.");
    setCancelModal(false);
  };

  // 회원 탈퇴 처리
  const handleUserWithdrawal = () => {
    setAlert(true);
  };

  const confirmWithdrawal = async () => {
    try {
      await unregister();
      setAlertMessage("회원 탈퇴가 완료되었습니다.");
    } catch (error) {
      setAlertMessage("회원 탈퇴에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setAlert(false);
    }
  };

  const handleRegistrationSchool = () => {
    setRegistrationSchoolModal(true);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between mt-[46px] mb-5 md:mt-8 md:mb-[22px]">
        <div className="flex gap-2">
          <Image
            src={vector}
            alt={"뒤로가기"}
            width={24}
            height={24}
            onClick={handleGoBack}
            className="md:hidden cursor-pointer"
          />
          <div className="flex flex-col gap-[22px]">
            <h1 className="text-text1 text-mobile_h1_contents_title md:text-h1_contents_title">
              회원 정보 수정
            </h1>
          </div>
        </div>
      </div>
      <div className="bg-background rounded-lg md:py-[26px] md:px-6 md:mb-[124px]">
        <h3 className="flex text-mobile_h3 mb-[14px] md:text-h3 md:mb-[18px]">
          프로필 이미지
        </h3>
        <div className="relative inline-block mb-[30px] md:mb-7">
          <label>
            <Image
              src={profileImage?.imageUrl || defaultImg}
              alt={profileImage?.alias || "기본 이미지"}
              width={95}
              height={95}
              className="md:w-[152px] md:h-[152px] rounded-full border border-menuborder p-1 cursor-pointer"
            />
          </label>
          <div className="absolute bottom-0 right-0 translate-x-1/5 translate-y-1/5">
            <WriteBtn size="small" onClick={handleProfileChange} />
          </div>
        </div>

        <h3 className="flex text-mobile_h3 mb-[14px] md:text-h3 md:mb-2.5">
          사용자 이름
          <span className="text-noti text-mobile_body3_m pl-1">*</span>
        </h3>
        <TextInputWithCounter
          value={userName}
          onChange={handleUserNameChange}
          placeholder="사용자 이름"
          maxLength={10}
          className="mb-[30px] md:mb-7 max-w-[770px]"
        />
        <h3 className="flex text-mobile_h3 mb-[14px] md:text-h3 md:mb-2.5">
          학교 정보
        </h3>
        {schoolData === null ? (
          <TextInputWithBtn
            value={clubIntroduction}
            onChange={handleClubIntroductionChange}
            placeholder="학교 정보"
            className="mb-[30px] md:mb-7 max-w-[770px]"
            onClick={handleRegistrationSchool}
            btnTitle={"학교 등록"}
          />
        ) : (
          <CustomInput
            value={schoolData.name}
            placeholder={"학교 정보"}
            onChange={() => {}}
            className="mb-[30px] md:mb-10 max-w-[770px]"
          />
        )}
        {schoolData !== null && (
          <div className="flex flex-col md:gap-2.5 mb-10">
            <h3 className="flex text-mobile_h3 md:text-h3">학교 등록 취소</h3>
            <p className="md:text-body1_r text-subtext2 mb-2">
              학교 변경이 필요한가요? 편입이나 반수로 인해 학교 정보가
              달라졌다면, 인증을 취소하고 새로운 학교를 등록해 보세요!
            </p>
            <div className="flex">
              <TransparentSmallBtn
                title={"학교 등록 취소"}
                onClick={handleCancelRegistration}
                round
              />
            </div>
          </div>
        )}
        <Contour />
        <div className="flex flex-col md:gap-2.5 mt-10 items-start">
          <h3 className="flex text-mobile_h3 md:text-h3">서비스 탈퇴하기</h3>
          <span className="text-subtext2 text-body1_r mb-[14px]">
            아리아리 서비스 탈퇴시 가입, 개설한 동아리에서 탈퇴처리 되며 올린
            게시글과 댓글이 모두 삭제 되어 복구할 수 없습니다.
          </span>
          <button
            className="py-1 px-2 md:text-body1_m text-icon"
            onClick={handleUserWithdrawal}
          >
            탈퇴하기
          </button>
        </div>
      </div>
      {cancelModal && (
        <NotiPopUp
          onClose={() => {
            setCancelModal(false);
          }}
          icon={"school"}
          title={"학교 등록을 정말 취소할까요?"}
          description={
            "가입된 교내 동아리는 모두 자동 탈퇴 처리되고 <br/> 관련 데이터는 복구할 수 없어요."
          }
          modalType={"button"}
          firstButton={handleCancellationConfirmation}
          firstButtonText={"학교 등록 취소하기"}
          secondButton={() => {
            setCancelModal(false);
          }}
          secondButtonText={"학교 등록 유지하기"}
        />
      )}
      {registrationSchoolModal && (
        <RegistrationModal
          onClose={() => {
            setRegistrationSchoolModal(false);
          }}
          onComplete={handleRegistrationComplete}
        />
      )}
      {profileModal && (
        <ModifyProfileModal
          onClose={() => {
            setProfileModal(false);
          }}
        />
      )}
      {alert && (
        <AlertWithMessage
          text="정말 회원 탈퇴를 진행하시겠습니까?"
          description="회원 탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다."
          leftBtnText="취소"
          rightBtnText="탈퇴하기"
          onLeftBtnClick={() => setAlert(false)}
          onRightBtnClick={confirmWithdrawal}
        />
      )}
      {alertMessage && <Alert text={alertMessage} onClose={closeAlert} />}
    </div>
  );
};

export default UserInfoPage;
