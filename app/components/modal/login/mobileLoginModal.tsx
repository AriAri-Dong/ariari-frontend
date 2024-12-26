"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import loginAriari from "@/images/icon/loginAriari.svg";
import kakoBtn from "@/images/kakao/complete/ko/kakao_login_large_wide.png";
import close from "@/images/icon/close.svg";

interface LoginDialogProps {
  onClose: () => void;
}

/**
 *
 * @param onClose 모달 닫힘 함수
 * @returns
 */
const MobileLoginModal = ({ onClose }: LoginDialogProps) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenHeight = () => {
      setIsSmallScreen(window.innerHeight <= 700);
    };

    checkScreenHeight();
    window.addEventListener("resize", checkScreenHeight);

    return () => {
      window.removeEventListener("resize", checkScreenHeight);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-background z-50 flex flex-col 
      items-center pt-[46px] pb-10 px-4 md:hidden"
    >
      <div className="flex flex-col flex-grow items-center w-full">
        <Image
          src={close}
          alt={"close"}
          width={24}
          height={24}
          onClick={onClose}
          className="cursor-pointer self-end"
        />
        <Image
          src={loginAriari}
          alt={"loginLogo"}
          width={220}
          className={isSmallScreen ? "mt-16" : "mt-24"}
        />
      </div>
      <h1 className="text-mobile_h1_contents_title text-text1 mb-4">로그인</h1>
      <p className="text-mobile_h4_r text-subtext1 text-center mb-8">
        동아리를 더 쉽고, 더 즐겁게! <br />
        아리아리와 함께해보세요.
      </p>
      <Image
        src={kakoBtn}
        alt={"kakao"}
        width={390}
        onClick={() => {}}
        className="cursor-pointer"
      />
    </div>
  );
};

export default MobileLoginModal;
