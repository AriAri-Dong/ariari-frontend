"use client";

import { useState } from "react";
import HeaderSection from "./content/headerSection";
import WithdrawalCard from "@/components/card/withdrawalCard";
import SmallBtn from "@/components/button/basicBtn/smallBtn";
import LargeBtn from "@/components/button/basicBtn/largeBtn";

import SelectAdministrator from "@/components/card/selectAdministrator";
import LeaveDialog from "@/components/modal/leave/leaveDialog";

import { WITHDRAWAL_INFO } from "@/data/withdrawal";
import { Club_Data } from "@/data/joinedClub";
import { Delegator, JoinedClub } from "@/types/components/delegate";

const WithDrawal = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    if (event.target.value === "아리아리를 탈퇴합니다") {
      setCurrentStep(4);
    } else {
      setCurrentStep(1);
    }
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [currentStep, setCurrentStep] = useState<number>(1);

  const [clubs, setClubs] = useState<JoinedClub[]>(Club_Data);
  const [selectedDelegates, setSelectedDelegates] = useState<
    Record<number, Delegator>
  >({}); // 클럽id, 위임자
  // 각 클럽마다 위임자 저장 (클럽 id, 위임자)

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };
  const handleNext2Step = () => {
    setCurrentStep(currentStep + 2);
  };

  const handleDelegateSelection = (id: number, user: Delegator) => {
    setSelectedDelegates((prev) => ({
      ...prev,
      [id]: user,
    }));
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
          {WITHDRAWAL_INFO.map((info, index) => (
            <div key={index}>
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
              maxLength={11}
              className="grow shrink basis-0 bg-searchbar border-none outline-none"
            />
            <div>{`${inputValue.length}/${11}`}</div>
          </div>
          <div className="md:hidden">
            <div className="mb-3.5 text-mobile_h3">관리자 권한 위임</div>
            <div className="mb-3.5 text-mobile_body3_r text-[#7D8595]">
              회원님이 동아리 관리자로 있는 동아리가 있습니다. 관리자 권한을
              다른 사용자에게 위임해주세요.
            </div>
            <div className="flex flex-col gap-4 mb-5">
              {Club_Data.map((club) => (
                <div key={club.id}>
                  <SelectAdministrator
                    club={club}
                    selectedUser={
                      selectedDelegates[club.id] || { name: "없음", id: "" }
                    }
                    setSelectedUser={(name: string, id: number) => {
                      handleDelegateSelection(club.id, { name, id });
                      console.log(club.name, name, id);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:flex">
            <SmallBtn title={"탈퇴하기"} onClick={handleOpenModal} />
          </div>
          <div className="md:hidden">
            <LargeBtn title={"탈퇴하기"} onClick={handleOpenModal} />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <LeaveDialog
          step={currentStep}
          clubs={clubs}
          handleNextStep={handleNextStep}
          handleNext2Step={handleNext2Step}
          selectedDelegates={selectedDelegates}
          handleDelegateSelection={handleDelegateSelection}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default WithDrawal;
