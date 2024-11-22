"use client";

import Image from "next/image";
import share from "@/images/icon/share.svg";

const ShareButton = () => {
  const handleShareBtnClick = () => {};

  return (
    <div
      className="flex justify-center w-[60px] h-[60px]
    bg-background hover:bg-hover focus:bg-pressed rounded-lg border border-menuborder cursor-pointer"
      onClick={handleShareBtnClick}
    >
      <Image src={share} alt={"공유하기"} width={24} height={24} />
    </div>
  );
};

export default ShareButton;
