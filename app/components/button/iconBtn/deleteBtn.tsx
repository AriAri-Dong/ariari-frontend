"use client";

import Image from "next/image";
import trash from "@/images/icon/delete.svg";
import { ButtonProps } from "@/types/components/button";

const DeleteBtn = ({ onClick }: ButtonProps) => {
  return (
    <button
      className="flex justify-center items-center p-0.5
    focus:bg-hover rounded-full cursor-pointer"
      onClick={onClick}
    >
      <Image src={trash} alt={"delete"} width={16} height={16} />
    </button>
  );
};

export default DeleteBtn;
