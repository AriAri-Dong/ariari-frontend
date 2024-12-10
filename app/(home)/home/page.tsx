import ClubRanking from "@/pages/home/clubRanking";
import LatestRecruitment from "@/pages/home/latestRecruitment";
import PopularRecruitment from "@/pages/home/popularRecruitment";

const Home = () => {
  return (
    <div className="w-full ">
      <ClubRanking />
      <PopularRecruitment />
      <LatestRecruitment />
    </div>
  );
};

export default Home;
