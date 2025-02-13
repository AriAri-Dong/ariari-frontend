"use client";

import React, { useState, ReactNode } from "react";
import SearchTermContext from "@/context/searchTermContext";
import Footer from "./footer";
import Header from "./header";
import { usePathname } from "next/navigation";
import ClubInfoWrapper from "@/(club)/club/content/clubInfoWrapper";

const Layout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  const specialPaths = [
    "/recruitment/detail",
    "/club/review",
    "/club/management/recruitment/applicationForm",
    "/club/management/recruitment/applicationStatus",
    "/club/help",
    "/club/close",
    "/club/leave",
    "/club/activityHistory",
    "/club/management/activity/accounting",
  ];
  const bgPaths = ["/application", "/help"];
  const mobileBgPaths = ["/club/create", "/withdrawal"];
  const clubDetailPaths = [
    "/club/review",
    "/club/management",
    "/club/help",
    "/club/close",
    "/club/leave",
    "/club/activityHistory",
    "/club/management/members",
  ];

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

  return (
    <SearchTermContext.Provider value={{ searchTerm, setSearchTerm }}>
      <div className="flex flex-col min-h-screen">
        <Header />
        {isClubDetailComponent && <ClubInfoWrapper />}
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
