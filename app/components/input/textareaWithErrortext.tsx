import React from "react";

interface TextareaWithErrortextProps {
  value: string;
  maxLength: number;
  onChange: (value: string) => void;

  placeholder?: string;
  counter?: boolean;
  errorMessage?: string;
  className?: string;
}

/**
 *
 * @param value text
 * @param placeholder
 * @param maxLength 최대 길이
 * @param onChange
 * @param counter 글자수 visible 여부 ex- n/1000
 * @param errorMessage 에러메시지 필요한 경우 string 형식, 일반적 경우 null
 * @param className 추가 스타일
 *
 * @returns
 */

const TextareaWithErrortext = ({
  value,
  maxLength,
  onChange,
  placeholder = "",
  className = "",
  counter = false,
  errorMessage,
}: TextareaWithErrortextProps) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <div>
      <div
        className={`w-full min-h-[161px] flex flex-col justify-between px-4 py-3 bg-searchbar 
          rounded-xl focus-within:border focus-within:border-indigo-300 
          md:py-[13px] md:px-[22px] ${className}`}
      >
        <textarea
          className="w-full flex-grow bg-searchbar text-mobile_body1_r text-text1  
         placeholder-subtext2 resize-none focus:outline-none"
          placeholder={placeholder}
          maxLength={maxLength}
          value={value}
          onChange={handleInputChange}
        />
        {counter && (
          <div className="text-end text-unselected text-mobile_body1_r">
            {value.length}/{maxLength}
          </div>
        )}
      </div>
      {errorMessage && (
        <p className="mt-1 pl-4 text-noti text-mobile_body3_r md:pl-[22px] md:mt-2 md:text-body4_r ">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default TextareaWithErrortext;
