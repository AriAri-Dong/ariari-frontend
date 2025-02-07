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

const Home = () => {
  const router = useRouter();
  const isMdUp = useResponsive("md");
  const searchParams = useSearchParams();
  const firstLogin = searchParams.get("firstLogin");
  const { setUserData, accessToken, memberData } = useUserStore(
    (state) => state
  );

  const [isFirstLoginModalOpen, setIsFirstLoginModalOpen] = useState(
    firstLogin === "1"
  );

  const handleFirstLoginModalClose = () => {
    setIsFirstLoginModalOpen(false);
    router.replace("/", undefined);
  };

  useEffect(() => {
    if (!!accessToken) {
      HeaderToken.set(accessToken);
    }
    getUserData().then((res) => {
      setUserData(res);
    });
  }, [accessToken, setUserData]);

  useEffect(() => {
    console.log("----------------- memberData");
    console.log(memberData);
  }, [memberData]);

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
