"use client";

import React, { useState, useEffect } from "react";
import LargeBtn from "../../button/basicBtn/largeBtn";
import Alert from "@/components/alert/alert";
import { validateEmail } from "@/schema/email";
import { formatTime } from "@/utils/timeFormatter";
import Step1 from "./setp1";
import Step2 from "./step2";
import { sendSchoolAuthEmail, validateSchoolAuthCode } from "@/api/school/api";

interface RegistrationModalProps {
  onClose: () => void;
  onComplete: (message: string) => void;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({
  onClose,
  onComplete,
}) => {
  const [step, setStep] = useState<number>(1);
  const [timeLeft, setTimeLeft] = useState<number>(300);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [verificationFailed, setVerificationFailed] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");

  // 인증 번호 재전송
  const resetTimer = () => {
    setTimeLeft(300);
    setAlertMessage("인증번호를 전송했습니다.");
  };

  // 현재 단계 검증
  const validateCurrentStep = async () => {
    if (step === 1) {
      // 이메일 검증
      if (!email || email.trim() === "") {
        setAlertMessage("이메일을 입력해주세요.");
        return;
      }

      const emailValidationError = validateEmail(email);
      if (emailValidationError) {
        setAlertMessage(emailValidationError);
        return false; // 이메일 검증 실패 시 false 반환
      }
    } else if (step === 2) {
      try {
        await validateSchoolAuthCode(verificationCode);
        setVerificationFailed(false);
      } catch (error) {
        setVerificationFailed(true);
        setAlertMessage("인증번호가 올바르지 않습니다. 다시 확인해주세요.");
        // 인증 실패 시 false 반환
        return false;
      }
    }
    // 모든 검증이 통과하면 true 반환
    return true;
  };

  const handleNextStep = async () => {
    const isValid = await validateCurrentStep();
    if (!isValid) {
      return;
    }

    setAlertMessage(null);

    if (step === 1) {
      try {
        await sendSchoolAuthEmail(email);
        setStep(step + 1);
      } catch (error) {
        setAlertMessage(
          "학교 인증 이메일 발송에 실패했습니다. 다시 시도해주세요."
        );
      }
    } else if (step === 2) {
      onComplete("학교 인증이 완료되었습니다.");
      onClose();
      window.location.reload();
    }
  };

  // 인증 시간 카운트다운
  useEffect(() => {
    if (step === 2) {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative w-[430px] px-5 pb-9 pt-[26px] bg-background rounded-2xl z-50">
        <h1 className="text-text1 text-h1_contents_title mb-8 text-center">
          학교 등록
        </h1>
        {step === 1 && <Step1 email={email} setEmail={setEmail} />}
        {step === 2 && (
          <Step2
            email={email}
            verificationCode={verificationCode}
            setVerificationCode={setVerificationCode}
            onResend={resetTimer}
            verificationFailed={verificationFailed}
          />
        )}
        <div className="flex flex-col w-full gap-4 mt-8">
          <LargeBtn
            title={
              step === 2 ? `학교 인증하기 ${formatTime(timeLeft)}` : "다음"
            }
            onClick={handleNextStep}
          />
          <button
            onClick={onClose}
            className="text-primary text-body1_sb py-1.5"
          >
            닫기
          </button>
        </div>
        {alertMessage && (
          <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
        )}
      </div>
    </div>
  );
};

export default RegistrationModal;
