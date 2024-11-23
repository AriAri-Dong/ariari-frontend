"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "@/images/logo/logo.svg";
import instagram from "@/images/icon/instagram.svg";

const Footer = () => {
  const router = useRouter();

  const LINKS = [
    { text: "개인정보처리방침", href: "/privacyPolicy" },
    { text: "회원약관", href: "/terms" },
    { text: "고객센터", href: "/support" },
  ];

  return (
    <footer className="w-full flex justify-center shadow-border bg-white pt-3.5 pb-[28px] md:pt-[68px] md:pb-[92px]">
      <div className="w-full max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-lx px-4 md:px-5 flex flex-col items-center">
        <div className="flex justify-between items-center w-full">
          <Image
            src={logo}
            alt="Logo"
            width={120}
            height={30}
            className="md:w-[205px] md:h-[52px]"
          />
          <Image
            src={instagram}
            alt="instagram"
            width={28}
            height={28}
            onClick={() => router.push("https://instagram.com")}
            className="cursor-pointer md:w-[44px] md:h-[44px]"
          />
        </div>
        <div className="flex flex-col w-full space-y-3.5 mt-6 md:flex-row md:justify-between md:items-center">
          <div className="flex space-x-12 text-xs text-unselected font-medium md:text-15">
            {LINKS.map((link, index) => (
              <p
                key={index}
                onClick={() => router.push(link.href)}
                className="cursor-pointer hover:underline"
              >
                {link.text}
              </p>
            ))}
          </div>
          <div className="flex flex-row text-xs text-subtext2 tmd:ext-15 md:space-x-[19px] font-medium">
            <p>서비스 문의 메일</p>
            <p>ariari2024.official@gmail.com</p>
          </div>
        </div>
        <div className="flex justify-between items-center w-full mt-6">
          <p className="text-subtext2 text-xs md:text-sm">
            © 2024 Ariari. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
