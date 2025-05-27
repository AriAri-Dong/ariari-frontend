"use client";

import React, { useEffect, useState } from "react";
import Step0 from "./step0";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import LargeBtn from "../../button/basicBtn/largeBtn";
import Alert from "@/components/alert/alert";
import { useProfileContext } from "@/context/profileConetxt";
import { validateEmail } from "@/schema/email";
import { formatTime } from "@/utils/timeFormatter";
import {
  sendSignupSchoolAuthEmail,
  validateSchoolAuthCode,
} from "@/api/school/api";
import { useRouter } from "next/navigation";
import { signUpWithKey } from "@/api/login/api";
import { useAuthStore } from "@/stores/authStore";

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
  const router = useRouter();
  const { oauthSignUpKey, setAuth } = useAuthStore();
  const { profileData } = useProfileContext();

  const [timeLeft, setTimeLeft] = useState<number>(300); // 인증 시간 (5분)
  const [alertMessage, setAlertMessage] = useState<string | null>(null); // Alert 메시지 상태
  const [verificationFailed, setVerificationFailed] = useState(false); // Step3 인증 실패 상태

  // 인증 번호 재전송
  const resetTimer = async () => {
    try {
      await sendSignupSchoolAuthEmail(profileData.email);
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

      // 이메일 형식 확인 + 타이머
      try {
        await resetTimer();
        onNextStep(3);
      } catch (error) {
        setAlertMessage("인증 메일 발송에 실패했습니다. 다시 시도해주세요.");
      }
    } else if (step === 3) {
      const isValid = await validateCurrentStep();
      if (!isValid) return;

      try {
        if (!oauthSignUpKey) {
          setAlertMessage("인증 키가 유효하지 않습니다. 다시 로그인해주세요.");
          return;
        }
        // 회원가입
        const res = await signUpWithKey(oauthSignUpKey, {
          email: profileData.email,
          schoolAuthCode: profileData.verificationCode,
          nickName: profileData.username,
        });
        console.log("회원가입 중....");
        setAuth({
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
          oauthSignUpKey: null,
        });

        onNextStep(4);
      } catch (error) {
        setAlertMessage("회원가입에 실패했습니다. 다시 시도해주세요.");
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

  const handleSkip = async () => {
    if (!oauthSignUpKey) {
      setAlertMessage("인증 키가 유효하지 않습니다. 다시 로그인해주세요.");
      return;
    }

    try {
      const res = await signUpWithKey(oauthSignUpKey, {
        email: profileData.email,
        schoolAuthCode: profileData.verificationCode,
        nickName: profileData.username,
      });

      setAuth({
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
        oauthSignUpKey: null,
      });

      onNextStep(4);
    } catch (error) {
      setAlertMessage("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
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
