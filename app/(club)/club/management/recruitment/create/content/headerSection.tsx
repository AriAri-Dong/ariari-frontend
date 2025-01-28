"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import vector from "@/images/icon/backVector.svg";

const HeaderSection = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div>
      <div className="md:hidden flex flex-row justify-between mt-[46px]">
        <div className="flex gap-2">
          <Image
            src={vector}
            alt={"뒤로가기"}
            width={24}
            height={24}
            onClick={handleGoBack}
            className="md:hidden cursor-pointer"
          />
          <h1 className="text-text1 text-mobile_h1_contents_title">
            모집공고 작성
          </h1>
        </div>
      </div>
      <h1 className="hidden md:block md:text-h1_contents_title mt-8 mb-[22px]">
        모집 공고 작성
      </h1>
    </div>
  );
};

export default HeaderSection;
