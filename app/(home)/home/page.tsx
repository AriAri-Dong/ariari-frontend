"use client";

import LatestRecruitment from "./content/latestRecruitment";
import PopularRecruitment from "./content/popularRecruitment";
import { useUserStore } from "@/providers/user-store-provider";
import { useRouter, useSearchParams } from "next/navigation";
import ProfileSettingModal from "@/components/modal/profileSetting/profileSettingModal";
import useResponsive from "@/hooks/useResponsive";
import MobileProfileSettingModal from "@/components/modal/profileSetting/mobile/mobileProfileSettingModal";
import { useEffect, useState } from "react";
import { getUserData } from "@/api/apis";
import HeaderToken from "@/api/headerToken";
import ClubRanking from "@/(home)/home/content/clubRanking";
import { useShallow } from "zustand/shallow";

const Home = () => {
  const router = useRouter();
  const isMdUp = useResponsive("md");
  const searchParams = useSearchParams();
  const [firstLogin, setFirstLogin] = useState<string | null>(null);
  const { setUserData, accessToken } = useUserStore(
    useShallow((state) => ({
      setUserData: state.setUserData,
      accessToken: state.accessToken,
    }))
  );

  const [isFirstLoginModalOpen, setIsFirstLoginModalOpen] = useState(
    firstLogin === "1"
  );

  const handleFirstLoginModalClose = () => {
    setIsFirstLoginModalOpen(false);
    router.replace("/", undefined);
  };

  useEffect(() => {
    setFirstLogin(searchParams.get("firstLogin"));
  }, [searchParams]);

  useEffect(() => {
    if (!!accessToken) {
      HeaderToken.set(accessToken);
    }
    getUserData()
      .then((res) => {
        setUserData(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [accessToken, setUserData]);

  return (
    <div className="w-full ">
      <ClubRanking />
      <PopularRecruitment />
      <LatestRecruitment />
      {firstLogin &&
        isFirstLoginModalOpen &&
        (isMdUp ? (
          <ProfileSettingModal onClose={handleFirstLoginModalClose} />
        ) : (
          <MobileProfileSettingModal onClose={handleFirstLoginModalClose} />
        ))}
    </div>
  );
};

export default Home;
