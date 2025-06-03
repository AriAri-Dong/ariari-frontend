import { Metadata } from "next";
import MainSection from "./content/mainSection";

export const metadata: Metadata = {
  title: "운영원칙 | 아리아리",
  description:
    "아리아리에서 제공하는 동아리 운영 관련 기본 원칙과 규정을 안내합니다.",
  openGraph: {
    title: "운영원칙 | 아리아리",
    description:
      "아리아리에서 제공하는 동아리 운영 관련 기본 원칙과 규정을 안내합니다.",
    url: "https://ariari.com/terms/club",
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

const ClubPolicyPage = () => {
  return <MainSection />;
};

export default ClubPolicyPage;
