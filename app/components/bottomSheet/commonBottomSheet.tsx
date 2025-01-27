import Image from "next/image";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface CommonBottomSheetProps {
  optionData: { id: number; image?: string; label: string; url?: string }[];
  selectedOption: string;
  handleMenuClick: (label: string) => void;
  onClose: () => void;
  className?: string;
  alignType?: "center" | "start";
}

/**
 * 라디오 버튼이 없는 공통 bottomSheet 컴포넌트
 * @param optionData 옵션 목록 데이터
 * @param selectedOption 선택한 옵션
 * @param handleMenuClick 옵션 선택 핸들러
 * @param onClose 바텀시트 닫는 함수
 * @param className 추가 className
 * @param alignType 옵션 정렬 타입 (중앙정렬 혹은 왼쪽 정렬 선택 default:center)
 * @returns
 */
const CommonBottomSheet = ({
  optionData,
  selectedOption,
  handleMenuClick,
  onClose,
  className,
  alignType = "center",
}: CommonBottomSheetProps) => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/50">
      <div className="absolute inset-0" onClick={handleClose} />
      <div
        className={`relative w-full h-[480px] px-[16px] bg-background rounded-t-[24px] shadow-default transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="w-[44px] h-[3px] mx-auto my-3 bg-menuborder rounded-full" />
        <ul>
          {optionData.map((item) => (
            <li
              key={item.label}
              className={`flex items-center p-[12.5px] text-mobile_h4 cursor-pointer focus:bg-hover ${
                alignType === "center" ? "justify-center" : ""
              } ${item.url === pathname ? "text-primary" : "text-subtext1"}`}
              onClick={() => {
                handleMenuClick(item.label);
                onClose();
              }}
            >
              <p className="flex gap-2.5 items-center">
                {item.image && (
                  <Image src={item.image} alt={"icon"} width={20} height={20} />
                )}
                {item.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CommonBottomSheet;
