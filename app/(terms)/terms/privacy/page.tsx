import { Metadata } from "next";
import MainSection from "./content/mainSection";

export const metadata: Metadata = {
  title: "개인정보처리방침 | 아리아리",
  description:
    "아리아리에서 수집되는 개인정보 처리 방침과 보호 정책을 확인하세요.",
  openGraph: {
    title: "개인정보처리방침 | 아리아리",
    description:
      "아리아리에서 수집되는 개인정보 처리 방침과 보호 정책을 확인하세요.",
    url: "https://ariari.com/terms/privacy",
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
const PrivacyPolicyPage = () => {
  return <MainSection />;
};

export default PrivacyPolicyPage;
