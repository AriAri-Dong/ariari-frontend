import MainSection from "./content/mainSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "회원 정보 수정 | 개인정보를 안전하게 관리하세요",
  description:
    "회원 정보를 확인하고 비밀번호, 연락처 등 개인정보를 안전하게 수정할 수 있습니다.",
  openGraph: {
    title: "회원 정보 수정 | 개인정보를 안전하게 관리하세요",
    description:
      "회원 정보를 확인하고 비밀번호, 연락처 등 개인정보를 안전하게 수정할 수 있습니다.",
    url: "https://ariari.com/user/userInfo",
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
const UserInfoPage = () => {
  return <MainSection />;
};

export default UserInfoPage;
