"use client";

import Loading from "@/components/feedback/loading";
import dynamic from "next/dynamic";

const ClubActivityReviewContent = dynamic(
  () => import("./clubActivityReviewContent"),
  {
    loading: () => <Loading />,
    ssr: false,
  }
);
const ReviewMainSection = () => {
  return <ClubActivityReviewContent />;
};

export default ReviewMainSection;
