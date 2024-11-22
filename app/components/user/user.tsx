"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import arrow from "@/images/icon/arrow.svg";
import UserDropdown from "../dropdown/userDropdown";
import { USER_MENU } from "@/data/header";
import  LoginBtn from "../button/basicBtn/loginBtn";
import Notification from "../button/iconBtn/notification";

const User = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("Suyoooi");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUsername("Suyoooi");
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
          <Notification size={"small"} onClick={() => {}} />
          <button
            className="relative flex items-center space-x-2 p-2 text-subtext2 cursor-pointer rounded-[30px]
            hover:bg-hover focus:bg-pressed"
            onClick={toggleDropdown}
          >
            <div className="rounded-full w-10 h-10 bg-[#CBCBCB]" />
            <span className="text-sub∆text2 text-base">{username}님</span>
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
        <LoginBtn onClick={handleLogin} />
      )}
    </>
  );
};

export default User;
