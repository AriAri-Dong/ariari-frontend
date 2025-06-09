"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import logo from "@/images/logo/logo.svg";
import SearchInput from "../input/searchInput";
import SearchTermContext from "@/context/searchTermContext";
import User from "../user/user";
import HeaderTab from "../tab/headerTab";
import SmallBtn from "../button/basicBtn/smallBtn";
import MobileUser from "../user/mobileUser";

import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";
import Alert from "../alert/alert";
import { getUser } from "@/utils/getUser";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { setSearchTerm } = useContext(SearchTermContext);
  const hasFetchedRef = useRef(false);

  const user = useUserStore((state) => state.user);
  const hasHydrated = useUserStore((state) => state.hasHydrated);
  const clearUser = useUserStore((state) => state.clearUser);

  const accessToken = useAuthStore((state) => state.accessToken);
  const logout = useAuthStore((state) => state.logout);

  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleHomeClick = () => {
    router.push("/");
  };

  const handleButtonClick = () => {
    if (!user) {
      setAlertMessage("로그인 후 이용 가능합니다.");
      return;
    }
    router.push("/user/club/create");
  };

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const isHiddenPath = [
    "/user/myPoint",
    "/user/interestClub",
    "/user/interestRecruitment",
    "/user/userInfo",
    "/withdrawal",
    "/user/club/create",
    "/club/recruitment/create",
    "/notification",
    "/club/withdrawal",
    "/club/management/close",
    "/help",
    "/terms/user",
    "/terms/privacy",
    "/terms/club",
    "/club/management/recruitment/create",
  ].includes(pathname);

  useEffect(() => {
    if (!hasHydrated) return;

    const isLoggedIn = !!accessToken && accessToken.trim() !== "";

    if (!isLoggedIn && user) {
      clearUser();
      logout();
      localStorage.removeItem("ariari-auth");
      localStorage.removeItem("ariari-user-store");
      return;
    }

    if (isLoggedIn && !user && !hasFetchedRef.current) {
      hasFetchedRef.current = true;
      getUser();
    }
  }, [hasHydrated, accessToken, user, clearUser, logout]);

  if (!hasHydrated) return null;

  return (
    <header
      className={`w-full justify-center bg-background pt-[14px] md:pt-7 ${
        isHiddenPath ? "hidden md:flex" : "flex"
      }`}
    >
      <div className="w-full max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-lx px-4 md:px-5 space-y-8">
        <div className="flex justify-between items-center w-full">
          <Image
            src={logo}
            alt="Logo"
            width={150}
            height={38}
            onClick={handleHomeClick}
            className="hidden md:cursor-pointer md:block"
          />
          <div className="hidden md:block">
            <div className="flex gap-x-5 items-center">
              <User />
              <SmallBtn title="동아리 만들기" onClick={handleButtonClick} />
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse justify-between items-center w-full lg:flex-row">
          <HeaderTab />
          <div className="flex w-full items-center justify-between gap-4">
            <div className="flex-1 sm:w-auto md:place-items-end">
              <SearchInput onSearch={handleSearch} showRecentSearches />
            </div>
            <div className="md:hidden">
              <MobileUser />
            </div>
          </div>
        </div>
      </div>
      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </header>
  );
};

export default Header;
