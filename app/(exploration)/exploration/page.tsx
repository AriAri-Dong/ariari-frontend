import { Metadata } from "next";
import MainSection from "./content/mainSection";

export const metadata: Metadata = {
  title: "동아리 목록 탐색 | 관심 있는 동아리를 찾아보세요",
  description:
    "다양한 분야와 성격의 동아리를 탐색하고 원하는 동아리를 쉽게 찾을 수 있습니다.",
  openGraph: {
    title: "동아리 목록 탐색 | 관심 있는 동아리를 찾아보세요",
    description:
      "다양한 분야와 성격의 동아리를 탐색하고 원하는 동아리를 쉽게 찾을 수 있습니다.",
    url: "https://ariari.com/exploration",
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

const Exploration = () => {
  return <MainSection />;
};

export default Exploration;
