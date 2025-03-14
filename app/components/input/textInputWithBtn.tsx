import React from "react";
import TransparentSmallBtn from "../button/basicBtn/transparentSmallBtn";

interface TextInputWithBtnProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  onClick: () => void;
  btnTitle: string;
}

const TextInputWithBtn: React.FC<TextInputWithBtnProps> = ({
  value,
  onChange,
  placeholder = "Default Text",
  className = "",
  onClick,
  btnTitle,
}) => {
  return (
    <div className={`flex items-center gap-[18px] w-full ${className}`}>
      <input
        className="w-full bg-searchbar text-mobile_body1_r text-text1 py-3 px-4 rounded-xl 
        focus:border focus:border-blue-500 focus:outline-none placeholder-subtext2 md:px-[22px] md:py-[13px] md:text-body1_r"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <TransparentSmallBtn title={btnTitle} onClick={onClick} round />
    </div>
  );
};

export default TextInputWithBtn;
