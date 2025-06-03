import { Metadata } from "next";
import MainSection from "./content/mainSection";

export const metadata: Metadata = {
  title: "회원 약관 | 아리아리",
  description:
    "아리아리 서비스 이용을 위한 회원 가입 및 이용 약관을 확인하세요.",
  openGraph: {
    title: "회원 약관 | 아리아리",
    description:
      "아리아리 서비스 이용을 위한 회원 가입 및 이용 약관을 확인하세요.",
    url: "https://ariari.com/terms/user",
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

const TermsPage = () => {
  return <MainSection />;
};

export default TermsPage;
