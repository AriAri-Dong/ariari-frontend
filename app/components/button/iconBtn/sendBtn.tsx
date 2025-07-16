"use client";

import Image from "next/image";
import send from "@/images/icon/send.svg";
import { ButtonProps } from "@/types/components/button";

interface SendBtnProps extends ButtonProps {
  disabled?: boolean;
}

const SendBtn = ({ onClick, disabled = false }: SendBtnProps) => {
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`
        flex justify-center items-center w-8 h-8 md:w-9 md:h-9
        rounded-full border border-menuborder
        ${disabled ? "bg-gray-200 opacity-50" : "bg-primary cursor-pointer"}
        ${
          !disabled &&
          "active:bg-primary_hover md:hover:bg-primary_hover md:active:bg-primary_pressed"
        }
      `}
    >
      <Image
        src={send}
        alt="전송"
        width={20}
        height={20}
        className="md:w-6 md:h-6"
      />
    </button>
  );
};

export default SendBtn;
