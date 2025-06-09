"use client";

import InviteDialog from "@/components/modal/invite/inviteDialog";
import LoginModal from "@/components/modal/login/loginModal";
import MobileLoginModal from "@/components/modal/login/mobileLoginModal";
import NotiPopUp from "@/components/modal/notiPopUp";
import { useUserStore } from "@/stores/userStore";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ClubInviteHandler() {
  const searchParams = useSearchParams();
  const inviteCode = searchParams.get("inviteCode");
  const { user } = useUserStore();
  const isSignIn = !!user;

  const [showModal, setShowModal] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isLoginNotiPopUpOpen, setIsLoginNotiPopUpOpen] = useState(true);

  useEffect(() => {
    if (inviteCode) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [inviteCode]);

  const handleLoginRedirect = () => {
    setIsLoginModalOpen(true);
    setIsLoginNotiPopUpOpen(false);
  };

  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false);
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
      {showModal && inviteCode && (
        <InviteDialog
          onClose={() => setShowModal(false)}
          inviteCode={inviteCode}
        />
      )}
    </>
  );
}
