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

interface ProfileSettingProps {
  step: number;
  onNextStep: (nextStep: number) => void;
}

/**
 *
 * @param step 단계 (1-4)
 * @param onNextStep 특정 step으로 넘어가는 함수
 * @returns
 */
const ProfileSetting = ({ step, onNextStep }: ProfileSettingProps) => {
  const { profileData } = useProfileContext();

  const [timeLeft, setTimeLeft] = useState<number>(300); // 인증 시간 (5분)
  const [alertMessage, setAlertMessage] = useState<string | null>(null); // Alert 메시지 상태
  const [verificationFailed, setVerificationFailed] = useState(false); // Step3 인증 실패 상태

  // 인증 번호 재전송
  const resetTimer = () => {
    setTimeLeft(300);
    setAlertMessage("인증번호를 전송했습니다.");
  };

  const validateCurrentStep = (): boolean => {
    if (step === 2) {
      // 이메일 검증
      const emailValidationError = validateEmail(profileData.email);
      if (emailValidationError) {
        setAlertMessage(emailValidationError);
        return false;
      }
    } else if (step === 3) {
      // 인증 번호 검증 (현재 임시 인증 번호: 123456)
      if (profileData.verificationCode !== "123456") {
        setVerificationFailed(true);
        return false;
      }
      setVerificationFailed(false);
    }
    return true;
  };

  const handleNextStep = () => {
    if (!validateCurrentStep()) {
      return;
    }

    setAlertMessage(null);
    if (step === 3) {
      // 인증 완료 시 Step4로 이동
      onNextStep(4);
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
        {step === 1 ? "프로필 생성" : "학교 등록"}
      </h1>
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
        <button
          onClick={handleSkip}
          className="text-primary text-body1_sb py-2.5"
        >
          건너뛰기
        </button>
      </div>
      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </div>
  );
};

export default ProfileSetting;
