"use client";

import dynamic from "next/dynamic";
import HeaderSection from "./content/headerSection";
import Loading from "@/components/feedback/loading";

const CreateSection = dynamic(() => import("./content/createSection"), {
  ssr: false,
  loading: () => <Loading className="min-h-screen" />,
});

const RecuitmentCreatePage = () => {
  return (
    <div>
      <HeaderSection />
      <CreateSection />
    </div>
  );
};

export default RecuitmentCreatePage;
