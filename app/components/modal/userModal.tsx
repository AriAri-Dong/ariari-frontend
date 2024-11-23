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
        <div className="flex justify-between mt-10 mb-10">
          <div className="flex items-center gap-3">
            <div className="rounded-full w-9 h-9 bg-[#CBCBCB]" />
            <span className="text-subtext2 text-base">{username}</span>
          </div>
          <Image
            src={closeIcon}
            alt="닫기"
            width={24}
            height={24}
            onClick={onClose}
          />
        </div>
        <div className="w-full">
          <div className="mt-5">
            <ul className="flex flex-col space-y-9">
              {USER_MENU.map((item, index) => (
                <li key={index} className="">
                  <span
                    className={`cursor-pointer
                    ${
                      index === 5
                        ? `text-subtext2 text-15 font-normal`
                        : `text-text1 text-lg font-semibold`
                    }`}
                    onClick={() => handleMenuClick(item.path)}
                  >
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
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
