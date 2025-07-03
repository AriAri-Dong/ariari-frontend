import type { Metadata } from "next";
import Head from "next/head";
import localFont from "next/font/local";
import "./globals.css";

import Layout from "@/components/layout/layout";
import QueryClientProvider from "./providers/QueryClientProvider";

const pretendard = localFont({
  src: "../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ariari.kr"),
  title: "아리아리",
  description:
    "전국 대학생과 직장인을 위한 동아리 정보를 한눈에! 간편한 모집부터 지원, 운영까지 아리아리에서 시작하세요.",
  keywords: ["동아리", "모임", "직장인 동아리", "ariari"],
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
      <Head>
        <meta
          name="naver-site-verification"
          content="0917375535b924eb154f8dcb0dd0e3b240e49bc9"
        />
      </Head>
      <body className={pretendard.variable}>
        <QueryClientProvider>
          <Layout>{children}</Layout>
        </QueryClientProvider>
      </body>
    </html>
  );
}
