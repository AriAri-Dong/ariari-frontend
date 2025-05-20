"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import searchIcon from "@/images/icon/search.svg";
import RecentSearchTermDropdown from "../dropdown/recentSearchTermDropdown";
import SearchModal from "../modal/searchModal";
import { useRouter } from "next/navigation";

interface SearchInputProps {
  onSearch: (searchTerm: string) => void;
  className?: string;
  showRecentSearches?: boolean;
}

/**
 *
 * @param onSearch 검색 핸들러
 * @param className 추가 style 코드
 * @param showRecentSearches 최근 검색어 표출 여부
 * @returns
 */
const SearchInput = ({
  onSearch,
  className,
  showRecentSearches,
}: SearchInputProps) => {
  const LOCAL_STORAGE_KEY = "ariari-recent-searches";

  const router = useRouter();

  const [inputValue, setInputValue] = useState<string>("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);

  // query 파라미터 수동으로 가져오기
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const queryParam = params.get("query");
      if (queryParam) setInputValue(queryParam);
    }
  }, []);

  // 일단 클라이언트에서 저장 (api 없음)
  const saveRecentSearch = (term: string) => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];

    // 중복 제거 + 앞에 추가 + 최대 5개
    const newList = [
      term,
      ...parsed.filter((item: string) => item !== term),
    ].slice(0, 5);

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newList));
    setRecentSearches(newList);
  };

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleFocus = () => {
    if (window.innerWidth < 768) {
      setShowModal(true);
    } else {
      setIsFocused(true);
    }
  };

  const handleSearch = () => {
    if (inputValue.trim()) {
      onSearch(inputValue);
      saveRecentSearch(inputValue);
      setRecentSearches([inputValue, ...recentSearches.slice(0, 4)]);
      router.push(`/search?query=${encodeURIComponent(inputValue)}`);
      setIsFocused(false);
    }
  };

  const handleRecentSearchClick = (searchTerm: string) => {
    setInputValue(searchTerm);
    onSearch(searchTerm);
    router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
    setIsFocused(false);
  };

  const handleRemoveSearchItem = (index: number) => {
    const updated = recentSearches.filter((_, i) => i !== index);
    setRecentSearches(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  useEffect(() => {
    const clickSearch = () => {
      if (window.innerWidth < 768) {
        setShowDropdown(false);
      } else {
        setShowDropdown(true);
      }
    };

    clickSearch();
    window.addEventListener("resize", clickSearch);

    return () => {
      window.removeEventListener("resize", clickSearch);
    };
  }, []);

  return (
    <div
      className={`relative w-full focus-within:border-searchbar border border border-transparent rounded-xl md:mb-[26px] lg:max-w-[564px] lg:mb-[13px]`}
    >
      <Image
        src={searchIcon}
        alt="search"
        width={20}
        height={20}
        className="absolute left-2.5 top-2.5 md:left-4 md:top-[13px] md:w-6 md:h-6"
      />
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="어떤 동아리를 찾으시나요?"
        className="w-full pl-10 pr-3 py-[11px] md:pl-[46px] md:pr-[22px] md:py-[13px] rounded-xl bg-searchbar text-text1 text-13 md:text-base focus:outline-none"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        onFocus={handleFocus}
        onBlur={() => setIsFocused(false)}
      />
      {showRecentSearches &&
        showDropdown &&
        isFocused &&
        recentSearches.length > 0 && (
          <RecentSearchTermDropdown
            recentSearches={recentSearches}
            onRecentSearchClick={handleRecentSearchClick}
            onRemoveSearchItem={handleRemoveSearchItem}
          />
        )}
      {!showDropdown && showModal && <SearchModal onClose={handleCloseModal} />}
    </div>
  );
};

export default SearchInput;
