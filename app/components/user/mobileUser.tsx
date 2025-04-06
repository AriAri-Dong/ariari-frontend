"use client";

import React, { useState } from "react";
import { useUserStore } from "@/providers/user-store-provider";
import { useShallow } from "zustand/shallow";
import Image from "next/image";
import notification_default from "@/images/icon/notification_default.svg";
import notification_pressed from "@/images/icon/notification_pressed.svg";
import notification_unconfirmed from "@/images/icon/notification_unconfirmed.svg";
import login from "@/images/icon/mobile_login.svg";
import UserModal from "../modal/userModal";
import MobileNotificationModal from "../modal/notification/mobileNotificationModal";
import MobileLoginModal from "../modal/login/mobileLoginModal";

const MobileUser = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [notificationStatus, setNotificationStatus] = useState<
    "default" | "pressed" | "unconfirmed"
  >("unconfirmed");

  const isSignIn = useUserStore(useShallow((state) => state.isSignIn));

  const handleCloseModal = () => {
    setShowModal(false);
  };

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

  const handleModalOpen = () => {
    setIsOpenModal(true);
  };

  const handleLogin = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    setShowModal(true);
  };

  const handleNotificationClick = () => {
    if (notificationStatus === "unconfirmed") {
      handleModalOpen();
    }
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <Image
          src={getNotificationImage()}
          alt="notification"
          onClick={handleNotificationClick}
          className="cursor-pointer"
          height={24}
          width={24}
        />
        {isSignIn ? (
          <div
            className="rounded-full w-7 h-7 bg-[#CBCBCB] aspect-square"
            onClick={handleLogout}
          />
        ) : (
          <Image
            src={login}
            alt="login"
            height={24}
            width={24}
            className="cursor-pointer aspect-square"
            onClick={handleLogin}
          />
        )}
      </div>
      {showModal && <UserModal onClose={handleCloseModal} />}
      {isOpenModal && (
        <MobileNotificationModal
          onclose={() => {
            setIsOpenModal(false);
          }}
          target="member"
        />
      )}
      {isLoginModalOpen && (
        <>
          <MobileLoginModal onClose={handleCloseLoginModal} />
        </>
      )}
    </>
  );
};

export default MobileUser;
