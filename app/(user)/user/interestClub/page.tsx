import MainSection from "./content/mainSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "관심 동아리 | 찜한 동아리를 확인하세요",
  description: "관심 있는 동아리를 찜해두고 언제든지 다시 확인할 수 있습니다.",
  openGraph: {
    title: "관심 동아리 | 찜한 동아리를 확인하세요",
    description:
      "관심 있는 동아리를 찜해두고 언제든지 다시 확인할 수 있습니다.",
    url: "https://ariari.com/user/interestClub",
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

const InterestClub = () => {
  return <MainSection />;
};

export default InterestClub;
