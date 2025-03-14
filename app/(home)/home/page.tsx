"use client";

import HomePageContent from "@/(home)/home/pageContent";
import Loading from "@/components/feedback/loading";
import { Suspense } from "react";

const Home = () => {
  return (
    <Suspense fallback={<Loading />}>
      <HomePageContent />
    </Suspense>
  );
};

export default Home;
