import Image from "next/image";
import Noti from "@/images/icon/noti.svg";

interface NoticeBannerProps {
  text: string;
  className?: string;
}

const NoticeBanner = ({ text, className }: NoticeBannerProps) => {
  return (
    <div
      className={`flex bg-sub_bg items-center gap-3 md:gap-5 px-4 py-4 md:px-5 rounded-12 
        ${className}`}
    >
      <Image
        src={Noti}
        alt="공지"
        width={24}
        height={24}
        className="md:w-8 md:h-8"
      />
      <p className="text-mobile_body3_m md:text-body2_m text-icon">{text}</p>
    </div>
  );
};

export default NoticeBanner;
