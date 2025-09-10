import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KHCLQ4RX');
          `}
        </Script>
      </head>
      <body className={pretendard.variable}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KHCLQ4RX"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <QueryClientProvider>
          <Layout>{children}</Layout>
        </QueryClientProvider>
      </body>
    </html>
  );
}
