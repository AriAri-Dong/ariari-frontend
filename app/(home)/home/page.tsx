import ClubRanking from "./content/clubRanking";
import LatestRecruitment from "./content/latestRecruitment";
import PopularRecruitment from "./content/popularRecruitment";

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
