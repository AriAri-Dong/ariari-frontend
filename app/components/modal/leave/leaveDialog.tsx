import React, { useState } from "react";
import Step1 from "./step1";
import Step4 from "./step4";
import { Delegator, JoinedClub } from "@/types/components/delegate";
import NotiPopUp from "../notiPopUp";
import Step2 from "./step2";

interface LeaveDialogProps {
  clubs: JoinedClub[];
  step: number;
  handleNextStep: () => void;
  handleNext2Step: () => void;
  selectedDelegates: Record<number, Delegator>;
  handleDelegateSelection: (clubId: number, user: Delegator) => void;
  onClose: () => void;
  inputValue: string;
  setInputValue: (value: string) => void;
}

/**
 *
 * @param clubs 관리자인 동아리
 * @param step 모집 시작 날짜
 * @param handleNextStep step + 1
 * @param handleNext2Step step + 2
 * @param selectedDelegates 선택된 위임자 [(clubid,{name, userid}),..]
 * @param handleDelegateSelection s위임자 선택 핸들러
 * @param onClose 모달 닫기
 * @param inputValue 탈퇴 문구 입력상태
 * @param setInputValue inputValue set
 * @returns
 */

const LeaveDialog = ({
  clubs,
  step,
  inputValue,
  setInputValue,
  handleNextStep,
  selectedDelegates,
  handleDelegateSelection,
  onClose,
}: LeaveDialogProps) => {
  return (
    <div>
      {step !== 3 && (
        <div
          className={`hidden md:flex fixed inset-0 bg-black_50 justify-center items-center z-50 `}
        >
          <div className="absolute inset-0" onClick={onClose}></div>

          <div className="relative flex flex-col w-[430px] px-5 bg-background rounded-16">
            {step === 1 && (
              <Step1
                handleNextStep={handleNextStep}
                onClose={onClose}
                inputValue={inputValue}
                setInputValue={setInputValue}
              />
            )}

            {step === 2 && (
              <Step2
                clubs={clubs}
                selectedDelegates={selectedDelegates}
                onDelegateSelect={handleDelegateSelection}
                handleNextStep={handleNextStep}
              />
            )}

            {step === 4 && <Step4 />}
          </div>
        </div>
      )}

      {step === 3 && (
        <NotiPopUp
          onClose={onClose}
          icon={"not"}
          title={"정말 탈퇴하시겠습니까?"}
          description="아리아리 서비스 탈퇴시 일부 기능이 제한됩니다."
          firstButton={handleNextStep}
          firstButtonText="예"
          secondButton={onClose}
          secondButtonText="아니오"
          modalType="button"
        />
      )}
    </div>
  );
};

export default LeaveDialog;
