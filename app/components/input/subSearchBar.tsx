"use client";

import Image from "next/image";
import { useState } from "react";
import searchIcon from "@/images/icon/search.svg";

interface SubSearchBarProps {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  handleSearch: (searchTerm: string) => void;
  placeholder?: string;
  className?: string;
}

/**
 *
 * @param searchTerm 검색어
 * @param setSearchTerm set검색어
 * @param handleSearch 검색 핸들러
 * @param placeholder
 * @param className 추가 style 코드
 * @returns
 */

const SubSearchBar = ({
  placeholder,
  searchTerm,
  setSearchTerm,
  handleSearch,
  className,
}: SubSearchBarProps) => {
  return (
    <div
      className={`w-full flex items-center justify-between gap-2.5 p-2.5 border border-menuborder bg-background rounded-24 focus-within:border-searchbarborder md:max-w-[728px] md:px-[22px] md:rounded-28 ${className}`}
    >
      <Image
        src={searchIcon}
        alt="search"
        width={20}
        height={20}
        className="md:w-6 md:h-6"
      />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="flex-grow bg-background text-text1 md:text-body1_r focus:outline-none"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch(e.currentTarget.value);
            e.currentTarget.blur();
          }
        }}
      />
    </div>
  );
};

export default SubSearchBar;
