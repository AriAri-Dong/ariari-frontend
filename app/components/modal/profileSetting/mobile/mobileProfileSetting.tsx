"use client";

import React, { useEffect, useState } from "react";
import LargeBtn from "@/components/button/basicBtn/largeBtn";
import backVector from "@/images/icon/backVector.svg";
import Image from "next/image";
import Alert from "@/components/alert/alert";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import { validateEmail } from "@/schema/email";
import { useProfileContext } from "@/context/profileConetxt";

interface ProfileSettingProps {
  step: number;
  onNextStep: (nextStep: number) => void;
  onClose: () => void;
}

/**
 *
 * @param step 단계 (1-4)
 * @param onNextStep 특정 step으로 넘어가는 함수
 * @returns
 */
const MobileProfileSetting = ({
  step,
  onNextStep,
  onClose,
}: ProfileSettingProps) => {
  const { profileData } = useProfileContext();

  const [timeLeft, setTimeLeft] = useState<number>(300);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [verificationFailed, setVerificationFailed] = useState<boolean>(false);

  // 인증 번호 재전송
  const resetTimer = () => {
    setTimeLeft(300);
    setAlertMessage("인증번호를 전송했습니다.");
  };

  const handleSkip = () => {
    onClose();
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
    onNextStep(step + 1);
  };

  const handleBack = () => {};

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

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

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
          />
          <h1 className="flex-1 text-center text-text1 text-mobile_h1_contents_title mr-6">
            {step === 1 ? "프로필 생성" : "학교 등록"}
          </h1>
        </div>
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
        <button
          onClick={handleSkip}
          className="text-primary text-mobile_body2_sb py-2.5"
        >
          건너뛰기
        </button>
        {alertMessage && (
          <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
        )}
      </div>
    </div>
  );
};

export default MobileProfileSetting;
