"use client";

import Image from "next/image";
import send from "@/images/icon/send.svg";
import { ButtonProps } from "@/types/components/button";

const SendBtn = ({ onClick }: ButtonProps) => {
  return (
    <button
      className="flex justify-center items-center w-8 h-8 md:w-9 md:h-9
    bg-primary focus:bg-primary_hover md:hover:bg-primary_hover md:focus:bg-primary_pressed
    rounded-full  border border-menuborder cursor-pointer"
      onClick={onClick}
    >
      <Image
        src={send}
        alt={"전송"}
        width={20}
        height={20}
        className="md:w-6 md:h-6"
      />
    </button>
  );
};

export default SendBtn;
