import { Metadata } from "next";
import MainSection from "./content/mainSection";

export const metadata: Metadata = {
  title: "탈퇴 신청 | 아리아리",
  description: "탈퇴 절차를 안내하고, 간편하게 탈퇴를 신청할 수 있습니다.",
  openGraph: {
    title: "탈퇴 신청 | 아리아리",
    description: "탈퇴 절차를 안내하고, 간편하게 탈퇴를 신청할 수 있습니다.",
    url: "https://ariari.com/club/withdrawal",
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

const ClubWithdrawalPage = () => {
  return <MainSection />;
};

export default ClubWithdrawalPage;
