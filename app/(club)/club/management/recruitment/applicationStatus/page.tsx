import MainSection from "./content/mainSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "지원자 관리 | 지원 현황을 한눈에",
  description: "지원자 정보를 확인하고 면접 및 합격 여부를 관리하세요.",
  openGraph: {
    title: "지원자 관리 | 지원 현황을 한눈에",
    description: "지원자 정보를 확인하고 면접 및 합격 여부를 관리하세요.",
    url: "https://ariari.com/club/management/recruitment/applicationStatus",
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

const ApplicationStatusPage = () => {
  return (
    <>
      <MainSection />
    </>
  );
};

export default ApplicationStatusPage;
