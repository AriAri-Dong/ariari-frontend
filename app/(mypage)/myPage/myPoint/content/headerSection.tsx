"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import vector from "@/images/icon/backVector.svg";

const HeaderSection = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-row justify-between">
      <div className="flex gap-2">
        <Image
          src={vector}
          alt={"뒤로가기"}
          width={24}
          height={24}
          onClick={handleGoBack}
          className="md:hidden cursor-pointer"
        />
        <div className="flex flex-col gap-[22px]">
          <h1 className="text-text1 text-mobile_h1_contents_title md:text-h1_contents_title">
            내 포인트
          </h1>
          <p className="text-h4 text-subtext2 hidden md:block">
            UserName님이 현재 보유중인 포인트와 사용내역입니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
