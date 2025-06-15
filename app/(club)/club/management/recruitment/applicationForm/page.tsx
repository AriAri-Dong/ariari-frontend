import MainSection from "./content/mainSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "지원서 양식 | 아리아리",
  description: "지원서 항목을 자유롭게 설정하고 수정할 수 있습니다.",
  openGraph: {
    title: "지원서 양식 | 아리아리",
    description: "지원서 항목을 자유롭게 설정하고 수정할 수 있습니다.",
    url: "https://ariari.com/club/management/recruitment/applicationForm",
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

const ApplicationFormPage = () => {
  return (
    <>
      <MainSection />
    </>
  );
};

export default ApplicationFormPage;
