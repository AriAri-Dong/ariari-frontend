import React from "react";
import Image from "next/image";

import not from "@/images/icon/popup/not.svg";
import LargeBtn from "@/components/button/basicBtn/largeBtn";
export interface StepProps {
  handleNextStep: () => void;
  handleNext2Step: () => void;
  onClose: () => void;
  isManager?: boolean;
}
const Step2 = ({
  handleNextStep,
  handleNext2Step,
  onClose,
  isManager = false,
}: StepProps) => {
  const managementText =
    "회원님이 동아리 관리자로 있는 동아리가 있습니다.\n관리자 권한을 다른 사용자에게 위임해주세요.";
  const commonText = "아리아리 서비스 탈퇴시 일부 기능이 제한됩니다.";
  return (
    <div className="w-full flex flex-col justify-center items-center pt-[72px] pb-[26px]">
      <Image
        src={not}
        alt={"logo"}
        width={134}
        height={107}
        className="mb-[46px]"
      />
      <p className="text-text1 text-h1_contents_title mb-4">
        정말 탈퇴하시겠습니까?
      </p>
      <p className="text-subtext1 text-h4_r mb-8 text-center whitespace-pre">
        {isManager ? managementText : commonText}
      </p>

      <LargeBtn
        title={"예"}
        onClick={isManager ? handleNextStep : handleNext2Step}
      />
      <button
        onClick={onClose}
        className="block mx-auto mt-4 px-4 py-2.5 text-[13px] font-semibold text-primary md:text-[15px]"
      >
        아니오
      </button>
    </div>
  );
};

export default Step2;
