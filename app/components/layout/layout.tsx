"use client";

import React, { useEffect, useState, ReactNode } from "react";
import useResponsive from "@/hooks/useResponsive";
import { usePathname } from "next/navigation";

import SearchTermContext from "@/context/searchTermContext";
import Footer from "./footer";
import Header from "./header";
import { useAuthStore } from "@/stores/authStore";
import ProfileSettingModal from "../modal/profileSetting/profileSettingModal";
import MobileProfileSettingModal from "../modal/profileSetting/mobile/mobileProfileSettingModal";

// 최대 노출 횟수
const MAX_MODAL_COUNT_PER_SESSION = 3;

const Layout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const isMd = useResponsive("md");

  const { accessToken, oauthSignUpKey } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  useEffect(() => {
    const rawCount = sessionStorage.getItem("profileModalCount");
    const shownCount = rawCount ? parseInt(rawCount, 10) : 0;

    if (
      !accessToken &&
      oauthSignUpKey &&
      shownCount < MAX_MODAL_COUNT_PER_SESSION
    ) {
      setShowProfileModal(true);
      sessionStorage.setItem("profileModalCount", String(shownCount + 1));
    }
  }, [accessToken, oauthSignUpKey]);

  const specialPaths = [
    "/recruitment/detail",
    "/club/review",
    "/club/management/recruitment/applicationForm",
    "/club/management/recruitment/applicationStatus",
    "/club/help",
    "/club/activityHistory",
    "/club/recruitment",
    "/club/management/activity/accounting",
    "/club/management/members",
    "/club/management/close",
    "/club/withdrawal",
    "/club/event",
    "/search",
  ];
  const bgPaths = ["/application", "/help"];
  const mobileBgPaths = new Set([
    "/terms/club",
    "/terms/privacy",
    "/terms/user",
    "/user/club/create",
    "/user/userInfo",
    "/withdrawal",
    "/club/management/recruitment/create",
  ]);

  const isSpecialComponent = specialPaths.some((path) =>
    pathname.includes(path)
  );
  const isBgComponent = bgPaths.some((path) => pathname.includes(path));
  const isBgComponentOnlyMobile = mobileBgPaths.has(pathname);

  return (
    <SearchTermContext.Provider value={{ searchTerm, setSearchTerm }}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main
          className={`flex-grow flex justify-center 
            ${pathname.includes("/help") ? "" : "items-center"} 
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
        {showProfileModal &&
          (isMd ? (
            <ProfileSettingModal onClose={() => setShowProfileModal(false)} />
          ) : (
            <MobileProfileSettingModal
              onClose={() => setShowProfileModal(false)}
            />
          ))}
      </div>
    </SearchTermContext.Provider>
  );
};

export default Layout;
