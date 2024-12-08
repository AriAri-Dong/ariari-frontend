import React, { useEffect, useState } from "react";
import Image from "next/image";

import checkIcon from "@/images/icon/radio_button_checked.svg";
import uncheckIcon from "@/images/icon/radio_button_unchecked.svg";

interface BottomSheetProps {
  optionData: { id: number; label: string }[];
  selectedOptions: string[];
  handleMenuClick: (label: string) => void;
  onClose: () => void;
  multiple?: boolean;
}

const BottomSheet = ({
  optionData,
  selectedOptions,
  handleMenuClick,
  onClose,
  multiple = false,
}: BottomSheetProps) => {
  const isSelected = selectedOptions.length > 0;
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300); // 닫는 시간
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/50">
      <div className="absolute inset-0" onClick={handleClose}></div>

      <div
        className={`relative w-full h-[480px] px-[16px] bg-background rounded-t-[24px] shadow-default transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="w-[44px] h-[3px] mx-auto my-[12px] bg-menuborder rounded-full"></div>

        <ul>
          {optionData.map((item) => (
            <li
              key={item.label}
              className={`flex items-center p-[10px] text-[15px] cursor-pointer ${
                !isSelected
                  ? "text-subtext1"
                  : selectedOptions.includes(item.label)
                  ? "text-primary font-semibold"
                  : "text-unselected"
              } ${
                !multiple && `justify-center`
              } focus:bg-hover focus:text-subtext1`}
              onClick={() => {
                handleMenuClick(item.label);
                if (!multiple) {
                  onClose();
                }
              }}
            >
              {multiple && (
                <Image
                  src={
                    selectedOptions.includes(item.label)
                      ? checkIcon
                      : uncheckIcon
                  }
                  alt="checkbox"
                  className="mr-[14px]"
                  width={20}
                  height={20}
                />
              )}
              <div>{item.label}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BottomSheet;
