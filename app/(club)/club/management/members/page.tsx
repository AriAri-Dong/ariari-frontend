import { Metadata } from "next";
import ClubMemberMainSection from "./content/mainSection";

export const metadata: Metadata = {
  title: "멤버 관리 | 아리아리",
  description: "멤버 목록을 조회하고 권한 수정 및 멤버 초대를 할 수 있습니다.",
  openGraph: {
    title: "멤버 관리 | 아리아리",
    description:
      "멤버 목록을 조회하고 권한 수정 및 멤버 초대를 할 수 있습니다.",
    url: "https://ariari.com/club/management/members",
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

const ClubMemberPage = () => {
  return <ClubMemberMainSection />;
};

export default ClubMemberPage;
