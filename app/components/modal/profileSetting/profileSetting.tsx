"use client";

import React, { useEffect, useState } from "react";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import LargeBtn from "../../button/basicBtn/largeBtn";
import Alert from "@/components/alert/alert";
import { useProfileContext } from "@/context/profileConetxt";
import { validateEmail } from "@/schema/email";
import { formatTime } from "@/utils/timeFormatter";
import { sendSchoolAuthEmail, validateSchoolAuthCode } from "@/api/school/api";
import { updateNickname, updateProfileType } from "@/api/member/api"; // 닉네임과 프로필 변경 API
import { ProfileData } from "@/context/profileConetxt"; // ProfileData 타입 import
import Step0 from "./step0";

interface ProfileSettingProps {
  step: number;
  onNextStep: (nextStep: number) => void;
}

/**
 *
 * @param step 단계 (0-4)
 * @param onNextStep 특정 step으로 넘어가는 함수
 * @returns
 */
const ProfileSetting = ({ step, onNextStep }: ProfileSettingProps) => {
  const { profileData } = useProfileContext();

  const [timeLeft, setTimeLeft] = useState<number>(300); // 인증 시간 (5분)
  const [alertMessage, setAlertMessage] = useState<string | null>(null); // Alert 메시지 상태
  const [verificationFailed, setVerificationFailed] = useState(false); // Step3 인증 실패 상태

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

  const validateCurrentStep = async () => {
    if (step === 2) {
      const emailValidationError = validateEmail(profileData.email);
      if (emailValidationError) {
        setAlertMessage(emailValidationError);
        return false;
      }
    } else if (step === 3) {
      try {
        await validateSchoolAuthCode(profileData.verificationCode);
        setVerificationFailed(false);
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
      // 1단계: 사용자 이름 유효성 검사
      if (!profileData.username || profileData.username.trim() === "") {
        setAlertMessage("사용자 이름을 입력해주세요.");
        return;
      }

      onNextStep(2); // 2단계로 넘어감
    } else if (step === 2) {
      // 2단계: 이메일 유효성 검사
      if (!profileData.email || profileData.email.trim() === "") {
        setAlertMessage("이메일을 입력해주세요.");
        return;
      }

      const emailValidationError = validateEmail(profileData.email);
      if (emailValidationError) {
        setAlertMessage(emailValidationError);
        return;
      }

      // 이메일 검증 통과 후 3단계로 넘어감
      resetTimer();
      onNextStep(3);
    } else if (step === 3) {
      const isValid = await validateCurrentStep();
      if (!isValid) {
        return;
      }

      // 닉네임과 프로필 변경 API 호출
      try {
        // 프로필 타입이 null이면 처리하지 않고 오류 메시지를 띄움
        if (!profileData.selectedProfileType) {
          setAlertMessage("프로필을 선택해주세요.");
          return; // 프로필 타입이 null인 경우에는 다음 단계로 넘어가지 않도록 함
        }

        // 1. 닉네임 변경 API
        await updateNickname(profileData.username);

        // 2. 프로필 변경 API
        await updateProfileType(profileData.selectedProfileType);

        // 3. 모든 API 호출 성공 후 4단계로 진행
        onNextStep(4);
      } catch (error) {
        setAlertMessage(
          "닉네임 또는 프로필 변경에 실패했습니다. 다시 시도해주세요."
        );
      }
    } else {
      onNextStep(step + 1);
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

  const handleSkip = () => {
    onNextStep(4);
  };

  return (
    <div className="relative w-[430px] px-5 pb-9 pt-[26px] bg-background rounded-2xl">
      <h1 className="text-text1 text-h1_contents_title mb-8 text-center">
        {step === 0
          ? "이용약관 동의"
          : step === 1
          ? "프로필 생성"
          : "학교 등록"}
      </h1>
      {step === 0 && <Step0 />}
      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}
      {step === 3 && (
        <Step3 onResend={resetTimer} verificationFailed={verificationFailed} />
      )}
      <div className="flex flex-col w-full gap-4 mt-8">
        <LargeBtn
          title={step === 3 ? `학교 인증하기 ${formatTime(timeLeft)}` : "다음"}
          onClick={handleNextStep}
        />
        {step === 2 ||
          (step === 3 && (
            <button
              onClick={handleSkip}
              className="text-primary text-body1_sb py-2.5"
            >
              건너뛰기
            </button>
          ))}
      </div>
      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </div>
  );
};

export default ProfileSetting;
