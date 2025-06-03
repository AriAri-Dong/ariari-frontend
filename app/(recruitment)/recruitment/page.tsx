import { Metadata } from "next";
import MainSection from "./content/mainSection";

export const metadata: Metadata = {
  title: "동아리 모집 | 새로운 시작을 함께할 동료를 찾으세요",
  description:
    "다양한 분야의 동아리 모집 공고를 확인하고 관심 있는 동아리에 지금 지원하세요. 대학생과 직장인 모두 환영합니다.",
  openGraph: {
    title: "동아리 모집 | 새로운 시작을 함께할 동료를 찾으세요",
    description:
      "다양한 분야의 동아리 모집 공고를 확인하고 관심 있는 동아리에 지원해보세요!",
    url: "https://ariari.com/recruitment",
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

const Recruitment = () => {
  return <MainSection />;
};

export default Recruitment;
