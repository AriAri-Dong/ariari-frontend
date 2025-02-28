"use client";

import { useRouter, useSearchParams } from "next/navigation";
import ProfileSettingModal from "@/components/modal/profileSetting/profileSettingModal";
import useResponsive from "@/hooks/useResponsive";
import MobileProfileSettingModal from "@/components/modal/profileSetting/mobile/mobileProfileSettingModal";
import { useEffect, useState } from "react";
import HeaderToken from "@/api/headerToken";
import ClubRanking from "@/(home)/home/content/clubRanking";
import PopularRecruitment from "@/(home)/home/content/popularRecruitment";
import LatestRecruitment from "@/(home)/home/content/latestRecruitment";
import { getMemberData } from "@/api/member/api";
import { useUserStore } from "@/providers/user-store-provider";

const HomePageContent = () => {
  const router = useRouter();
  const isMdUp = useResponsive("md");
  const searchParams = useSearchParams();
  const [isFirstLogin, setIsFirstLogin] = useState<string | null>(null);
  const { setUserData } = useUserStore((state) => state);

  // Check for the window object to ensure code runs only on the client-side
  const accessToken =
    typeof window !== "undefined"
      ? sessionStorage.getItem("accessToken") || ""
      : "";

  const [isFirstLoginModalOpen, setIsFirstLoginModalOpen] =
    useState<boolean>(false);

  const handleFirstLoginModalClose = () => {
    setIsFirstLoginModalOpen(false);
    router.replace("/", undefined);
  };

  useEffect(() => {
    const searchParamFirstLogin = searchParams.get("firstLogin");
    setIsFirstLogin(searchParamFirstLogin);
    setIsFirstLoginModalOpen(searchParamFirstLogin === "1");
  }, [searchParams]);

  useEffect(() => {
    if (accessToken) {
      HeaderToken.set(accessToken);
    }
  }, [accessToken]);

  useEffect(() => {
    // Fetch user data and update state
    (async () => {
      try {
        const res = await getMemberData();
        if (res) {
          setUserData(res);
          console.log("유저 정보 불러오기 성공:", res);
        }
      } catch (error) {
        console.error("유저 정보 불러오기 실패:", error);
      }
    })();
  }, [setUserData]);

  return (
    <div className="w-full ">
      <ClubRanking />
      <PopularRecruitment />
      <LatestRecruitment />
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
