"use client";

import { logout } from "@/api/login/api";
import { useUserStore } from "@/providers/userStoreProvider";
import { useRouter } from "next/navigation";

interface MenuProps {
  optionData: { id: number; label: string; path: string | null }[];
  onClose: () => void;
}

/**
 *
 * @param optionData 드롭다운 목록 데이터
 * @param onClose 드롭다운 닫기 핸들러
 * @returns
 */
const UserDropdown = ({ optionData, onClose }: MenuProps) => {
  const router = useRouter();
  const { signOut } = useUserStore((state) => state);

  const handleLogout = async () => {
    try {
      // 현재 저장된 토큰 가져오기
      const accessToken = sessionStorage.getItem("accessToken") || "";
      const refreshToken = sessionStorage.getItem("refreshToken") || "";

      await logout(accessToken, refreshToken);

      // 상태 초기화 및 로그인 페이지로 이동
      signOut();
      window.location.href = "/";
    } catch (error) {
      console.error("로그아웃 오류:", error);
    }
  };

  const handleMenuClick = (item: { label: string; path: string | null }) => {
    if (item.label === "로그아웃") {
      handleLogout();
    } else if (item.path) {
      router.push(item.path);
    } else {
      console.log("No path available for:", item.label);
    }
    onClose();
  };

  return (
    <div className="z-50 absolute top-full left-7 w-[180px] mt-2 bg-background rounded-lg border border-menuborder shadow-default">
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
