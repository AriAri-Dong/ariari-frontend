"use client";

import React, { useState } from "react";
import { useUserStore } from "@/providers/userStoreProvider";
import { useShallow } from "zustand/shallow";
import Image from "next/image";
import notification_default from "@/images/icon/notification_default.svg";
import notification_pressed from "@/images/icon/notification_pressed.svg";
import notification_unconfirmed from "@/images/icon/notification_unconfirmed.svg";
import login from "@/images/icon/mobile_login.svg";
import UserModal from "../modal/userModal";
import MobileNotificationModal from "../modal/notification/mobileNotificationModal";
import MobileLoginModal from "../modal/login/mobileLoginModal";
import AlertWithMessage from "../alert/alertWithMessage";
import { logout } from "@/api/login/api";
import { getProfileImage } from "@/utils/profileImage";

const MobileUser = () => {
  const profileType = useUserStore((state) => state.memberData.profileType);

  const profileImageSrc = getProfileImage(profileType);

  const [isUserModalOpen, setIsUserModalOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] =
    useState<boolean>(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState<boolean>(false);
  const [notificationStatus, setNotificationStatus] = useState<
    "default" | "pressed" | "unconfirmed"
  >("unconfirmed");

  const isSignIn = useUserStore(useShallow((state) => state.isSignIn));

  // 로그아웃 실행 함수
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("로그아웃 오류:", error);
    }
  };
  // 알림 아이콘 이미지 가져오기
  const getNotificationImage = () => {
    switch (notificationStatus) {
      case "pressed":
        return notification_pressed;
      case "unconfirmed":
        return notification_unconfirmed;
      default:
        return notification_default;
    }
  };

  // 알림 아이콘 클릭 시 동작
  const handleNotificationClick = () => {
    if (notificationStatus === "unconfirmed") {
      setIsNotificationModalOpen(true);
    }
  };

  return (
    <>
      <div className="flex items-center gap-4">
        {/* 알림 아이콘 */}
        <Image
          src={getNotificationImage()}
          alt="notification"
          onClick={handleNotificationClick}
          className="cursor-pointer"
          height={24}
          width={24}
        />

        {/* 로그인 상태 여부 */}
        {isSignIn ? (
          <Image
            src={profileImageSrc}
            alt="profile"
            width={28}
            height={28}
            className="rounded-full"
            onClick={() => setIsUserModalOpen(true)}
          />
        ) : (
          <Image
            src={login}
            alt="login"
            height={24}
            width={24}
            className="cursor-pointer aspect-square"
            onClick={() => setIsLoginModalOpen(true)}
          />
        )}
      </div>

      {/* 로그아웃 확인 알림 */}
      {showLogoutAlert && (
        <AlertWithMessage
          text="로그아웃 하시겠습니까?"
          description="계정을 로그아웃하면 다시 로그인해야 합니다."
          leftBtnText="취소"
          rightBtnText="확인"
          onLeftBtnClick={() => setShowLogoutAlert(false)}
          onRightBtnClick={handleLogout}
        />
      )}

      {/* 유저 모달 */}
      {isUserModalOpen && (
        <UserModal onClose={() => setIsUserModalOpen(false)} />
      )}

      {/* 알림 모달 */}
      {isNotificationModalOpen && (
        <MobileNotificationModal
          onclose={() => setIsNotificationModalOpen(false)}
          target="member"
        />
      )}

      {/* 로그인 모달 */}
      {isLoginModalOpen && (
        <MobileLoginModal onClose={() => setIsLoginModalOpen(false)} />
      )}
    </>
  );
};

export default MobileUser;
