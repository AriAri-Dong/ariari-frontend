"use client";

import React, { useEffect, useRef } from "react";

interface SubTapProps {
  optionData: { id: number; label: string; number?: number; url?: string }[];
  selectedOption: string;
  handleOption: (value: string) => void;
  setMenuRefs?: React.Dispatch<React.SetStateAction<(HTMLDivElement | null)[]>>;
}

const SubTap = ({
  optionData,
  selectedOption,
  handleOption,
  setMenuRefs,
}: SubTapProps) => {
  const localRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (setMenuRefs) {
      setMenuRefs(localRefs.current);
    }
  }, [setMenuRefs]);

  return (
    <div
      className="w-fit h-10 p-[2px] flex items-center gap-1.5 bg-searchbar rounded-28 whitespace-nowrap md:h-12 md:rounded-28 md:gap-2.5"
      style={{
        WebkitOverflowScrolling: "touch",
      }}
    >
      {optionData.map((option, index) => (
        <div
          key={option.id}
          ref={(el) => {
            if (localRefs.current) {
              localRefs.current[index] = el;
            }
          }}
          className={`flex-shrink-0 px-4 h-9 flex items-center justify-center gap-1 text-center rounded-28 cursor-pointer truncate transition-all duration-500 md:px-5 md:h-11 ${
            selectedOption === option.label
              ? "text-primary bg-background shadow-default"
              : "text-unselected"
          }`}
          onClick={() => handleOption(option.label)}
        >
          <p className="text-body1_sb md:text-h4_sb">{option.label}</p>
          {option.number !== undefined && option.number > 0 && (
            <p
              className={`w-5 h-5 flex items-center justify-center rounded-full text-8 transition-all duration-500 md:w-6 md:h-6 md:text-10 ${
                selectedOption === option.label
                  ? "bg-selectedoption_default"
                  : "bg-token_bg"
              }`}
            >
              {option.number}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default SubTap;
