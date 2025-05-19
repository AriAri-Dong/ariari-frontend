"use client";

import { logout } from "@/api/login/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AlertWithMessage from "@/components/alert/alertWithMessage";
import { useUserStore } from "@/providers/userStoreProvider";

interface MenuProps {
  optionData: { id: number; label: string; path: string | null }[];
  onClose: () => void;
}

/**
 * @param optionData 드롭다운 목록 데이터
 * @param onClose 드롭다운 닫기 핸들러
 */
const UserDropdown = ({ optionData, onClose }: MenuProps) => {
  const router = useRouter();
  const signOutUser = useUserStore((state) => state.signOut);

  const [showLogoutAlert, setShowLogoutAlert] = useState<boolean>(false);

  const handleLogout = async () => {
    try {
      await logout(signOutUser);
    } catch (error) {
      console.error("로그아웃 오류:", error);
    }
  };

  const handleMenuClick = (item: { label: string; path: string | null }) => {
    if (item.label === "로그아웃") {
      console.log("로그아웃 버튼 클릭됨");
      setShowLogoutAlert(true);
      return;
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
      {/* 로그아웃 확인 알림 */}
      {showLogoutAlert && (
        <AlertWithMessage
          text="로그아웃 하시겠습니까?"
          description="계정을 로그아웃하면 다시 로그인해야 합니다."
          leftBtnText="취소"
          rightBtnText="확인"
          onLeftBtnClick={() => setShowLogoutAlert(false)}
          onRightBtnClick={handleLogout}
        />
      )}
    </div>
  );
};

export default UserDropdown;
