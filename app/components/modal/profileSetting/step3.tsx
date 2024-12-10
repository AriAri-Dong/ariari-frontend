"use client";

import React, { useState } from "react";
import { useProfileContext } from "@/context/profileConetxt";
import IconBtn from "@/components/button/withIconBtn/IconBtn";

interface Step3Props {
  onResend: () => void;
  verificationFailed: boolean;
}

/**
 *
 * @param onResend 인증 시간 초기화 요청 함수
 * @param verificationFailed 인증 실패 상태
 * @returns
 */
const Step3 = ({ onResend, verificationFailed }: Step3Props) => {
  const { profileData, updateProfileData } = useProfileContext();
  const [number, setNumber] = useState<string>("");
  const [email, setEmail] = useState<string>(profileData.email);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);
    updateProfileData({ email: value });
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNumber(value);
    updateProfileData({ verificationCode: value });
  };

  const handleResend = () => {
    onResend();
  };

  return (
    <>
      <p className="text-subtext1 text-h4_r text-center mb-8 mt-4">
        재학 중인 학교가 있다면 학교를 등록하고
        <br />
        교내 동아리를 아리아리에서 탐색해 보세요.
      </p>
      <div className="flex justify-between items-center">
        <input
          className="w-[310px] bg-searchbar text-body1_r text-subtext2 py-[14px] px-[22px] rounded-xl 
        focus:border-blue-500 focus:outline-none"
          placeholder="재학중인 학교의 이메일 계정을 입력해 주세요."
          value={email}
          onChange={handleChange}
        />
        <div>
          <IconBtn
            type={"reset"}
            size={"small"}
            title={"재전송"}
            onClick={handleResend}
          />
        </div>
      </div>
      <div
        className="w-full py-2.5 bg-selectedoption_default 
      text-body3_r text-primary text-center rounded-lg mt-3"
      >
        해당 이메일로 인증번호를 발송하였습니다.
        <br />
        인증 메일이 도착하지 않았을시 재전송 버튼을 눌러주세요.
      </div>
      <div className="h-[1px] w-full bg-menuborder mb-8 mt-8" />
      <input
        className="w-full bg-searchbar text-body1_r text-subtext2 py-[14px] px-[22px] rounded-xl 
        focus:border-blue-500 focus:outline-none"
        placeholder="인증번호"
        value={number}
        onChange={handleNumberChange}
      />
      {verificationFailed && (
        <p className="text-noti text-body4_r mt-2 pl-[22px]">
          인증번호를 다시 확인해 주세요.
        </p>
      )}
    </>
  );
};

export default Step3;
