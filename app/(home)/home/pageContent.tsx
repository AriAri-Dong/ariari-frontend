"use client";

import { useRouter, useSearchParams } from "next/navigation";
import ProfileSettingModal from "@/components/modal/profileSetting/profileSettingModal";
import useResponsive from "@/hooks/useResponsive";
import MobileProfileSettingModal from "@/components/modal/profileSetting/mobile/mobileProfileSettingModal";
import { useEffect, useState, useCallback } from "react";
import HeaderToken from "@/api/headerToken";
import ClubRanking from "@/(home)/home/content/clubRanking";
import PopularRecruitment from "@/(home)/home/content/popularRecruitment";
import LatestRecruitment from "@/(home)/home/content/latestRecruitment";
import { useUserStore } from "@/providers/userStoreProvider";
import MobileSnackBar from "@/components/bar/mobileSnackBar";
import { getMemberData } from "@/api/member/api";

const HomePageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMdUp = useResponsive("md");
  const { setUserData } = useUserStore((state) => state);

  const [authState, setAuthState] = useState({
    isFirstLogin: false,
    isLoggedIn: false,
    isFirstLoginModalOpen: false,
  });

  const handleFirstLoginModalClose = useCallback(() => {
    setAuthState((prev) => ({ ...prev, isFirstLoginModalOpen: false }));
    router.replace("/", undefined);
  }, [router]);

  useEffect(() => {
    const initializeAuth = async () => {
      const isFirstLogin = searchParams.get("firstLogin") === "1";

      const accessToken =
        typeof window !== "undefined"
          ? sessionStorage.getItem("accessToken") || ""
          : "";

      if (accessToken) {
        HeaderToken.set(accessToken);
      }

      setAuthState((prev) => ({
        ...prev,
        isFirstLogin,
        isFirstLoginModalOpen: isFirstLogin,
      }));

      if (accessToken) {
        try {
          const userData = await getMemberData();
          if (userData) {
            setUserData(userData);
            setAuthState((prev) => ({ ...prev, isLoggedIn: true }));
            console.log("User data loaded successfully:", userData);
          }
        } catch (error) {
          console.error("Failed to load user data:", error);
        }
      }
    };

    initializeAuth();
  }, [searchParams, setUserData]);

  const { isFirstLogin, isLoggedIn, isFirstLoginModalOpen } = authState;

  return (
    <div className="w-full">
      <ClubRanking />
      <PopularRecruitment />
      <LatestRecruitment />

      {isFirstLogin && isLoggedIn && (
        <MobileSnackBar text={"로그인이 완료되었습니다."} />
      )}

      {isFirstLogin &&
        isFirstLoginModalOpen &&
        (isMdUp ? (
          <ProfileSettingModal onClose={handleFirstLoginModalClose} />
        ) : (
          <MobileProfileSettingModal onClose={handleFirstLoginModalClose} />
        ))}
    </div>
  );
};

export default HomePageContent;
