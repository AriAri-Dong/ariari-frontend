"use client";

import Image from "next/image";
import search from "@/images/icon/search.svg";
import { ButtonProps } from "@/types/components/button";

const SearchBtn = ({ onClick }: ButtonProps) => {
  return (
    <button
      className="flex justify-center items-center p-[10px] border border-menuborder
    bg-background focus:bg-hover md:hover:bg-hover md:focus:bg-pressed rounded-full cursor-pointer"
      onClick={onClick}
    >
      <Image src={search} alt={"vector"} width={24} height={24} />
    </button>
  );
};

export default SearchBtn;
