import React, { useState } from "react";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";
import { Delegator, JoinedClub } from "@/types/components/delegate";

interface LeaveDialogProps {
  clubs: JoinedClub[];
  step: number;
  handleNextStep: () => void;
  handleNext2Step: () => void;
  selectedDelegates: Record<number, Delegator>;
  handleDelegateSelection: (clubId: number, user: Delegator) => void;
  onClose: () => void;
}

const LeaveDialog = ({
  clubs,
  step,
  handleNextStep,
  handleNext2Step,
  selectedDelegates,
  handleDelegateSelection,
  onClose,
}: LeaveDialogProps) => {
  return (
    <div className="fixed inset-0 bg-black_50 flex justify-center items-center z-50">
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="relative flex flex-col w-[430px] px-5 bg-background rounded-16">
        {step === 1 && (
          <Step1 handleNextStep={handleNextStep} onClose={onClose} />
        )}

        {step === 2 && (
          <Step2
            handleNextStep={handleNextStep}
            handleNext2Step={handleNext2Step}
            onClose={onClose}
            isManager={true}
          />
        )}

        {step === 3 && (
          <Step3
            clubs={clubs}
            selectedDelegates={selectedDelegates}
            onDelegateSelect={handleDelegateSelection}
            handleNextStep={handleNextStep}
          />
        )}

        {step === 4 && <Step4 />}
      </div>
    </div>
  );
};

export default LeaveDialog;
