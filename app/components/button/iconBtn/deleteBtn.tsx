"use client";

import Image from "next/image";
import trash from "@/images/icon/delete.svg";
import { ButtonProps } from "@/types/components/button";

const DeleteBtn = ({ onClick, className }: ButtonProps) => {
  return (
    <button
      className={`flex justify-center items-center p-0.5
    active:bg-hover rounded-full cursor-pointer ${className}`}
      onClick={onClick}
    >
      <Image
        src={trash}
        alt={"delete"}
        width={16}
        height={16}
        className="md:w-6 md:h-6"
      />
    </button>
  );
};

export default DeleteBtn;
