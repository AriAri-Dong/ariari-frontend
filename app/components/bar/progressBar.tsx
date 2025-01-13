import React, { useState } from "react";

const ProgressBar = () => {
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const steps = [0, 1, 2, 3, 4];

  const handleStepClick = (step: number) => {
    if (currentStep === step) {
      setCurrentStep(null);
    } else {
      setCurrentStep(step);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[183px]">
      <div className="flex justify-between w-full mb-2 text-subtext2 text-mobile_body3_r md:text-body1_r">
        <span>편안한</span>
        <span>엄숙한</span>
      </div>

      <div className="relative w-full flex items-center">
        <div className="relative z-10 flex w-full justify-between px-1">
          {steps.map((step, index) => (
            <div
              key={step}
              className={`h-5 w-full flex-grow mx-0.5 cursor-pointer ${
                currentStep !== null && index <= currentStep
                  ? "bg-pulldownmenutext"
                  : "bg-menuborder"
              } ${index === 0 && "ml-[-2px] rounded-l-20"} ${
                index === steps.length - 1 && "mr-[-2px] rounded-r-20"
              }`}
              onClick={() => handleStepClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
