import MainSection from "./content/mainSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "회계 내역 | 수입과 지출을 관리하세요",
  description: "회계 내역을 확인하고 투명하게 관리할 수 있습니다.",
  openGraph: {
    title: "회계 내역 | 수입과 지출을 관리하세요",
    description: "회계 내역을 확인하고 투명하게 관리할 수 있습니다.",
    url: "https://ariari.com/club/management/activity/accounting",
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

const AccountingPage = () => {
  return <MainSection />;
};

export default AccountingPage;
