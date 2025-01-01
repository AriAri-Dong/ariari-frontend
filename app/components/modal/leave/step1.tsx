import React, { useState } from "react";

import LargeBtn from "@/components/button/basicBtn/largeBtn";

interface StepProps {
  handleNextStep: () => void;
  onClose: () => void;
}

const Step1 = ({ handleNextStep, onClose }: StepProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isInputValid, setIsInputValid] = useState<boolean>(true);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const withdrawalMessage = "아리아리를 탈퇴합니다";

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    if (isSubmitted) {
      setIsInputValid(value === withdrawalMessage);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    if (inputValue === withdrawalMessage) {
      handleNextStep();
    } else {
      setIsInputValid(false);
    }
  };

  return (
    <div className="w-full pt-9 pb-[26px]">
      <h2 className="text-h1_contents_title mb-8 text-center">서비스 탈퇴</h2>
      <div className="w-full mb-8">
        <div className="w-full flex px-[22px] py-[13.5px] bg-searchbar text-mobile_body1_r text-subtext2 rounded-12 justify-between items-center ">
          <input
            type="text"
            value={inputValue}
            placeholder="'아리아리를 탈퇴합니다'라고 입력해 주세요."
            onChange={handleInputChange}
            maxLength={15}
            className="grow shrink basis-0 bg-searchbar border-none outline-none text-subtext1"
          />
          <div>{`${inputValue.length}/${15}`}</div>
        </div>
        {isSubmitted && !isInputValid && (
          <div className="mt-2 ml-[22px] text-body4_r text-noti">
            올바른 내용이 아닙니다.
          </div>
        )}
      </div>

      <LargeBtn title={"다음"} onClick={handleSubmit} />
      <button
        onClick={onClose}
        className="block mx-auto mt-4 px-4 py-2.5 text-[13px] font-semibold text-primary md:text-[15px]"
      >
        취소
      </button>
    </div>
  );
};

export default Step1;
