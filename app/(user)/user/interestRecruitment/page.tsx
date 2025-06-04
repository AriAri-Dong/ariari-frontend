import MainSection from "./content/mainSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "관심 모집공고 | 찜한 모집 정보를 모아보세요",
  description:
    "찜한 동아리의 모집 공고를 한눈에 모아보고 쉽게 관리할 수 있습니다.",
  openGraph: {
    title: "관심 모집공고 | 찜한 모집 정보를 모아보세요",
    description:
      "찜한 동아리의 모집 공고를 한눈에 모아보고 쉽게 관리할 수 있습니다.",
    url: "https://ariari.com/user/interestRecruitment",
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

const InterestRecruitmentPage = () => {
  return <MainSection />;
};

export default InterestRecruitmentPage;
