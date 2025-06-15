"use client";

import Loading from "@/components/feedback/loading";
import dynamic from "next/dynamic";

const AcceptanceReviewContent = dynamic(
  () => import("./acceptanceReviewContent"),
  {
    loading: () => <Loading />,
    ssr: false,
  }
);
const ReviewMainSection = () => {
  return <AcceptanceReviewContent />;
};

export default ReviewMainSection;
