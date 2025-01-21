"use client";

import Image from "next/image";
import invitation from "@/images/icon/invitation.svg";
import { ButtonProps } from "@/types/components/button";

const InvitationBtn = ({ onClick, className }: ButtonProps) => {
  return (
    <button
      className={`flex justify-center items-center p-[3px] border border-menuborder
    bg-background focus:bg-hover rounded-full cursor-pointer md:p-2.5 ${className}`}
      onClick={onClick}
    >
      <Image
        src={invitation}
        alt={"invitation"}
        width={20}
        height={20}
        className="md:w-6 md:h-6"
      />
    </button>
  );
};

export default InvitationBtn;
