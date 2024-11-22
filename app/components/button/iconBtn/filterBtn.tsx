"use client";

import Image from "next/image";
import filter from "@/images/icon/filter.svg";
import { ButtonProps } from "@/types/components/button";

const FilterBtn = ({ onClick }: ButtonProps) => {
  return (
    <button
      className="flex justify-center items-center p-[3px] border border-menuborder
    bg-background focus:bg-hover rounded-full cursor-pointer"
      onClick={onClick}
    >
      <Image src={filter} alt={"filter"} width={20} height={20} />
    </button>
  );
};

export default FilterBtn;
