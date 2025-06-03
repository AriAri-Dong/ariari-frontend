import MainSection from "./content/mainSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "일정 및 출석 | 활동 계획을 한눈에",
  description: "활동 일정을 확인하고 출석을 간편하게 관리하세요.",
  openGraph: {
    title: "일정 및 출석 | 활동 계획을 한눈에",
    description: "활동 일정을 확인하고 출석을 간편하게 관리하세요.",
    url: "https://ariari.com/club/event",
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

const ClubEventPage = () => {
  return <MainSection />;
};

export default ClubEventPage;
