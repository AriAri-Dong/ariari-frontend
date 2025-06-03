import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { UserStoreProvider } from "@/providers/userStoreProvider";
import Layout from "@/components/layout/layout";
import QueryClientProvider from "./providers/QueryClientProvider";

const pretendard = localFont({
  src: "../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "아리아리 | 동아리 모집 및 관리 플랫폼",
  description:
    "전국 대학생과 직장인을 위한 동아리 정보를 한눈에! 간편한 모집부터 지원, 운영까지 아리아리에서 시작하세요.",
  keywords: [
    "동아리",
    "모임",
    "커뮤니티",
    "대학생 동아리",
    "직장인 동아리",
    "동아리 모집",
    "동아리 관리",
    "ariari",
  ],
  icons: {
    icon: "/ariari_logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={pretendard.variable}>
        <QueryClientProvider>
          <UserStoreProvider>
            <Layout>{children}</Layout>
          </UserStoreProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
