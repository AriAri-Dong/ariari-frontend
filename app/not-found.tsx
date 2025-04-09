"use client";

import Image from "next/image";
import notIcon from "@/images/icon/popup/not.svg";

export default function NotFound() {
  return (
    <div className="flex bg-white flex-col items-center justify-center min-h-screen text-center">
      <Image
        src={notIcon}
        alt={"404"}
        width={104}
        height={82}
        className="w-[134px] h-[107px]"
      />
      <h1 className="h-[54px] md:h-[72px] text-text1 text-[36px] md:text-[48px] font-light">
        404
      </h1>
      <p className="text-mobile_h4_r text-subtext1">
        요청하신 페이지를 찾을 수 없습니다.
      </p>
    </div>
  );
}
