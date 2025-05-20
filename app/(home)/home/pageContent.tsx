"use client";

import { useEffect } from "react";
import { getMemberData } from "@/api/member/api";
import { useUserStore } from "@/providers/userStoreProvider";
import { useAuthStore } from "@/stores/authStore";
import ClubRanking from "@/(home)/home/content/clubRanking";
import PopularRecruitment from "@/(home)/home/content/popularRecruitment";
import LatestRecruitment from "@/(home)/home/content/latestRecruitment";

const HomePageContent = () => {
  const { setUserData } = useUserStore((state) => state);
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!accessToken || accessToken === "null" || accessToken.trim() === "") {
        return;
      }

      try {
        const userData = await getMemberData();
        if (userData) {
          setUserData(userData);
        }
      } catch (error) {
        console.error("유저 데이터 로딩 실패:", error);
      }
    };

    fetchUserData();
  }, [accessToken, setUserData]);

  return (
    <div className="w-full">
      <ClubRanking />
      <PopularRecruitment />
      <LatestRecruitment />
    </div>
  );
};

export default HomePageContent;
