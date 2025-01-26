"use client";

import Image from "next/image";
import closeIcon from "@/images/icon/close.svg";
import logo from "@/images/logo/ariari.svg";
import { USER_MENU } from "@/data/header";
import { useRouter } from "next/navigation";

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
  const username = "Suyoooi";

  const handleMenuClick = (path: string) => {
    router.push(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-white z-50 px-4">
      <div className="flex flex-col">
        <div className="flex justify-between mt-10 mb-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full w-9 h-9 bg-[#CBCBCB]" />
            <span className="text-subtext2  text-mobile_body1_m">
              {username}
            </span>
          </div>
          <Image
            src={closeIcon}
            alt="닫기"
            width={24}
            height={24}
            onClick={onClose}
          />
        </div>
        <div
          className="flex items-center justify-between w-full bg-selectedoption_default
          rounded-lg max-w-[1248px] px-5 h-[55px]"
        >
          <h3 className="text-body1_sb text-primary">내 포인트 현황</h3>
          <div className="flex items-center gap-1.5 text-primary">
            <div className="text-h4_sb">20</div>
            <p className="text-body3_r">p</p>
          </div>
        </div>
        <div className="w-full mt-5">
          <ul className="flex flex-col gap-y-8">
            {USER_MENU.map((item, index) => (
              <li key={index} className="">
                <span
                  className={`cursor-pointer
        ${
          index === USER_MENU.length - 1
            ? `text-subtext2 text-mobile_body1_r`
            : `text-text1 text-mobile_h1_contents_title`
        }`}
                  onClick={() => handleMenuClick(item.path)}
                >
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <Image
          src={logo}
          alt="Logo"
          width={52}
          height={42}
          className="fixed bottom-0 pb-10"
        />
      </div>
    </div>
  );
};

export default UserModal;
