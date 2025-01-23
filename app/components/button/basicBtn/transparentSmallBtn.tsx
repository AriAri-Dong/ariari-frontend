"use client";

interface ButtonProps {
  title: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  round?: boolean;
  className?: string;
}

/**
 *
 * @param title 버튼 이름
 * @param onClick 버튼 클릭 핸들러
 * @param round 버튼 모양 (true일 경우 rounded-full 적용)
 * @returns
 */
const TransparentSmallBtn = ({
  title,
  onClick,
  round = false,
  className,
}: ButtonProps) => {
  return (
    <button
      className={`flex text-nowrap items-center h-9 px-[18px] md:h-[44px] md:px-[22px]
        text-mobile_body2_sb md:text-body1_sb text-primary border border-primary active:bg-selectedoption_hover
        bg-selectedoption_default md:hover:bg-selectedoption_hover md:active:bg-selectedoption_pressed
        ${round ? "rounded-full" : "rounded-lg"} ${className}`}
      onClick={(e) => {
        e.stopPropagation();
        onClick(e);
      }}
    >
      {title}
    </button>
  );
};

export default TransparentSmallBtn;
