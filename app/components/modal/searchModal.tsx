"use client";

import Image from "next/image";
import { useState } from "react";
import searchIcon from "@/images/icon/search.svg";
import closeIcon from "@/images/icon/close.svg";
import deleteIcon from "@/images/icon/delete.svg";

interface SearchModalProps {
  onClose: () => void;
}

const SearchModal = ({ onClose }: SearchModalProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "최근 검색어 1",
    "최근 검색어 2",
    "최근 검색어 3",
  ]);

  const handleSearch = () => {
    if (inputValue.trim()) {
      setRecentSearches([inputValue, ...recentSearches.slice(0, 4)]);
      setInputValue("");
    }
  };

  const handleRecentSearchClick = (searchTerm: string) => {
    setInputValue(searchTerm);
  };

  const handleRemoveSearchItem = (index: number) => {
    setRecentSearches(recentSearches.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-white z-50 px-4">
      <div className="flex justify-between mt-[46px] mb-4">
        <p className="text-text1 text-lg font-semibold">검색하기</p>
        <Image
          src={closeIcon}
          alt="닫기"
          width={24}
          height={24}
          onClick={onClose}
        />
      </div>
      <div className="w-full">
        <div className="relative w-full">
          <Image
            src={searchIcon}
            alt="search"
            width={20}
            height={20}
            className="absolute left-3 top-3"
          />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="어떤 동아리를 찾으시나요?"
            className="w-full pl-10 pr-3 py-3 rounded-xl bg-gray-100 text-black text-sm focus:outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
        </div>
        <div className="mt-5">
          <ul>
            {recentSearches.map((search, index) => (
              <li
                key={index}
                className="flex justify-between items-center px-3 py-[10px] space-y-2"
              >
                <span
                  className="cursor-pointer text-text1"
                  onClick={() => handleRecentSearchClick(search)}
                >
                  {search}
                </span>
                <Image
                  src={deleteIcon}
                  alt="delete"
                  width={16}
                  height={16}
                  className="cursor-pointer"
                  onClick={() => handleRemoveSearchItem(index)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
