"use client";

import React, { useState } from "react";
import { ProfileProvider } from "@/context/profileConetxt";
import MobileProfileSetting from "./mobileProfileSetting";

interface ProfileSettingProps {
  onClose: () => void;
  onSignupSuccess: () => void;
}

const MobileProfileSettingModal = ({
  onClose,
  onSignupSuccess,
}: ProfileSettingProps) => {
  const [step, setStep] = useState<number>(0);

  const handleNextStep = (nextStep: number) => {
    setStep(nextStep);
  };

  return (
    <ProfileProvider>
      <MobileProfileSetting
        step={step}
        onNextStep={handleNextStep}
        onClose={onClose}
        onSignupSuccess={onSignupSuccess}
      />
    </ProfileProvider>
  );
};

export default MobileProfileSettingModal;
