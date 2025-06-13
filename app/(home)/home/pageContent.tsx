"use client";

import ClubRanking from "@/(home)/home/content/clubRanking";
import PopularRecruitment from "@/(home)/home/content/popularRecruitment";
import LatestRecruitment from "@/(home)/home/content/latestRecruitment";
import MyClub from "./content/myClub";
import ClubInviteHandler from "./content/clubInviteHandler";
import { useUserStore } from "@/stores/userStore";

const HomePageContent = () => {
  const isSignIn = useUserStore((state) => !!state.user);

  return (
    <div className="w-full">
      {isSignIn && <MyClub />}
      <ClubRanking />
      <PopularRecruitment />
      <LatestRecruitment />
    </div>
  );
};

export default HomePageContent;
