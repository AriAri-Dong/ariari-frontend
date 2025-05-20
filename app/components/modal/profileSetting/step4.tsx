import React from "react";
import Image from "next/image";

import logo from "@/images/profile/logo.svg";

const Step4 = () => {
  return (
    <div className="relative justify-items-center w-[430px] px-5 pb-9 pt-[72px] bg-background rounded-2xl">
      <Image
        src={logo}
        alt={"logo"}
        width={111}
        height={124}
        className="mb-10"
      />
      <h3 className="text-text1 text-h1_contents_title mb-4">
        회원가입이 완료 되었습니다.
      </h3>
      <p className="text-subtext1 text-h4_r mb-8 text-center">
        동아리를 더 쉽고, 더 즐겁게!
        <br />
        아리아리와 함께해보세요.
      </p>
    </div>
  );
};

export default Step4;
