import MainSection from "./content/mainSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Q&A | 아리아리",
  description: "운영에 관한 자주 묻는 질문과 직접 문의할 수 있는 공간입니다.",
  openGraph: {
    title: "Q&A | 아리아리",
    description: "운영에 관한 자주 묻는 질문과 직접 문의할 수 있는 공간입니다.",
    url: "https://ariari.com/club/help",
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

const ClubHelpPage = () => {
  return <MainSection />;
};

export default ClubHelpPage;
