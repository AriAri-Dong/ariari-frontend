import React from "react";

interface TextInputWithCounterProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  maxLength: number;
  className?: string;
}

const TextInputWithCounter: React.FC<TextInputWithCounterProps> = ({
  value,
  onChange,
  placeholder = "",
  maxLength,
  className = "",
}) => {
  return (
    <div className={`w-full relative ${className}`}>
      <input
        className="w-full bg-searchbar text-mobile_body1_r text-text1 py-3 px-4 rounded-xl 
        focus:border focus:border-blue-500 focus:outline-none placeholder-subtext2"
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-unselected text-mobile_body1_r">
        {value.length}/{maxLength}
      </div>
    </div>
  );
};

export default TextInputWithCounter;
