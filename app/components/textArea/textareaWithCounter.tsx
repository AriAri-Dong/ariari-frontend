import React from "react";

interface TextInputWithCounterProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength: number;
  className?: string;
}

const TextareaWithCounter: React.FC<TextInputWithCounterProps> = ({
  value,
  onChange,
  placeholder = "",
  maxLength,
  className = "",
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={`w-full relative ${className}`}>
      <textarea
        className="w-full bg-searchbar text-mobile_body1_r text-text1 py-3 px-4 rounded-xl 
        focus:border-blue-500 focus:outline-none placeholder-subtext2 resize-none min-h-[161px]"
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        onChange={handleInputChange}
      />
      <div className="absolute right-4 bottom-4 text-unselected text-mobile_body1_r">
        {value.length}/{maxLength}
      </div>
    </div>
  );
};

export default TextareaWithCounter;
