"use client";

import ClubRanking from "@/pages/home/clubRanking";
import LatestRecruitment from "./content/latestRecruitment";
import PopularRecruitment from "./content/popularRecruitment";
import { useUserStore } from "@/providers/user-store-provider";
import { useEffect } from "react";

const Home = () => {
  const { accessToken, refreshToken } = useUserStore((state) => state);

  useEffect(() => {
    console.log("accessToken", accessToken);
    console.log("refreshToken", refreshToken);
  }, [accessToken, refreshToken]);
  return (
    <div className="w-full ">
      <ClubRanking />
      <PopularRecruitment />
      <LatestRecruitment />
    </div>
  );
};

export default Home;
