"use client";

import React, { useContext, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import logo from "@/images/logo/logo.svg";
import SearchInput from "../input/searchInput";
import SearchTermContext from "@/context/searchTermContext";
import Tooltip from "../tooltip";
import User from "../user/user";
import HeaderTab from "../tab/headerTab";
import SmallBtn from "../button/basicBtn/smallBtn";
import MobileUser from "../user/mobileUser";

import { getMemberData } from "@/api/member/api";
import { useUserStore } from "@/providers/userStoreProvider";
import { useAuthStore } from "@/stores/authStore";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { setSearchTerm } = useContext(SearchTermContext);
  const { setUserData } = useUserStore((state) => state);
  const { accessToken } = useAuthStore();

  const handleHomeClick = () => {
    router.push("/");
  };

  const handleButtonClick = () => {
    router.push("/club");
  };

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    console.log("검색어 :", searchTerm);
  };

  // 모바일에서 헤더 숨김 처리
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
    const fetchUserData = async () => {
      if (!accessToken || accessToken.trim() === "") {
        console.log("비로그인 상태 → 사용자 정보 요청 생략");
        localStorage.removeItem("ariari-auth");
        localStorage.removeItem("ariari-storage");
        return;
      }

      try {
        const res = await getMemberData();
        setUserData(res);
        console.log("유저 데이터 >>", res);
      } catch (error) {
        console.error("유저 데이터 불러오기 실패:", error);
        localStorage.removeItem("ariari-auth");
        localStorage.removeItem("ariari-storage");
      }
    };

    fetchUserData();
  }, [accessToken, setUserData]);

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
            <div className="flex gap-x-5">
              <User />
              <Tooltip message="동아리 관리 버튼을 설명하는 헬프 텍스트 입니다. 000 (최대 55자)">
                <SmallBtn title={"동아리 관리"} onClick={handleButtonClick} />
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse justify-between items-center w-full lg:flex-row">
          <HeaderTab />
          <div className="flex w-full items-center justify-between gap-4">
            <div className="flex-1 sm:w-auto md:place-items-end">
              <SearchInput onSearch={handleSearch} showRecentSearches={true} />
            </div>
            <div className="md:hidden">
              <MobileUser />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
