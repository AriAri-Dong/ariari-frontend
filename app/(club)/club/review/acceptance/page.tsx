import { Metadata } from "next";
import ReviewMainSection from "./content/mainSection";

export const metadata: Metadata = {
  title: "합격 후기 | 아리아리",
  description: "합격자들의 생생한 준비 이야기와 합격 팁을 공유합니다.",
  openGraph: {
    title: "합격 후기 | 아리아리",
    description: "합격자들의 생생한 준비 이야기와 합격 팁을 공유합니다.",
    url: "https://ariari.com/club/review/acceptance",
    siteName: "아리아리",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "아리아리",
      },
    ],
    type: "website",
  },
};

const ReviewPage = () => {
  return <ReviewMainSection />;
};

export default ReviewPage;
