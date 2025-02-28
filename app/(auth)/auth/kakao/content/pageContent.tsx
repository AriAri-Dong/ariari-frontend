"use client";

import { useRouter, useSearchParams } from "next/navigation";
import ProfileSettingModal from "@/components/modal/profileSetting/profileSettingModal";
import useResponsive from "@/hooks/useResponsive";
import MobileProfileSettingModal from "@/components/modal/profileSetting/mobile/mobileProfileSettingModal";
import { useEffect, useState } from "react";
import ClubRanking from "@/(home)/home/content/clubRanking";
import PopularRecruitment from "@/(home)/home/content/popularRecruitment";
import LatestRecruitment from "@/(home)/home/content/latestRecruitment";
import { useUserStore } from "@/providers/user-store-provider";
import { getMemberData } from "@/api/member/api";

const HomePageContent = () => {
  const router = useRouter();
  const isMdUp = useResponsive("md");
  const searchParams = useSearchParams();
  const [isFirstLogin, setIsFirstLogin] = useState<string | null>(null);
  const [isFirstLoginModalOpen, setIsFirstLoginModalOpen] =
    useState<boolean>(false);

  const { setUserData } = useUserStore((state) => state);

  const handleFirstLoginModalClose = () => {
    setIsFirstLoginModalOpen(false);
    router.replace("/", undefined);
  };

  useEffect(() => {
    const searchParamFirstLogin = searchParams.get("firstLogin");
    setIsFirstLogin(searchParamFirstLogin);
    setIsFirstLoginModalOpen(searchParamFirstLogin === "1");

    // 유저 정보 가져와서 상태 업데이트
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
  }, [searchParams, setUserData]);

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
