import HomePageContent from "@/(home)/home/content/PageContent";
import { Suspense } from "react";

const Home = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePageContent />
    </Suspense>
  );
};

export default Home;
