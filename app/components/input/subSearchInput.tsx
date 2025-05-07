"use client";

import Image from "next/image";
import searchIcon from "@/images/icon/search.svg";

interface SubSearchInputProps {
  inputValue: string;
  onSearch: (searchTerm: string) => void;
  placeholder: string;
  className?: string;
}

/**
 * 조회 영역 검색 컴포넌트
 * @param inputValue input 입력 검색어
 * @param onSearch 검색 핸들러
 * @param placeholder
 * @param className 추가 스타일
 * @returns
 */
const SubSearchInput = ({
  inputValue,
  onSearch,
  placeholder,
  className,
}: SubSearchInputProps) => {
  return (
    <div
      className={`relative w-full bg-background focus-within:border-searchbarborder border 
        border-menuborder rounded-3xl h-[42px] md:h-[46px] md:max-w-[270px] ${className}`}
    >
      <Image
        src={searchIcon}
        alt="search"
        width={20}
        height={20}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 md:left-4 md:w-6 md:h-6"
      />
      <input
        type="text"
        value={inputValue}
        onChange={(e) => onSearch(e.target.value)}
        placeholder={placeholder || "검색어를 입력해주세요."}
        className="w-full h-full pl-10 pr-4 text-text1 text-mobile_body2_r
        md:text-body1_r focus:outline-none rounded-3xl"
      />
    </div>
  );
};

export default SubSearchInput;
