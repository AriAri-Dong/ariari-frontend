"use client";

import { useState } from "react";
import HeaderSection from "./content/headerSection";
import WithdrawalCard from "@/components/card/withdrawalCard";
import SmallBtn from "@/components/button/basicBtn/smallBtn";
import LargeBtn from "@/components/button/basicBtn/largeBtn";

import { WITHDRAWAL_INFO } from "@/data/withdrawal";

const WithDrawal = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="mt-[46px] mb-20 md:mb-0">
      <HeaderSection />
      <div className="hidden gap-[22px] mt-6 md:flex md:flex-col md:mt-8 md:">
        <h1 className="text-text1 md:text-h1_contents_title">
          Ariari 탈퇴 안내
        </h1>
        <p className="text-subtext2 text-h4">
          Ariari 탈퇴 진행 전, 관련 사항들을 확인해주세요.
        </p>
      </div>
      <div className="flex flex-col gap-10 rounded-8 bg-background mt-5 md:mt-[22px] md:px-6 md:py-[26px]">
        <div className="flex flex-col gap-10 md:gap-12">
          {WITHDRAWAL_INFO.map((info) => (
            <div>
              <WithdrawalCard info={info} />
            </div>
          ))}
        </div>
        <div className="border-t border-menuborder"></div>
        <div>
          <p className="mb-2.5 text-text1 text-mobile_h3 md:text-h3">
            서비스 탈퇴하기
          </p>
          <p className="mb-3.5 text-mobile_body3_r md:text-body1_r text-subtext2 md:mb-6">
            아리아리 서비스 탈퇴시 가입, 개설한 동아리에서 탈퇴처리 되며 올린
            게시글과 댓글이 모두 삭제 되어 복구할 수 없습니다.
          </p>
          <div className="w-full flex px-4 py-3 mb-3.5 bg-searchbar text-mobile_body1_r text-subtext2 rounded-12 justify-between items-center md:hidden">
            <input
              type="text"
              value={inputValue}
              placeholder="'아리아리를 탈퇴합니다'라고 입력해 주세요."
              onChange={handleInputChange}
              maxLength={15}
              className="grow shrink basis-0 bg-tranparent border-none outline-none"
            />
            <div>{`${inputValue.length}/${15}`}</div>
          </div>
          <div className="hidden md:flex">
            <SmallBtn title={"탈퇴하기"} onClick={() => alert("탈퇴")} />
          </div>
          <div className="md:hidden">
            <LargeBtn title={"탈퇴하기"} onClick={() => alert("탈퇴")} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithDrawal;
