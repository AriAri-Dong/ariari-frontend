"use client";

import dynamic from "next/dynamic";
import Loading from "@/components/feedback/loading";
import HeaderSection from "./headerSection";

const CreateSection = dynamic(() => import("./createSection"), {
  ssr: false,
  loading: () => <Loading className="min-h-screen" />,
});

const MainSection = () => {
  return (
    <div>
      <HeaderSection />
      <CreateSection />
    </div>
  );
};

export default MainSection;
