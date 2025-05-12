import React from "react";
import TransparentSmallBtn from "../button/basicBtn/transparentSmallBtn";

interface TextInputWithBtnProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  maxLength?: number;
  onClick: () => void;
  btnTitle: string;
}

const TextInputWithBtn: React.FC<TextInputWithBtnProps> = ({
  value,
  onChange,
  placeholder = "Default Text",
  className = "",
  onClick,
  maxLength,
  btnTitle,
}) => {
  return (
    <div className={`flex items-center gap-[18px] w-full ${className}`}>
      <div className={`w-full relative`}>
        <input
          className="w-full bg-searchbar text-mobile_body1_r text-text1 py-3 px-4 rounded-xl 
        focus:border focus:border-blue-500 focus:outline-none placeholder-subtext2 md:px-[22px] md:py-[13px] md:text-body1_r"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...(maxLength ? { maxLength } : {})}
        />
        {maxLength && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-unselected text-mobile_body1_r md:right-[22px]">
            {value.length}/{maxLength}
          </div>
        )}
      </div>
      <TransparentSmallBtn title={btnTitle} onClick={onClick} round />
    </div>
  );
};

export default TextInputWithBtn;
