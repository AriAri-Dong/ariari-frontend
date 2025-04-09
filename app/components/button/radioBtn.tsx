"use client";

import Image from "next/image";
import checkIcon from "@/images/icon/radio_button_checked.svg";
import uncheckIcon from "@/images/icon/radio_button_unchecked.svg";

interface RadioButtonProps {
  isChecked: boolean;
  label?: string;
  onClick: () => void;
  className?: string;
  imgClassName?: string;
}

/**
 *
 * @param isChecked 체크 여부
 * @param label 버튼 이름
 * @param onClick 클릭 핸들러
 * @returns
 */
const RadioBtn = ({
  isChecked,
  label,
  onClick,
  className,
  imgClassName,
}: RadioButtonProps) => {
  return (
    <div
      className={`flex items-center gap-1 md:gap-[6px] cursor-pointer py-1 pr-[6px]  text-body3_m md:text-body1_m ${className}`}
      onClick={onClick}
    >
      <Image
        src={isChecked ? checkIcon : uncheckIcon}
        alt={isChecked ? "Checked" : "Unchecked"}
        width={16}
        height={16}
        className={`md:w-5 md:h-5 ${imgClassName}`}
      />
      {label && <p className="text-icon">{label}</p>}
    </div>
  );
};

export default RadioBtn;
