"use client";

import React, { useState } from "react";

import { ProfileProvider } from "@/context/profileConetxt";
import ProfileSetting from "./profileSetting";
import Step4 from "./step4";

interface LoginModalProps {
  onClose: () => void;
}

const ProfileSettingModal = ({ onClose }: LoginModalProps) => {
  const [step, setStep] = useState<number>(0);

  const handleNextStep = (nextStep: number) => {
    setStep(nextStep);
  };

  const handleClose = () => {
    setStep(1);
    onClose();
  };

  return (
    <ProfileProvider>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="absolute inset-0" onClick={handleClose} />
        {step < 4 ? (
          <ProfileSetting step={step} onNextStep={handleNextStep} />
        ) : (
          <Step4 />
        )}
      </div>
    </ProfileProvider>
  );
};

export default ProfileSettingModal;
