"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import useResponsive from "@/hooks/useResponsive";
import LargeBtn from "@/components/button/basicBtn/largeBtn";
import {
  cancelSchoolAuth,
  sendSchoolAuthEmail,
  validateSchoolAuthCode,
} from "@/api/school/api";
import { validateEmail } from "@/schema/email";
import useScreenHeight from "@/hooks/useScreenHeight";
import check from "@/images/icon/check.svg";
import {
  getMemberData,
  updateNickname,
  updateProfileType,
} from "@/api/member/api";
import IconBtn from "@/components/button/withIconBtn/IconBtn";
import { formatTime } from "@/utils/timeFormatter";
import MobileSnackBar from "@/components/bar/mobileSnackBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "회원 정보 수정 | 개인정보를 안전하게 관리하세요",
  description:
    "회원 정보를 확인하고 비밀번호, 연락처 등 개인정보를 안전하게 수정할 수 있습니다.",
  openGraph: {
    title: "회원 정보 수정 | 개인정보를 안전하게 관리하세요",
    description:
      "회원 정보를 확인하고 비밀번호, 연락처 등 개인정보를 안전하게 수정할 수 있습니다.",
    url: "https://ariari.com/user/userInfo",
    siteName: "아리아리",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "아리아리",
      },
    ],
    type: "website",
  },
};

const UserInfoPage = () => {
  const router = useRouter();
  const isMd = useResponsive("md");
  const isSmallScreen = useScreenHeight(740);

  const { setUserData } = useUserStore((state) => state);
  const schoolData = useUserStore((state) => state.schoolData);
  const nickname = useUserStore((state) => state.memberData.nickname);
  const profileType = useUserStore((state) => state.memberData.profileType);

  const [cancelModal, setCancelModal] = useState<boolean>(false);
  const [registrationSchoolModal, setRegistrationSchoolModal] =
    useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [timeLeft, setTimeLeft] = useState<number>(300);
  const [snackbar, setSnackbar] = useState<boolean>(false);
  const [profileModal, setProfileModal] = useState<boolean>(false);
  const [profileSection, setProfileSection] = useState<boolean>(false);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>(nickname);
  const [clubIntroduction, setClubIntroduction] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alert, setAlert] = useState<boolean>(false);
  const [verificationFailed, setVerificationFailed] = useState<boolean>(false);
  const [duplicateCheck, setDuplicateCheck] = useState<boolean>(false);
  const [selectedProfileType, setSelectedProfileType] = useState<string | null>(
    profileType
  );
  const [selectedProfileData, setSelectedProfileData] = useState(
    PROFILE_SETTING.find((item) => item.alias === profileType) ||
      PROFILE_SETTING[0]
  );

  useEffect(() => {
    setUserName(nickname);
  }, [nickname]);

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
    router.back();
  };

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNumber(value);
  };

  const handleProfileClick = (alias: string | null) => {
    setSelectedProfileType(alias);
    const newProfile = PROFILE_SETTING.find((item) => item.alias === alias);
    if (newProfile) setSelectedProfileData(newProfile);
  };

  const handleClubIntroductionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setClubIntroduction(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleProfileChange = () => {
    if (isMd) {
      setProfileModal(true);
    } else {
      setProfileSection(!profileSection);
    }
  };

  const handleCancelRegistration = () => {
    setCancelModal(true);
  };

  const handleRegistrationComplete = (message: string) => {
    showAlert(message);
    setRegistrationSchoolModal(false);
  };

  // 학교 등록 취소 확인
  const handleCancellationConfirmation = async () => {
    try {
      await cancelSchoolAuth();
      showAlert("학교 등록이 취소되었습니다.");
      setCancelModal(false);

      // 화면 새로고침
      window.location.reload();
    } catch (error) {
      console.error("학교 등록 취소 실패:", error);
      showAlert("학교 등록 취소 중 오류가 발생했습니다.");
    }
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

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timerActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
    }

    return () => clearInterval(timer);
  }, [timeLeft, timerActive]);

  const handleMobileRegistrationSchool = async () => {
    setAlertMessage(null);
    const emailValidationError = validateEmail(email);
    if (emailValidationError) {
      setAlertMessage(emailValidationError);
      return false;
    } else {
      try {
        await sendSchoolAuthEmail(email);
        setAlertMessage("인증번호를 전송했습니다.");
        setStep(2);
        resetTimer();
      } catch (error) {
        setAlertMessage(
          "학교 인증 이메일 발송에 실패했습니다. 다시 시도해주세요."
        );
      }
    }
  };

  const resetTimer = () => {
    setTimeLeft(300);
    setTimerActive(true);
  };

  const handleResend = async () => {
    try {
      await sendSchoolAuthEmail(email);
      setAlertMessage("인증번호를 재전송했습니다.");
      resetTimer();
    } catch (error) {
      setAlertMessage("인증 이메일 재발송에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleValidateSchoolAuthCode = async () => {
    try {
      await validateSchoolAuthCode(number);
      setVerificationFailed(false);
      setSnackbar(true);
      const res = await getMemberData();
      setUserData(res);
    } catch (error) {
      setVerificationFailed(true);
      return false;
    }
  };

  const handleChangeProfile = async () => {
    if (!selectedProfileType) {
      setAlertMessage("프로필을 선택해주세요.");
      return;
    }

    try {
      await updateProfileType(selectedProfileType);
      const res = await getMemberData();
      setUserData(res);
      setProfileSection(false);
      setAlertMessage("프로필이 변경 되었습니다.");
    } catch (error) {
      setVerificationFailed(true);
      return false;
    }
  };

  const handleModifyNickname = async () => {
    if (userName === nickname) {
      return;
    } else {
      try {
        await updateNickname(userName);
        const res = await getMemberData();
        setUserData(res);
        setAlertMessage("닉네임이 변경 되었습니다.");
        setDuplicateCheck(false);
      } catch (error) {
        setDuplicateCheck(true);
        return false;
      }
    }
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
              src={
                isMd
                  ? profileImage?.imageUrl
                  : selectedProfileData?.imageUrl || defaultImg
              }
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
        {profileSection && (
          <div
            className={`flex flex-col gap-4 mb-[30px] mt-[-14px] transition-all duration-300 ease-in-out overflow-hidden`}
          >
            <div
              className={`grid grid-cols-4 w-full gap-x-7 ${
                isSmallScreen ? "gap-y-2.5" : "gap-y-4"
              }`}
            >
              {PROFILE_SETTING.map((profile) => (
                <div
                  key={profile.id}
                  className={`relative cursor-pointer rounded-full w-[64px] h-[64px] flex items-center justify-center mx-auto
                    `}
                  onClick={() => handleProfileClick(profile.alias || "")}
                >
                  <Image
                    src={profile.imageUrl}
                    alt={profile.alias || ""}
                    width={64}
                    height={64}
                    className="rounded-full block"
                  />
                  {profile.alias === selectedProfileType && (
                    <>
                      <div className="absolute inset-0 bg-black opacity-50 rounded-full z-10" />
                      <div className="absolute inset-0 flex items-center justify-center z-20">
                        <Image src={check} alt="check" width={24} height={24} />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
            <LargeBtn title={"수정하기"} onClick={handleChangeProfile} />
          </div>
        )}

        <h3 className="flex text-mobile_h3 mb-[14px] md:text-h3 md:mb-2.5">
          사용자 이름
          <span className="text-noti text-mobile_body3_m pl-1">*</span>
        </h3>
        {isMd ? (
          <TextInputWithBtn
            value={userName}
            onChange={handleUserNameChange}
            placeholder="사용자 이름"
            maxLength={10}
            className="mb-[30px] md:mb-7 max-w-[770px]"
            onClick={handleModifyNickname}
            btnTitle={"수정하기"}
          />
        ) : (
          <div className="flex flex-col mb-[30px]">
            <CustomInput
              value={userName}
              onChange={handleUserNameChange}
              maxLength={10}
              placeholder="사용자 이름"
            />
            {duplicateCheck && (
              <p className="w-full text-noti text-mobile_body4_r mt-2 pl-2">
                중복된 이메일입니다.
              </p>
            )}
            <div
              className={`transition-all duration-300 overflow-hidden ${
                userName !== nickname
                  ? "h-auto opacity-100"
                  : "h-0 opacity-0 mt-0"
              }`}
            >
              <LargeBtn
                title={"수정하기"}
                onClick={handleModifyNickname}
                className="mt-[14px]"
              />
            </div>
          </div>
        )}

        <h3 className="flex text-mobile_h3 mb-[14px] md:text-h3 md:mb-2.5">
          학교 정보
        </h3>
        {schoolData === null ? (
          <>
            {isMd ? (
              <TextInputWithBtn
                value={clubIntroduction}
                onChange={handleClubIntroductionChange}
                placeholder="학교 정보"
                className="mb-[30px] md:mb-7 max-w-[770px]"
                onClick={handleRegistrationSchool}
                btnTitle={"학교 등록"}
              />
            ) : (
              <>
                {step === 1 ? (
                  <div className="flex flex-col gap-[14px] mb-[30px]">
                    <CustomInput
                      value={email}
                      onChange={handleEmailChange}
                      placeholder={"재학중인 학교의 이메일을 입력해 주세요."}
                    />
                    <LargeBtn
                      title={"학교 등록"}
                      onClick={handleMobileRegistrationSchool}
                    />
                  </div>
                ) : (
                  <>
                    <div className="flex w-full justify-between items-center">
                      <input
                        className="w-full bg-searchbar text-mobile_body1_r text-subtext2 py-3 px-4 rounded-xl 
              focus:border-blue-500 focus:outline-none"
                        placeholder="재학중인 학교의 이메일을 입력해 주세요."
                        value={email}
                        onChange={handleEmailChange}
                      />
                      <IconBtn
                        type={"reset"}
                        size={"small"}
                        title={""}
                        onClick={handleResend}
                      />
                    </div>
                    <div
                      className="w-full py-2.5 bg-selectedoption_default 
              text-mobile_body2_r text-primary text-center rounded-lg mt-3"
                    >
                      해당 이메일로 인증번호를 발송하였습니다.
                      <br />
                      인증 메일이 도착하지 않았을시 재전송 버튼을 눌러주세요.
                    </div>
                    <Contour className="mb-8 mt-8" />
                    <h3 className="flex text-mobile_h3 mb-[14px]">
                      학교 등록 인증번호
                    </h3>
                    <input
                      className="w-full bg-searchbar text-mobile_body1_r text-subtext2 py-3 px-4 rounded-xl 
              focus:border-blue-500 focus:outline-none"
                      placeholder="인증번호를 입력해주세요."
                      value={number}
                      onChange={handleNumberChange}
                    />
                    {verificationFailed && (
                      <p className="w-full text-noti text-mobile_body4_r mt-2 pl-2">
                        인증번호를 다시 확인해 주세요.
                      </p>
                    )}
                    <LargeBtn
                      title={`학교 인증하기 ${formatTime(timeLeft)}`}
                      onClick={handleValidateSchoolAuthCode}
                      className="mt-[14px]"
                    />
                  </>
                )}
              </>
            )}
          </>
        ) : (
          <>
            {isMd ? (
              <CustomInput
                value={schoolData.name}
                placeholder={"학교 정보"}
                onChange={() => {}}
                className="mb-[30px] md:mb-10 max-w-[770px]"
              />
            ) : (
              <div className="flex flex-col gap-[14px] mb-[30px]">
                <CustomInput
                  value={schoolData.name}
                  placeholder={"학교 정보"}
                  onChange={() => {}}
                />
              </div>
            )}
          </>
        )}

        {schoolData !== null && (
          <div className="flex flex-col gap-2.5">
            <h3 className="flex text-text1 text-mobile_h3 md:text-h3">
              학교 등록 취소
            </h3>
            <p className="md:text-body1_r text-mobile_body3_r text-subtext2 mb-2">
              학교 변경이 필요한가요? 편입이나 반수로 인해 학교 정보가
              달라졌다면, 인증을 취소하고 새로운 학교를 등록해 보세요!
            </p>
            <LargeBtn
              title={"학교 등록 취소"}
              onClick={handleCancelRegistration}
              className="md:hidden"
            />
            <div className="hidden md:flex">
              <TransparentSmallBtn
                title={"학교 등록 취소"}
                onClick={handleCancelRegistration}
                round
              />
            </div>
          </div>
        )}
        <Contour className="mb-10 mt-10" />
        <div className="flex flex-col md:gap-2.5 mt-10 items-start mb-20 md:mb-0">
          <h3 className="flex text-mobile_h3 md:text-h3 mb-2.5 md:mb-0">
            {isMd ? "서비스 탈퇴하기" : "탈퇴하기"}
          </h3>
          <span className="text-subtext2 text-body3_r md:text-body1_r mb-[14px]">
            아리아리 서비스 탈퇴시 가입, 개설한 동아리에서 탈퇴처리 되며 올린
            게시글과 댓글이 모두 삭제 되어 복구할 수 없습니다.
          </span>
          <button
            className="py-1 px-[6px] md:px-2 
            text-mobile_body3_m md:text-body1_m text-icon"
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
      {snackbar && <MobileSnackBar text={"학교 등록이 완료되었습니다."} />}
    </div>
  );
};

export default UserInfoPage;
