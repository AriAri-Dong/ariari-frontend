"use client";

import React, { useEffect, useState } from "react";
import LargeBtn from "@/components/button/basicBtn/largeBtn";
import backVector from "@/images/icon/backVector.svg";
import Image from "next/image";
import Alert from "@/components/alert/alert";
import Step0 from "./step0";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import { validateEmail } from "@/schema/email";
import { useProfileContext } from "@/context/profileConetxt";
import { formatTime } from "@/utils/timeFormatter";
import { sendSchoolAuthEmail, validateSchoolAuthCode } from "@/api/school/api";
import MobileSnackBar from "@/components/bar/mobileSnackBar";
import { updateNickname, updateProfileType } from "@/api/member/api";
import { useRouter } from "next/navigation";

interface ProfileSettingProps {
  step: number;
  onNextStep: (nextStep: number) => void;
  onClose: () => void;
}

/**
 *
 * @param step 단계 (0-4)
 * @param onNextStep 특정 step으로 넘어가는 함수
 * @returns
 */
const MobileProfileSetting = ({
  step,
  onNextStep,
  onClose,
}: ProfileSettingProps) => {
  const router = useRouter();
  const { profileData } = useProfileContext();

  const [timeLeft, setTimeLeft] = useState<number>(300);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [verificationFailed, setVerificationFailed] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  // 인증 번호 재전송
  const resetTimer = async () => {
    try {
      await sendSchoolAuthEmail(profileData.email);
      setTimeLeft(300);
      setAlertMessage("인증번호를 전송했습니다.");
    } catch (error) {
      setAlertMessage(
        "학교 인증 이메일 발송에 실패했습니다. 다시 시도해주세요."
      );
    }
  };

  const handleSkip = () => {
    onClose();
  };

  const validateCurrentStep = async () => {
    if (step === 2) {
      const emailValidationError = validateEmail(profileData.email);
      if (emailValidationError) {
        setAlertMessage(emailValidationError);
        return false;
      }
    } else if (step === 3) {
      try {
        // 학교 인증 코드 검증
        await validateSchoolAuthCode(profileData.verificationCode);
        setVerificationFailed(false);
        // 인증 성공 후 프로필 열림 상태 변경
        setIsProfileOpen(true);
        // onClose() 호출은 인증 완료 후 마지막에 처리
      } catch (error) {
        setVerificationFailed(true);
        setAlertMessage("인증번호가 올바르지 않습니다. 다시 확인해주세요.");
        return false;
      }
    }
    return true;
  };

  const handleNextStep = async () => {
    setAlertMessage(null);

    if (step === 0) {
      if (!profileData.agreements) {
        setAlertMessage("모든 약관에 동의해주세요.");
        return;
      }
    }

    if (step === 1) {
      // 사용자 이름 유효성 검사
      if (!profileData.username || profileData.username.trim() === "") {
        setAlertMessage("사용자 이름을 입력해주세요.");
        return;
      }
      onNextStep(2);
    }

    if (step === 2) {
      if (!profileData.email || profileData.email.trim() === "") {
        setAlertMessage("이메일을 입력해주세요.");
        return;
      }

      resetTimer();
      onNextStep(3);
    } else if (step === 3) {
      const isValid = await validateCurrentStep();
      if (!isValid) {
        return;
      }

      // 인증 완료 후 API 호출
      try {
        // 닉네임 변경 API 호출
        await updateNickname(profileData.username);

        // 프로필 변경 API 호출
        await updateProfileType(profileData.selectedProfileType);

        // 두 API 호출이 성공적으로 완료된 후 페이지 이동
        onClose(); // 인증 완료 후 모달을 닫기

        // 페이지 이동 시 firstLogin=1 쿼리 파라미터 추가
        router.push("/home?firstLogin=1");
      } catch (error) {
        setAlertMessage(
          "닉네임 또는 프로필 변경에 실패했습니다. 다시 시도해주세요."
        );
      }
    } else {
      onNextStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      onNextStep(step - 1);
    }
  };

  useEffect(() => {
    if (step === 3) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [step]);

  useEffect(() => {
    if (isProfileOpen) {
      setIsProfileOpen(false);
    }
  }, [isProfileOpen]);

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-background z-50 flex flex-col
    justify-between pt-[46px] pb-5 px-4 md:hidden"
    >
      <div className="flex flex-col items-center">
        <div className={`w-full relative flex items-center`}>
          <Image
            src={backVector}
            alt={"prev"}
            height={24}
            width={24}
            onClick={handleBack}
            className={step === 1 ? "hidden" : ""}
          />
          <h1 className="flex-1 text-center text-text1 text-mobile_h1_contents_title mr-6">
            {step === 0
              ? "이용약관 동의"
              : step === 1
              ? "프로필 생성"
              : "학교 등록"}
          </h1>
        </div>
        {step === 0 && <Step0 />}
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && (
          <Step3
            onResend={resetTimer}
            verificationFailed={verificationFailed}
          />
        )}
      </div>
      <div className="flex flex-col w-full gap-2">
        <LargeBtn
          title={step === 3 ? `학교 인증하기 ${formatTime(timeLeft)}` : "다음"}
          onClick={handleNextStep}
        />
        {step === 2 ||
          (step === 3 && (
            <button
              onClick={handleSkip}
              className="text-primary text-mobile_body2_sb py-2.5"
            >
              건너뛰기
            </button>
          ))}
        {alertMessage && (
          <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
        )}
      </div>
      {/* 프로필 인증 후 MobileSnackBar 표시 */}
      {isProfileOpen && <MobileSnackBar text={"로그인이 완료되었습니다."} />}
    </div>
  );
};

export default MobileProfileSetting;
