import React from "react";
import Image from "next/image";

import logo from "@/images/profile/logo.svg";

const Step4 = () => {
  return (
    <div className="flex flex-col items-center mt-[72px] mb-9">
      <Image
        src={logo}
        alt={"logo"}
        width={111}
        height={124}
        className="mb-10"
      />
      <h3 className="text-text1 text-h1_contents_title mb-4">
        탈퇴가 완료되었습니다
      </h3>
      <p className="text-subtext1 text-h4_r mb-8 text-center">
        아리아리 서비스를 이용해주셔서 감사합니다.
      </p>
    </div>
  );
};

export default Step4;
