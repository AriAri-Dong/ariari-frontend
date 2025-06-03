import { Metadata } from "next";
import MainSection from "./content/mainSection";

export const metadata: Metadata = {
  title: "폐쇄 신청 | 동아리 운영을 종료합니다",
  description: "운영진이 동아리를 종료하고 폐쇄할 수 있는 페이지입니다.",
  openGraph: {
    title: "폐쇄 신청 | 동아리 운영을 종료합니다",
    description: "운영진이 동아리를 종료하고 폐쇄할 수 있는 페이지입니다.",
    url: "https://ariari.com/club/management/close",
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

const ClubClosePage = () => {
  return <MainSection />;
};

export default ClubClosePage;
