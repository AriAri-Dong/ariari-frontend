"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import useResponsive from "../../../hooks/useResponsive";

import Image from "next/image";
import keyboardArrowDown from "@/images/icon/arrow.svg";
import keyboardArrowUp from "@/images/icon/arrow-up.svg";
import SingleSelectOptions from "./singleSelectOptions";
import BottomSheet from "./bottomSheet";
import { OptionType } from "@/types/components/pulldown";

interface TokenPullDownProps {
  optionData: OptionType[];
  selectedOption: string;
  handleOption: (label: string) => void;
  ImageTokenComponent: ReactNode;
}

/**
 *
 * @param optionData 드롭다운에 표시될 옵션 데이터의 배열.
 * @param selectedOption 선택된 옵션
 * @param handleOption 옵션을 선택 핸들러
 * @param ImageTokenComponent 선택된 항목으로 보여질 토큰 컴포넌트
 */

const TokenPullDown = ({
  optionData,
  selectedOption,
  handleOption,
  ImageTokenComponent,
}: TokenPullDownProps) => {
  const tokenPullDownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const isTabOver = useResponsive("md");

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => {
      const nextState = !prev;
      if (!nextState) buttonRef.current?.blur();
      return nextState;
    });
  };

  const handleMenuClick = (label: string) => {
    handleOption(label);
    toggleDropdown();
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      tokenPullDownRef.current &&
      !tokenPullDownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
      buttonRef.current?.blur();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={tokenPullDownRef} className="relative flex items-center">
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className={`relative flex items-center justify-between text-subtext2 text-mobile_body2_m
          pl-2.5 py-0 md:py-1 cursor-pointer gap-1 md:gap-0 md:text-body1_m
        `}
      >
        {ImageTokenComponent}

        <Image
          src={isDropdownOpen ? keyboardArrowUp : keyboardArrowDown}
          alt={"arrow"}
          className="w-[20px] h-[20px] md:w-[28px] md:h-[28px]"
        />
      </button>

      {isDropdownOpen &&
        (isTabOver ? (
          <SingleSelectOptions
            optionData={optionData}
            selectedOption={selectedOption}
            handleMenuClick={handleMenuClick}
            size="small"
          />
        ) : (
          <BottomSheet
            optionData={optionData}
            selectedOptions={selectedOption}
            handleMenuClick={handleMenuClick}
            onClose={() => setIsDropdownOpen(false)}
          />
        ))}
    </div>
  );
};

export default TokenPullDown;
