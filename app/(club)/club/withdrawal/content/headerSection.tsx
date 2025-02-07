"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import vector from "@/images/icon/backVector.svg";

interface HeaderSectionProps {
  title: string;
}
const HeaderSection = ({ title }: HeaderSectionProps) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-row justify-between mt-[46px]">
      <div className="flex gap-2">
        <Image
          src={vector}
          alt={"뒤로가기"}
          width={24}
          height={24}
          onClick={handleGoBack}
          className="cursor-pointer"
        />
        <h1 className="text-text1 text-mobile_h1_contents_title">{title}</h1>
      </div>
    </div>
  );
};

export default HeaderSection;
