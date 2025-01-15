"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import arrow from "@/images/icon/arrow.svg";
import UserDropdown from "../dropdown/userDropdown";
import { USER_MENU } from "@/data/header";
import LoginBtn from "../button/basicBtn/loginBtn";
import Notification from "../button/iconBtn/notification";
import rabbit from "@/images/profile/rabbit.svg";
import NotificationModal from "../modal/notification/notificationModal";
import LoginModal from "../modal/login/loginModal";
import MobileLoginModal from "../modal/login/mobileLoginModal";

const User = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("백설공주");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleCloseModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
    //setIsLoggedIn(true);
    //setUsername("백설공주");
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
        <div className="relative flex items-center space-x-5" ref={dropdownRef}>
          <NotificationModal>
            <Notification size={"small"} onClick={() => {}} />
          </NotificationModal>
          <button
            className="relative flex items-center space-x-2 p-2 text-subtext2 cursor-pointer rounded-[30px]
            hover:bg-hover focus:bg-pressed"
            onClick={toggleDropdown}
          >
            <Image src={rabbit} alt={"profile"} width={40} height={40} />
            <span className="text-subtext2 text-base">{username}님</span>
            <Image src={arrow} alt="arrow" className="pr-2" />
          </button>
          {isDropdownOpen && (
            <UserDropdown
              optionData={USER_MENU}
              onClose={() => setIsDropdownOpen(false)}
            />
          )}
        </div>
      ) : (
        <>
          <LoginBtn onClick={handleLoginClick} />
          {isLoginModalOpen && (
            <>
              <LoginModal onClose={handleCloseModal} />
              <MobileLoginModal onClose={handleCloseModal} />
            </>
          )}
        </>
      )}
    </>
  );
};

export default User;
