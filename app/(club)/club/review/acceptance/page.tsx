"use client";

import Loading from "@/components/feedback/loading";
import dynamic from "next/dynamic";

const AcceptanceReviewContent = dynamic(
  () => import("./content/acceptanceReviewContent"),
  {
    loading: () => <Loading />,
    ssr: false,
  }
);
const ReviewPage = () => {
  return <AcceptanceReviewContent />;
};

export default ReviewPage;
