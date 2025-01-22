"use client";

import { useEffect, useRef, useState } from "react";
import useResponsive from "../../../hooks/useResponsive";

import Image from "next/image";
import keyboardArrowDown from "@/images/icon/arrow.svg";
import SingleSelectOptions from "./singleSelectOptions";

import BottomSheet from "./bottomSheet";

interface SubPullDownProps {
  optionData: { id: number; label: string }[];
  selectedOption: string;
  handleOption: (label: string) => void;
}

const SubPullDown = ({
  optionData,
  selectedOption,
  handleOption,
}: SubPullDownProps) => {
  const SubPullDownRef = useRef<HTMLDivElement | null>(null);
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
      SubPullDownRef.current &&
      !SubPullDownRef.current.contains(event.target as Node)
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
    <div ref={SubPullDownRef} className="relative flex items-center">
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className={`relative flex items-center justify-between text-subtext2 text-mobile_body2_m
          pl-2.5 py-1 cursor-pointer gap-1 md:gap-2 md:text-body1_m
        `}
      >
        <span>{selectedOption}</span>

        <Image
          src={keyboardArrowDown}
          alt="keyboardArrowDown"
          className="w-[20px] h-[20px] md:w-[28px] md:h-[28px]"
        />
      </button>

      {isDropdownOpen &&
        (isTabOver ? (
          <SingleSelectOptions
            optionData={optionData.slice(1)}
            selectedOption={selectedOption}
            handleMenuClick={handleMenuClick}
            size="small"
          />
        ) : (
          <BottomSheet
            optionData={optionData.slice(1)}
            selectedOptions={selectedOption}
            handleMenuClick={handleMenuClick}
            onClose={() => setIsDropdownOpen(false)}
          />
        ))}
    </div>
  );
};

export default SubPullDown;
