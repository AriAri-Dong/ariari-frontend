"use client";

import SmallBtn from "../button/basicBtn/smallBtn";
import { useRouter } from "next/navigation";
import Image from "next/image";
import closed from "@/images/icon/popup/closed.svg";

const RequiredLogin = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
      <div className="text-[48px] mb-4">
        <Image
          src={closed}
          alt={"lock"}
          width={30}
          height={30}
          className="md:w-[70px] md:h-[70px]"
        />
      </div>
      <h2 className="text-text1 text-mobile_h1_contents_title mb-2 md:text-h1_contents_title">
        로그인이 필요한 서비스입니다
      </h2>
      <p className="text-subtext2 text-mobile_body2_m mb-6 md:text-h4">
        나의 동아리 지원 현황은 로그인 후 확인하실 수 있어요.
      </p>

      <SmallBtn title={"뒤로가기"} onClick={() => router.back()} />
    </div>
  );
};

export default RequiredLogin;
