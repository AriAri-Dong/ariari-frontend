"use client";

interface SingleSelectOptionsProps {
  selectedOption: string;
  optionData: { id: number; label: string }[];
  size: "small" | "medium" | "large" | "mobile";
  position?: "center" | "end";
  handleMenuClick?: (label: string) => void;
  handleMenuClickWithId?: (label: string, id: number) => void;
}

/**
 *
 * @param selectedOption 선택한 옵션
 * @param optionData 옵션 데이터
 * @param size 사이즈
 * @param position 부모 컴포넌트 기준 위치
 * @param handleMenuClick 메뉴 클릭 핸들러
 * @returns
 */
const SingleSelectOptions = ({
  selectedOption,
  optionData,
  size,
  position = "center",
  handleMenuClick,
  handleMenuClickWithId,
}: SingleSelectOptionsProps) => {
  const handleClick = (item: { id: number; label: string }) => {
    if (handleMenuClickWithId) {
      handleMenuClickWithId(item.label, item.id);
    }
    if (handleMenuClick) {
      handleMenuClick(item.label);
    }
  };
  return (
    <div
      className={`z-50 absolute top-full  mt-2 bg-background
      rounded-lg border border-menuborder shadow-default ${
        size === "small"
          ? "w-[116px]"
          : size === "medium"
          ? "w-[160px]"
          : size === "mobile"
          ? "w-[80px]"
          : "w-[190px]"
      } 
      ${
        position === "center"
          ? "left-1/2 transform -translate-x-1/2"
          : "right-0"
      }
   `}
    >
      {optionData.map((item, index) => (
        <div
          key={item.id}
          className={`relative flex justify-center items-center md:text-15 text-mobile_body2_m
          text-subtext1 cursor-pointer pressed:bg-pressed
            ${index === 0 ? "rounded-t-lg" : ""}
            ${index === optionData.length - 1 ? "rounded-b-lg" : ""}
            ${index !== 0 ? "border-t border-menuborder " : ""}
            ${
              selectedOption === item.label
                ? `border border-primary bg-selectedoption_default mx-[-1px]`
                : `mx-[5px] hover:bg-hover hover:mx-0 hover:text-subtext1`
            }          
            `}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => handleClick(item)}
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
};

export default SingleSelectOptions;
