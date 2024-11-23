"use client";

import Image from "next/image";
import closeIcon from "@/images/icon/close.svg";
import deleteIcon from "@/images/icon/delete.svg";

interface RecentSearchTermDropdownProps {
  recentSearches: string[];
  onRecentSearchClick: (searchTerm: string) => void;
  onRemoveSearchItem: (index: number) => void;
}

/**
 * 최근 검색어 api 연동 후 추가 수정 필요
 * @param recentSearches 최근 검색어 목록
 * @param onRecentSearchClick 최근 검색어 클릭 핸들러
 * @param onRemoveSearchItem 최근 검색어 삭제 핸들러
 * @returns
 */
const RecentSearchTermDropdown = ({
  recentSearches,
  onRecentSearchClick,
  onRemoveSearchItem,
}: RecentSearchTermDropdownProps) => {
  return (
    <div className="absolute left-0 right-0 mt-2 bg-background rounded-xl shadow-default">
      {recentSearches.map((search, index) => (
        <div
          key={index}
          className={`flex justify-between items-center px-3 md:px-[22px] py-2.5 md:py-[14px] hover:bg-hover text-sm md:text-base cursor-pointer focus:bg-pressed 
                ${index === 0 ? "rounded-t-xl" : ""} 
                ${index === recentSearches.length - 1 ? "rounded-b-xl" : ""}`}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => onRecentSearchClick(search)}
        >
          <span>{search}</span>
          <button
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onRemoveSearchItem(index);
            }}
          >
            <div className="hidden md:block">
              <Image
                src={closeIcon}
                alt="close"
                width={20}
                height={20}
                className="md:w-6 md:h-6"
              />
            </div>
            <div className="md:hidden">
              <Image
                src={deleteIcon}
                alt="delete"
                width={20}
                height={20}
                className="md:w-6 md:h-6"
              />
            </div>
          </button>
        </div>
      ))}
    </div>
  );
};

export default RecentSearchTermDropdown;
