"use client";

import React from "react";

interface Step2Props {
  email: string;
  setEmail: (email: string) => void;
}

const Step2: React.FC<Step2Props> = ({ email, setEmail }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <>
      <p className="text-subtext1 text-h4_r text-center mb-8 mt-4">
        재학 중인 학교가 있다면 학교를 등록하고
        <br />
        교내 동아리를 아리아리에서 탐색해 보세요.
      </p>
      <input
        className="w-full bg-searchbar text-body1_r text-subtext2 py-[14px] px-[22px] rounded-xl 
        focus:border-blue-500 focus:outline-none"
        placeholder="재학중인 학교의 이메일 계정을 입력해 주세요."
        value={email}
        onChange={handleChange}
      />
    </>
  );
};

export default Step2;
