"use client";

import Loading from "@/components/feedback/loading";
import dynamic from "next/dynamic";

// export const metadata: Metadata = {
//   title: "합격 후기 | 지원 꿀팁을 확인하세요",
//   description: "합격자들의 생생한 준비 이야기와 합격 팁을 공유합니다.",
//   openGraph: {
//     title: "합격 후기 | 지원 꿀팁을 확인하세요",
//     description: "합격자들의 생생한 준비 이야기와 합격 팁을 공유합니다.",
//     url: "https://ariari.com/club/review/acceptance",
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
