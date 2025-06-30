"use client";

import { useEffect, useState } from "react";
import InviteDialog from "@/components/modal/invite/inviteDialog";
import LoginModal from "@/components/modal/login/loginModal";
import MobileLoginModal from "@/components/modal/login/mobileLoginModal";
import NotiPopUp from "@/components/modal/notiPopUp";
import {
  useEnterClubAlarmMutation,
  useEnterClubMutation,
} from "@/hooks/club/my/useMyClubMutation";
import { useUserStore } from "@/stores/userStore";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Alert from "@/components/alert/alert";

export default function ClubInviteHandler() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const inviteCode = searchParams.get("inviteCode");
  const inviteAlarmCode = searchParams.get("inviteAlarmCode");

  const { user } = useUserStore();
  const isSignIn = !!user;

  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState<number>(1);
  const [data, setData] = useState<string | null>(null);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isLoginNotiPopUpOpen, setIsLoginNotiPopUpOpen] = useState(true);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const { mutate: enterClub } = useEnterClubMutation({
    onSuccess: (data) => {
      setData(data);
      setStep(3);
    },
    onError: (error) => {
      setAlertMessage(error.message);
    },
  });
  const { mutate: enterClubAlarm } = useEnterClubAlarmMutation({
    onSuccess: (data) => {
      setData(data);
      setStep(3);
    },
    onError: (error) => {
      setAlertMessage(error.message);
    },
  });

  // 초대
  const handleSubmit = (nickname: string) => {
    if (!nickname) {
      setAlertMessage("닉네임을 입력하세요");
    }

    if (inviteCode) {
      // 링크 초대
      enterClub({ inviteKey: inviteCode, name: nickname });
    } else if (inviteAlarmCode) {
      //회원 개별 초대 (알림)
      const decoded = decodeURIComponent(inviteAlarmCode ?? "");
      const [code, clubId] = decoded.split(/\|(?=[^|]*$)/).map((s) => s.trim());

      enterClubAlarm({
        inviteAlarmCode: code,
        name: nickname,
        clubId: clubId,
      });
    }
  };

  // 초대코드가 있으면 모달 open
  useEffect(() => {
    if (inviteCode || inviteAlarmCode) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [inviteCode, inviteAlarmCode]);

  // 로그인 관련 로직
  const handleLoginRedirect = () => {
    setIsLoginModalOpen(true);
    setIsLoginNotiPopUpOpen(false);
  };

  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false);
  };
  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const handleClose = () => {
    if (inviteCode || inviteAlarmCode) {
      const urlParams = new URLSearchParams(window.location.search);

      // inviteCode와 inviteAlarmCode 파라미터 제거
      if (inviteCode) urlParams.delete("inviteCode");
      if (inviteAlarmCode) urlParams.delete("inviteAlarmCode");

      router.replace(`${pathname}?${urlParams.toString()}`, {
        scroll: false,
      });
    }
    setShowModal(false);
  };

  if (!isSignIn && showModal) {
    return (
      <>
        {isLoginNotiPopUpOpen ? (
          <NotiPopUp
            onClose={() => setIsLoginNotiPopUpOpen(false)}
            icon="login"
            title="로그인이 필요한 서비스입니다."
            description={`로그인 후 동아리에 가입할 수 있어요.`}
            firstButton={handleLoginRedirect}
            firstButtonText="로그인 후 이용하기"
            secondButton={() => setIsLoginNotiPopUpOpen(false)}
            secondButtonText="다음에 할게요"
            modalType="button"
          />
        ) : null}
        {isLoginModalOpen && (
          <>
            <LoginModal onClose={handleLoginModalClose} />
            <MobileLoginModal onClose={handleLoginModalClose} />
          </>
        )}
      </>
    );
  }

  return (
    <>
      {showModal && (inviteCode || inviteAlarmCode) && (
        <InviteDialog
          clubName={data}
          step={step}
          onClose={handleClose}
          handleSubmit={handleSubmit}
          handleNextStep={handleNextStep}
        />
      )}
      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </>
  );
}
