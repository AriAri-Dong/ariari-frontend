"use client";

interface SingleSelectOptionsProps {
  selectedOption: string;
  optionData: { id: number; label: string }[];
  size: "small" | "medium" | "large";
  handleMenuClick: (label: string) => void;
}

/**
 *
 * @param selectedOption 선택한 옵션
 * @param optionData 옵션 데이터
 * @param size 사이즈
 * @param handleMenuClick 메뉴 클릭 핸들러
 * @returns
 */
const SingleSelectOptions = ({
  selectedOption,
  optionData,
  size,
  handleMenuClick,
}: SingleSelectOptionsProps) => (
  <div
    className={`z-50 absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-background
      rounded-lg border border-menuborder shadow-default ${
        size == "small"
          ? "w-[116px]"
          : size == "medium"
          ? "w-[160px]"
          : "w-[190px]"
      } `}
  >
    {optionData.map((item, index) => (
      <div
        key={item.id}
        className={`relative flex justify-center items-center text-base 
          text-subtext1 cursor-pointer pressed:bg-pressed
            ${index === 0 ? "rounded-t-lg" : ""}
            ${index === optionData.length - 1 ? "rounded-b-lg" : ""}
            ${index !== 0 ? "border-t border-menuborder " : ""}
            ${
              selectedOption === item.label
                ? `border border-primary bg-selectedoption_default mx-[-1.5px]`
                : `mx-[5px] hover:bg-hover hover:mx-0 hover:text-subtext1`
            }          
            `}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => handleMenuClick(item.label)}
      >
        <span
          className={`relative w-full py-2.5 text-center text-[15px] ${
            selectedOption === item.label && "text-primary"
          }`}
        >
          {item.label}
        </span>
      </div>
    ))}
  </div>
);

export default SingleSelectOptions;
