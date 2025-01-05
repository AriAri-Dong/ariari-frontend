import React from "react";
import Image from "next/image";
import logo from "@/images/profile/logo.svg";
import kakoBtn from "@/images/kakao/complete/ko/kakao_login_large_wide.png";

interface LoginDialogProps {
  onClose: () => void;
}

/**
 *
 * @param onClose 모달 닫힘 함수
 * @returns
 */
const LoginModal = ({ onClose }: LoginDialogProps) => {
  return (
    <div className="hidden md:flex fixed inset-0 z-50 items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative justify-items-center w-[430px] px-5 pb-9 pt-[72px] bg-background rounded-2xl">
        <Image
          src={logo}
          alt={"logo"}
          width={111}
          height={124}
          className="mb-10"
        />
        <h3 className="text-text1 text-h1_contents_title mb-4">로그인</h3>
        <p className="text-subtext1 text-h4_r mb-8 text-center">
          동아리를 더 쉽고, 더 즐겁게!
          <br />
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
    </div>
  );
};

export default LoginModal;
