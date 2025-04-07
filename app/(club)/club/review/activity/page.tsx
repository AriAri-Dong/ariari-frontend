"use client";

import Loading from "@/components/feedback/loading";
import dynamic from "next/dynamic";

const ClubActivityReviewContent = dynamic(
  () => import("./content/clubActivityReviewContent"),
  {
    loading: () => <Loading />,
    ssr: false,
  }
);
const ReviewPage = () => {
  return <ClubActivityReviewContent />;
};

export default ReviewPage;
