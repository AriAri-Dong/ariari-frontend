import React, { useEffect, useState } from "react";
import Image from "next/image";

import checkIcon from "@/images/icon/radio_button_checked.svg";
import uncheckIcon from "@/images/icon/radio_button_unchecked.svg";

interface BottomSheetProps {
  optionData: { id: number; label: string }[];
  selectedOptions: string[] | string;
  handleMenuClick?: (label: string) => void;
  handleMenuClickWithId?: (label: string, id: number) => void;
  onClose: () => void;
  multiple?: boolean;
}

/**
 *
 * @param optionData 옵션 리스트
 * @param selectedOptions 선택된 옵션, 선택되지 않은 경우 ""로 넘기기 가능
 * @param handleMenuClick 옵션 선택시 문자열로만 처리 가능한 경우 사용
 * @param handleMenuClickWithId 옵션 선택시 id + 문자열로 처리가 필요한 경우 사용
 * @param multiple 옵션 다중선택 가능 여부 (radio button 존재 여부)
 * @returns
 */

const BottomSheet = ({
  optionData,
  selectedOptions,
  handleMenuClick,
  handleMenuClickWithId,
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
              className={`flex items-center p-[12.5px] text-mobile_h4 cursor-pointer ${
                !isSelected
                  ? "text-subtext1"
                  : selectedOptions.includes(item.label)
                  ? "text-primary font-semibold"
                  : "text-unselected"
              } ${
                !multiple && `justify-center`
              } focus:bg-hover focus:text-subtext1`}
              onClick={() => {
                if (handleMenuClickWithId) {
                  handleMenuClickWithId(item.label, item.id);
                }
                if (handleMenuClick) {
                  handleMenuClick(item.label);
                }
                if (!multiple) {
                  handleClose();
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
