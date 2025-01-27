"use client";

import { useEffect, useRef, useState } from "react";
import useResponsive from "@/hooks/useResponsive";

import Image from "next/image";
import keyboardArrowDown from "@/images/icon/keyboardArrowDown.svg";
import SingleSelectOptions from "./singleSelectOptions";
import MultiSelectOptions from "./multiSelectOptions";

import BottomSheet from "./bottomSheet";
import NotiPopUp from "../modal/notiPopUp";
import { OptionType } from "@/types/components/pulldown";

interface PulldownProps {
  optionData: OptionType[];
  multiple?: boolean;
  selectedOption: string[];
  handleOption: (label: string[]) => void;
  optionSize: "small" | "medium" | "large" | "mobile";
  forceDropdown?: boolean;
}
/**
 * Pulldown 컴포넌트에
 *
 * @property optionData - 선택 가능한 옵션 데이터 배열
 * @property multiple - 여러 개 옵션 선택 여부. 기본값은 false
 * @property selectedOption - 선택된 옵션 배열, 선택되지 않은 경우 기본값(ex-["분야"])
 * @property handleOption - 선택된 옵션을 처리 *(문자열로 처리)
 * @property optionSize - 옵션 드롭다운의 크기. {"small" | "medium" | "large" | "mobile"}
 * @property forceDropdown- 드롭다운이 강제로 열려 있도록 할지 여부. 기본값은 false
 */

const PullDown = ({
  optionData,
  optionSize,
  multiple = false,
  selectedOption,
  handleOption,
  forceDropdown = false,
}: PulldownProps) => {
  const pulldownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const isTabOver = useResponsive("md");
  const isSelected =
    selectedOption.length > 0 &&
    optionData.some((option) => option.label === selectedOption[0]);

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

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
              ? `bg-selectedoption_default border-selectedoption_border hover:bg-selectedoption_hover focus:bg-selectedoption_pressed`
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
          isTabOver || forceDropdown ? (
            <SingleSelectOptions
              optionData={optionData}
              selectedOption={selectedOption[0]}
              handleMenuClick={handleMenuClick}
              size={optionSize}
            />
          ) : (
            <BottomSheet
              optionData={optionData}
              selectedOptions={selectedOption}
              handleMenuClick={handleMenuClick}
              onClose={() => setIsDropdownOpen(false)}
              multiple={false}
            />
          )
        ) : isTabOver || forceDropdown ? (
          <MultiSelectOptions
            optionData={optionData}
            selectedOptions={selectedOption}
            handleMenuClick={handleMenuClick}
            size={optionSize}
          />
        ) : (
          <BottomSheet
            optionData={optionData}
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
