import MainSection from "./content/mainSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "공지사항 | 아리아리",
  description: "공지사항을 등록하고 멤버들에게 전달할 수 있는 공간입니다.",
  openGraph: {
    title: "공지사항 | 아리아리",
    description: "공지사항을 등록하고 멤버들에게 전달할 수 있는 공간입니다.",
    url: "https://ariari.com/club/management/activity",
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

const NoticePage = () => {
  return <MainSection />;
};

export default NoticePage;
