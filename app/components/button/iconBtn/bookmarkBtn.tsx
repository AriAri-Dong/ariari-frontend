"use client";

import { MdBookmark } from "react-icons/md";
import { ButtonProps } from "@/types/components/button";

interface BookMartProp extends ButtonProps {
  count: number;
  isScrap: boolean;
}

const BookmarkBtn = ({ onClick, count, isScrap }: BookMartProp) => {
  return (
    <div
      className="flex justify-center items-center w-[52px] h-[52px] md:w-[60px] md:h-[60px] cursor-pointer
    bg-background focus:bg-hover md:hover:bg-hover md:focus:bg-pressed rounded-lg border border-menuborder"
      onClick={onClick}
    >
      <div className="flex flex-col items-center gap-0">
        {isScrap ? (
          <MdBookmark size={24} color="#D1F75D" />
        ) : (
          <MdBookmark size={24} color="#E3E3E3" />
        )}
        <p className="text-body4_r text-subtext2">{count}</p>
      </div>
    </div>
  );
};

export default BookmarkBtn;
