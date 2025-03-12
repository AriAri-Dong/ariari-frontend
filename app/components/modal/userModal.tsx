"use client";

import { USER_MENU } from "@/data/header";
import { useUserStore } from "@/providers/userStoreProvider";
import { useRouter } from "next/navigation";
import { logout } from "@/api/login/api";
import { useState } from "react";
import AlertWithMessage from "@/components/alert/alertWithMessage";
import Image from "next/image";
import close from "@/images/icon/close.svg";

interface UserModalProps {
  onClose: () => void;
}

/**
 * @param onClose 모달 닫기 핸들러
 */
const UserModal = ({ onClose }: UserModalProps) => {
  const router = useRouter();
  const username = useUserStore((state) => state.memberData.nickname);
  const [showLogoutAlert, setShowLogoutAlert] = useState<boolean>(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("로그아웃 오류:", error);
    }
  };

  const handleMenuClick = (path: string, label: string) => {
    if (label === "로그아웃") {
      setShowLogoutAlert(true);
      return;
    } else {
      router.push(path);
    }
    onClose();
  };

  return (
    <>
      {/* 모달 영역 */}
      <div className="fixed inset-0 bg-white z-50 px-4">
        <div className="flex flex-col">
          {/* 유저 프로필 영역 */}
          <div className="flex justify-between mt-10 mb-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full w-9 h-9 bg-[#CBCBCB]" />
              <span className="text-subtext2 text-mobile_body1_m">
                {username}
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-5 h-5 flex justify-center items-center md:w-7 md:h-7"
            >
              <Image
                src={close}
                alt="닫기"
                width={16}
                height={16}
                className="md:w-6 md:h-6"
              />
            </button>
          </div>

          {/* 메뉴 리스트 */}
          <ul className="flex flex-col gap-y-8">
            {USER_MENU.map((item, index) => (
              <li key={index}>
                <span
                  className={`cursor-pointer ${
                    index === USER_MENU.length - 1
                      ? `text-subtext2 text-mobile_body1_r`
                      : `text-text1 text-mobile_h1_contents_title`
                  }`}
                  onClick={() => handleMenuClick(item.path, item.label)}
                >
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 로그아웃 확인 알림 */}
      {showLogoutAlert && (
        <>
          <AlertWithMessage
            text="로그아웃 하시겠습니까?"
            description="계정을 로그아웃하면 다시 로그인해야 합니다."
            leftBtnText="취소"
            rightBtnText="확인"
            onLeftBtnClick={() => setShowLogoutAlert(false)}
            onRightBtnClick={handleLogout}
          />
        </>
      )}
    </>
  );
};

export default UserModal;
