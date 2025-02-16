"use client";

import Image from "next/image";
import { useState } from "react";
import searchIcon from "@/images/icon/search.svg";

interface SubSearchBarProps {
  handleSearch: (searchTerm: string) => void;
  placeholder?: string;
  className?: string;
}

/**
 *
 * @param handleSearch 검색 핸들러
 * @param placeholder
 * @param className 추가 style 코드
 * @returns
 */

const SubSearchBar = ({
  placeholder,
  handleSearch,
  className,
}: SubSearchBarProps) => {
  const [searchValue, setSearchValue] = useState<string>("");
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
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder={placeholder}
        className="flex-grow bg-background text-mobile_body2_r text-text1 md:text-body1_r focus:outline-none"
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
