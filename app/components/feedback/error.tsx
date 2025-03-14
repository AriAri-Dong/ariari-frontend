"use client";

import Image from "next/image";
import notIcon from "@/images/icon/popup/not.svg";
interface NotFoundProps {
  title?: string;
  description?: string;
  className?: string;
}
const ErrorNotice = ({ title, description, className }: NotFoundProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center min-h-[300px] md:min-h-[450px] text-center ${className}`}
    >
      <Image
        src={notIcon}
        alt={"404"}
        width={104}
        height={82}
        className="w-[134px] h-[107px]"
      />
      <h1 className="h-[54px] md:h-[72px] text-text1 text-[36px] md:text-[48px] font-light">
        {title ? title : "Error"}
      </h1>
      <p className="text-mobile_h4_r text-subtext1">
        {description ? description : "잠시 후 다시 시도해 주세요."}
      </p>
    </div>
  );
};

export default ErrorNotice;
