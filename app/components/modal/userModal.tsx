"use client";

import { USER_MENU } from "@/data/header";
import { useUserStore } from "@/providers/userStoreProvider";
import { useRouter } from "next/navigation";
import { logout } from "@/api/login/api";

interface UserModalProps {
  username?: string;
  onClose: () => void;
}

/**
 *
 * @param {string} username 유저 이름
 * @param onClose 모달 닫기 핸들러
 * @returns
 */
const UserModal = ({ onClose }: UserModalProps) => {
  const router = useRouter();
  const username = useUserStore((state) => state.memberData.nickname);
  const { signOut } = useUserStore((state) => state);

  const handleLogout = async () => {
    try {
      const accessToken = sessionStorage.getItem("accessToken") || "";
      const refreshToken = sessionStorage.getItem("refreshToken") || "";
      await logout(accessToken, refreshToken);
      signOut();
      window.location.href = "/";
    } catch (error) {
      console.error("로그아웃 오류:", error);
    }
  };

  const handleMenuClick = (path: string, label: string) => {
    if (label === "로그아웃") {
      handleLogout();
    } else {
      router.push(path);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-white z-50 px-4">
      <div className="flex flex-col">
        <div className="flex justify-between mt-10 mb-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full w-9 h-9 bg-[#CBCBCB]" />
            <span className="text-subtext2 text-mobile_body1_m">
              {username}
            </span>
          </div>
          <button onClick={onClose} className="w-6 h-6">
            닫기
          </button>
        </div>
        <ul className="flex flex-col gap-y-8">
          {USER_MENU.map((item, index) => (
            <li key={index} className="">
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
  );
};

export default UserModal;
