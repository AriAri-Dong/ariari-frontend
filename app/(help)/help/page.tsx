import { Metadata } from "next";
import HelpMainSection from "./content/mainSection";

export const metadata: Metadata = {
  title: "고객센터 | 아리아리 지원",
  description:
    "아리아리 이용 중 궁금한 점을 해결할 수 있는 고객센터입니다. 자주 묻는 질문, 문의 접수, 공지사항을 제공합니다.",
  openGraph: {
    title: "고객센터 | 아리아리 지원",
    description:
      "아리아리 이용 중 궁금한 점을 해결할 수 있는 고객센터입니다. 자주 묻는 질문, 문의 접수, 공지사항을 제공합니다.",
    url: "https://ariari.com/help",
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

const HelpPage = () => {
  return <HelpMainSection />;
};
export default HelpPage;
