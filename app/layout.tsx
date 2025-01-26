import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { UserStoreProvider } from "@/providers/user-store-provider";
import Layout from "@/components/layout/layout";

const pretendard = localFont({
  src: "../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "Ariari",
  description: "Ariari",
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
        <UserStoreProvider>
          <Layout>{children}</Layout>
        </UserStoreProvider>
      </body>
    </html>
  );
}
