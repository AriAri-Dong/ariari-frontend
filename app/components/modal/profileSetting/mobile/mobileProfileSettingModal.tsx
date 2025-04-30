"use client";

import React, { useState } from "react";
import { ProfileProvider } from "@/context/profileConetxt";
import MobileProfileSetting from "./mobileProfileSetting";

interface ProfileSettingProps {
  onClose: () => void;
}

const MobileProfileSettingModal = ({ onClose }: ProfileSettingProps) => {
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
      />
    </ProfileProvider>
  );
};

export default MobileProfileSettingModal;
