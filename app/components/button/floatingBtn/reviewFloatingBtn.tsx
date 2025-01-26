"use client";

import React from "react";
import WriteBtn from "@/components/button/iconBtn/writeBtn";
import Image from "next/image";
import helpText from "@/images/icon/point_helpText.svg";
import { usePathname } from "next/navigation";

interface ReviewFloatingBtnProp {
  onClick: () => void;
}

const ReviewFloatingBtn = ({ onClick }: ReviewFloatingBtnProp) => {
  const pathname = usePathname();

  const imageVisible = pathname.includes("/club/review");

  return (
    <div
      className="hidden md:flex fixed bottom-0 w-full max-w-[1248px] mb-9
      justify-center left-1/2 transform -translate-x-1/2 px-5"
      style={{ zIndex: 10 }}
    >
      <div className="flex flex-col w-full">
        {imageVisible && (
          <Image
            src={helpText}
            alt={"helpText"}
            className="self-end mr-[-12px] mb-[-8px]"
          />
        )}
        <div className="self-end mr-1 mb-[-8px]">
          <WriteBtn onClick={onClick} />
        </div>
      </div>
    </div>
  );
};

export default ReviewFloatingBtn;
