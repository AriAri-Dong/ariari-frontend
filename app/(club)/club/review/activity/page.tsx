"use client";

import Loading from "@/components/feedback/loading";
import dynamic from "next/dynamic";

// export const metadata: Metadata = {
//   title: "활동 후기 | 생생한 경험을 공유해요",
//   description:
//     "멤버들이 남긴 실제 활동 후기를 통해 동아리 분위기를 알아보세요.",
//   openGraph: {
//     title: "활동 후기 | 생생한 경험을 공유해요",
//     description:
//       "멤버들이 남긴 실제 활동 후기를 통해 동아리 분위기를 알아보세요.",
//     url: "https://ariari.com/club/review/activity",
//     siteName: "아리아리",
//     images: [
//       {
//         url: "/logo.svg",
//         width: 1200,
//         height: 630,
//         alt: "아리아리",
//       },
//     ],
//     type: "website",
//   },
// };

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
