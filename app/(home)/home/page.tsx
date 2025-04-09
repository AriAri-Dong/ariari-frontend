"use client";

import Loading from "@/components/feedback/loading";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const HomePageContent = dynamic(() => import("@/(home)/home/pageContent"), {
  loading: () => <Loading />,
  ssr: false,
});
const Home = () => {
  return (
    <Suspense fallback={<Loading />}>
      <HomePageContent />
    </Suspense>
  );
};

export default Home;
