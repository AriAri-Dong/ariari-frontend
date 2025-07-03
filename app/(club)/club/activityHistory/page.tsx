import MainSection from "./content/mainSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "활동 내역 | 아리아리",
  description: "활동 사진과 후기를 통해 실제 활동 모습을 생생하게 확인하세요.",
  openGraph: {
    title: "활동 내역 | 아리아리",
    description:
      "활동 사진과 후기를 통해 실제 활동 모습을 생생하게 확인하세요.",
    url: "https://ariari.com/club/activityHistory",
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
const ActivityHistoryPage = () => {
  return <MainSection />;
};

export default ActivityHistoryPage;
