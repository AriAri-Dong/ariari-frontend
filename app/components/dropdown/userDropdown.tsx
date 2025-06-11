"use client";

import { useRouter } from "next/navigation";

interface MenuProps {
  optionData: { id: number; label: string; path: string | null }[];
  onClose: () => void;
  onClickLogout: () => void;
}

/**
 * @param optionData 드롭다운 목록 데이터
 * @param onClose 드롭다운 닫기 핸들러
 */
const UserDropdown = ({ optionData, onClose, onClickLogout }: MenuProps) => {
  const router = useRouter();

  const handleMenuClick = (item: { label: string; path: string | null }) => {
    if (item.label === "로그아웃") {
      onClickLogout();
      return;
    } else if (item.path) {
      router.push(item.path);
    }
    onClose();
  };

  return (
    <div className="w-[180px] bg-background rounded-lg border border-menuborder shadow-default z-50">
      {optionData.map((item, index) => (
        <div
          key={item.id}
          className={`relative flex justify-center items-center text-15 text-subtext1 cursor-pointer hover:bg-hover hover:mx-[0px] focus:bg-pressed
          ${index === 0 ? "rounded-t-lg" : ""}
          ${index === optionData.length - 1 ? "rounded-b-lg" : ""}
          ${index !== 0 ? "border-t border-menuborder mx-[5px]" : ""}`}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => handleMenuClick(item)}
        >
          <span className="relative py-[10px] text-center w-full">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default UserDropdown;
