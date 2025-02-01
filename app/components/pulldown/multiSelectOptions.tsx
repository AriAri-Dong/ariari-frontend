"use client";

import Image from "next/image";
import checkIcon from "@/images/icon/radio_button_checked.svg";
import uncheckIcon from "@/images/icon/radio_button_unchecked.svg";

interface MultiSelectOptionsProps {
  optionData: { id: number; label: string }[];
  selectedOptions: string[];
  size: "small" | "medium" | "large" | "mobile";
  handleMenuClick: (label: string) => void;
}

const MultiSelectOptions = ({
  optionData,
  selectedOptions,
  size,
  handleMenuClick,
}: MultiSelectOptionsProps) => {
  return (
    <div
      className={`flex flex-col absolute z-50 top-full left-1/2 transform -translate-x-1/2 mt-2 bg-background rounded-lg border border-menuborder shadow-default 
        ${
          size == "small"
            ? "w-[116px]"
            : size == "medium"
            ? "w-[160px]"
            : "w-[190px]"
        }`}
    >
      {optionData.map((item, index) => {
        return (
          <div
            key={item.id}
            className={`relative flex justify-center items-center text-base text-subtext1 cursor-pointer active:bg-pressed px-[10px] py-[12px]
            ${index === 0 ? "rounded-t-lg" : ""}
            ${index === optionData.length - 1 ? "rounded-b-lg" : ""}
          

            ${index !== 0 ? "border-t border-menuborder " : ""}
            ${"text-subtext1  mx-[4px] hover:bg-hover hover:mx-[0px] hover:px-[14px] hover:text-subtext1"}
          `}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => handleMenuClick(item.label)}
          >
            <Image
              src={
                selectedOptions.includes(item.label) ? checkIcon : uncheckIcon
              }
              alt="checkbox"
              className="mr-[10px]"
            />
            <span className="w-full text-left text-[15px]">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default MultiSelectOptions;
