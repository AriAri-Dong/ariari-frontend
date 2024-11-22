"use client";

import { ButtonProps } from "@/types/components/button";

const LoginBtn = ({ onClick }: ButtonProps) => {
  return (
    <button
      className="text-subtext2 hover:bg-hover focus:bg-pressed
      text-base px-7 py-4 rounded-30"
      onClick={onClick}
    >
      로그인 후 이용하기
    </button>
  );
};

export default LoginBtn;
