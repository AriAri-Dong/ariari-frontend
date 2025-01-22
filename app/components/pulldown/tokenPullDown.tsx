"use client";

import { useEffect, useRef, useState } from "react";
import useResponsive from "../../../hooks/useResponsive";

import Image from "next/image";
import keyboardArrowDown from "@/images/icon/arrow.svg";
import keyboardArrowUp from "@/images/icon/arrow-up.svg";
import SingleSelectOptions from "./singleSelectOptions";
import BottomSheet from "./bottomSheet";
import MemberStatusToken from "../token/memberStatusToken";
import { MAP_STATUS_TO_EN } from "@/(club)/club/members/util/mapStatus";
import { clubMemberStatusType } from "@/model/member";

interface TokenPullDownProps {
  optionData: { id: number; label: string }[];
  selectedOption: clubMemberStatusType;
  handleOption: (label: string) => void;
}

const TokenPullDown = ({
  optionData,
  selectedOption,
  handleOption,
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
        <MemberStatusToken status={selectedOption} />

        <Image
          src={isDropdownOpen ? keyboardArrowUp : keyboardArrowDown}
          alt={isDropdownOpen ? "keyboardArrowUp" : "keyboardArrowDown"}
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
