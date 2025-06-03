import { Metadata } from "next";
import MainSection from "./content/mainSection";

export const metadata: Metadata = {
  title: "동아리 생성 | 새로운 동아리를 시작하세요",
  description: "새로운 동아리를 생성하고 활동을 시작할 수 있는 페이지입니다.",
  openGraph: {
    title: "동아리 생성 | 새로운 동아리를 시작하세요",
    description: "새로운 동아리를 생성하고 활동을 시작할 수 있는 페이지입니다.",
    url: "https://ariari.com/club/management/recruitment/create",
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

const RecuitmentCreatePage = () => {
  return <MainSection />;
};

export default RecuitmentCreatePage;
