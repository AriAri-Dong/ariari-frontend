"use client";

import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/images/logo/logo.svg";
import SearchInput from "../input/searchInput";
import SearchTermContext from "@/context/searchTermContext";
import Tooltip from "../tooltip";
import User from "../user/user";
import HeaderTab from "../tab/headerTab";
import SmallButton from "../button/smallButton";
import MobileUser from "../user/mobileUser";

const Header = () => {
  const router = useRouter();
  const { setSearchTerm } = useContext(SearchTermContext);

  const handleHomeClick = () => {
    router.push("/");
  };

  const handleButtonClick = () => {
    router.push("/management");
  };

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    console.log("검색어 :", searchTerm);
  };

  return (
    <header className="w-full flex justify-center bg-background pt-[14px] md:pt-7">
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
            <div className="flex space-x-5">
              <User />
              <Tooltip message="동아리 관리 버튼을 설명하는 헬프 텍스트 입니다. 000 (최대 55자)">
                <SmallButton
                  title={"동아리 관리"}
                  onClick={handleButtonClick}
                />
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
