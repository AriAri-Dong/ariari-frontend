"use client";

import { useEffect, useRef, useState } from "react";
import useResponsive from "../../../hooks/useResponsive";

import Image from "next/image";
import keyboardArrowDown from "@/images/icon/keyboardArrowDown.svg";
import SingleSelectOptions from "./singleSelectOptions";
import MultiSelectOptions from "./multiSelectOptions";

import BottomSheet from "./bottomSheet";
import NotiPopUp from "../modal/notiPopUp";

interface PulldownProps {
  optionData: { id: number; label: string }[];
  multiple?: boolean;
  selectedOption: string[];
  handleOption: (label: string[]) => void;
  optionSize: "small" | "medium" | "large";
}

const PullDown = ({
  optionData,
  optionSize,
  multiple = false,
  selectedOption,
  handleOption,
}: PulldownProps) => {
  const pulldownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const isTabOver = useResponsive("md");

  const isSelected = selectedOption.length > 0;

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false); //옵션메뉴
  const [isModalOpen, setModalOpen] = useState<boolean>(false); // ex) 학교 인증 모달

  const schoolCertification = false; // 학교 인증 여부 임시값

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => {
      const nextState = !prev;
      if (!nextState) buttonRef.current?.blur();
      return nextState;
    });
  };

  const handleMenuClick = (label: string) => {
    if (!schoolCertification && label == "교내") {
      setModalOpen(true);
      return;
    }
    if (!multiple) {
      handleOption([label]);
      toggleDropdown();
    } else {
      const updatedOptions = (() => {
        if (label === "전체") {
          return selectedOption.includes("전체") ? [] : ["전체"];
        } else {
          if (selectedOption.includes("전체")) {
            return [label];
          }
          return selectedOption.includes(label)
            ? selectedOption.filter((option) => option !== label) // 제거
            : [...selectedOption, label]; // 추가
        }
      })();

      handleOption(updatedOptions);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      pulldownRef.current &&
      !pulldownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
      buttonRef.current?.blur();
    }
  };

  const selectedOptionText = selectedOption[0]
    ? !multiple || (multiple && selectedOption.length === 1)
      ? selectedOption[0]
      : `${selectedOption[0]} 외 ${selectedOption.length - 1}`
    : optionData[0].label;

  const getDynamicStyle = () => {
    const length = selectedOptionText.replace(/\s/g, "").length;
    if (length <= 3) return "text-15";
    else return "text-sm";
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={pulldownRef} className="relative flex items-center">
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className={`relative flex items-center justify-between 
          pl-[11px] pr-[7px] py-[5px]
          cursor-pointer rounded-30 border gap-[6px]
          md:pl-5 md:pr-[14px] md:py-2
          ${
            isSelected
              ? `bg-selectedoption_default border-selectedoptionborder hover:bg-selectedoption_hover focus:bg-selectedoption_pressed`
              : `bg-white border-menuborder hover:bg-hover focus:bg-pressed`
          }
        `}
      >
        <span
          className={`text-mobile_body2_m md:text-body1_m ${
            isSelected ? "text-primary" : "text-text1"
          } md:${getDynamicStyle()}`}
        >
          {selectedOptionText}
        </span>
        <Image
          src={keyboardArrowDown}
          alt="keyboardArrowDown"
          width={16}
          height={16}
          className="md:w-6 md:h-6"
        />
      </button>
      {isDropdownOpen &&
        (!multiple ? (
          isTabOver ? (
            <SingleSelectOptions
              optionData={optionData.slice(1)}
              selectedOption={selectedOption[0]}
              handleMenuClick={handleMenuClick}
              size={optionSize}
            />
          ) : (
            <BottomSheet
              optionData={optionData.slice(1)}
              selectedOptions={selectedOption}
              handleMenuClick={handleMenuClick}
              onClose={() => setIsDropdownOpen(false)}
              multiple={false}
            />
          )
        ) : isTabOver ? (
          <MultiSelectOptions
            optionData={optionData.slice(1)}
            selectedOptions={selectedOption}
            handleMenuClick={handleMenuClick}
            size={optionSize}
          />
        ) : (
          <BottomSheet
            optionData={optionData.slice(1)}
            selectedOptions={selectedOption}
            handleMenuClick={handleMenuClick}
            onClose={() => setIsDropdownOpen(false)}
            multiple={true}
          />
        ))}

      {isModalOpen && (
        <NotiPopUp
          onClose={() => setModalOpen(false)}
          icon="school"
          title="학교 등록이 필요합니다"
          description={`교내 인기 동아리를 확인하기 위해서는\n학교 등록이 필요합니다.`}
          firstButton={() => {}}
          firstButtonText="학교 등록하기"
          secondButton={() => setModalOpen(false)}
          secondButtonText="다음에 할게요"
          modalType="button"
        />
      )}
    </div>
  );
};

export default PullDown;
