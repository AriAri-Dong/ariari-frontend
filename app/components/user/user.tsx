"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import arrow from "@/images/icon/arrow.svg";
import UserDropdown from "../dropdown/userDropdown";
import { USER_MENU } from "@/data/header";
import LoginBtn from "../button/basicBtn/loginBtn";
import Notification from "../button/iconBtn/notification";
import NotificationModal from "../modal/notification/notificationModal";
import LoginModal from "../modal/login/loginModal";
import { getProfileImage } from "@/utils/profileImage";
import { useUserStore } from "@/stores/userStore";
import { logout } from "@/api/login/api";
import AlertWithMessage from "../alert/alertWithMessage";

const User = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const user = useUserStore((state) => state.user);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState<boolean>(false);

  const nickname = user?.memberData.nickname ?? "";
  const profileType = user?.memberData?.profileType ?? null;
  const isLoggedIn = !!user && nickname !== "";

  const profileImageSrc = getProfileImage(profileType);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleCloseModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("로그아웃 오류:", error);
    }
    setShowLogoutAlert(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {isLoggedIn ? (
        // 로그인 상태일 때
        <div className="relative flex items-center space-x-5" ref={dropdownRef}>
          {/* 알림 버튼 (모달 포함) */}
          <NotificationModal>
            <Notification size={"large"} onClick={() => {}} />
          </NotificationModal>

          {/* 프로필 및 닉네임 표시 (드롭다운 토글 버튼) */}
          <button
            className="relative flex items-center space-x-2 p-2 text-subtext2 cursor-pointer rounded-[30px]
            hover:bg-hover active:bg-pressed"
            onClick={toggleDropdown}
          >
            <Image src={profileImageSrc} alt="profile" width={40} height={40} />
            <span className="text-subtext2 text-base">{nickname}님</span>
            <Image src={arrow} alt="arrow" className="pr-2" />
          </button>

          {/* 유저 드롭다운 메뉴 (활성화 시 표시) */}
          {isDropdownOpen && (
            <div className="absolute left-1/2 top-[60px] transform -translate-x-1/2 z-50">
              <UserDropdown
                optionData={USER_MENU}
                onClose={() => setIsDropdownOpen(false)}
                onClickLogout={() => setShowLogoutAlert(true)}
              />
            </div>
          )}
        </div>
      ) : (
        // 로그아웃 상태일 때
        <>
          {/* 로그인 버튼 */}
          <LoginBtn onClick={handleLoginClick} />
          {/* 로그인 모달 (활성화 시 표시) */}
          {isLoginModalOpen && <LoginModal onClose={handleCloseModal} />}
        </>
      )}
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
    </>
  );
};

export default User;
