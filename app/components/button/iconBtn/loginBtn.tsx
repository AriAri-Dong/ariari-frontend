"use client";

import Image from "next/image";
import login from "@/images/icon/mobile_login.svg";
import { ButtonProps } from "@/types/components/button";

const LoginBtn = ({ onClick }: ButtonProps) => {
  return (
    <button
      className="flex justify-center items-center p-0.5
     focus:bg-hover rounded-full cursor-pointer"
      onClick={onClick}
    >
      <Image src={login} alt={"login"} width={24} height={24} />
    </button>
  );
};

export default LoginBtn;
