"use client";

import React, { useState, ReactNode } from "react";
import SearchTermContext from "@/context/searchTermContext";
import Footer from "./footer";
import Header from "./header";
import { usePathname } from "next/navigation";
import ClubInfoWrapper from "@/(club)/club/content/clubInfoWrapper";
import useResponsive from "@/hooks/useResponsive";

const Layout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const isMdUp = useResponsive("md");
  const specialPaths = [
    "/recruitment/detail",
    "/club/review",
    "/club/management/recruitment/applicationForm",
    "/club/management/recruitment/applicationStatus",
    "/club/help",
    "/club/close",
    "/club/leave",
    "/club/activityHistory",
  ];
  const bgPaths = ["/application"];
  const mobileBgPaths = ["/club/create", "/withdrawal"];
  // ClubInfo 컴포넌트 노출
  const clubDetailPaths = [
    "/club/review",
    "/club/management",
    "/club/help",
    "/club/close",
    "/club/leave",
    "/club/activityHistory",
  ];
  // Md 이상인 경우만 ClubInfo 컴포넌트 노출
  const clubDetailPathsOnlyMdUp = ["/club/withdrawal"];

  const isSpecialComponent = specialPaths.some((path) =>
    pathname.includes(path)
  );
  const isBgComponent = bgPaths.some((path) => pathname.includes(path));
  const isBgComponentOnlyMobile = mobileBgPaths.some((path) =>
    pathname.includes(path)
  );
  const isClubDetailComponent = clubDetailPaths.some((path) =>
    pathname.includes(path)
  );
  const isClubDetailOnlyMdUpComponent = clubDetailPathsOnlyMdUp.some((path) =>
    pathname.includes(path)
  );

  return (
    <SearchTermContext.Provider value={{ searchTerm, setSearchTerm }}>
      <div className="flex flex-col min-h-screen">
        <Header />
        {isClubDetailComponent && <ClubInfoWrapper />}
        {isClubDetailOnlyMdUpComponent && isMdUp && <ClubInfoWrapper />}
        <main
          className={`flex-grow flex justify-center items-center 
            ${isBgComponent && "bg-sub_bg"} 
            ${isBgComponentOnlyMobile && "md:bg-sub_bg"}`}
        >
          <div
            className={`w-full ${
              !isSpecialComponent
                ? "max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-lx px-4 md:px-5"
                : ""
            }`}
          >
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </SearchTermContext.Provider>
  );
};

export default Layout;
