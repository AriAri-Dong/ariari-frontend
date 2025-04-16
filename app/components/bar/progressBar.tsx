import React, { useState, useEffect } from "react";

interface ProgressBarProp {
  disabled?: boolean;
  align?: "horizontal" | "vertical";
  currentStep?: number | null;
  setCurrentStep?: (step: number | null) => void;
}

/**
 *
 * @param disabled 비활성화 상태 (읽기 모드일 경우 true)
 * @param currentStep 초기 상태 및 현재 상태
 * @param align 정렬 상태
 * @returns
 */
const ProgressBar = ({
  disabled = false,
  currentStep,
  setCurrentStep,
  align = "vertical",
}: ProgressBarProp) => {
  const steps = [0, 1, 2, 3, 4];
  const bgColors = [
    "bg-selectedoption_default",
    "bg-selectedoption_hover",
    "bg-selectedoption_pressed",
    "bg-selectedoption_border",
    "bg-primary",
  ];

  const handleStepClick = (step: number) => {
    if (!disabled && setCurrentStep) {
      setCurrentStep(currentStep === step ? null : step);
    }
  };

  return (
    <div
      className={`flex items-center w-full ${
        align === "vertical" && "flex-col max-w-[183px]"
      }`}
    >
      {align === "vertical" && (
        <div className="flex justify-between w-full mb-2 text-subtext2 text-mobile_body3_r md:text-body1_r">
          <span>편안한</span>
          <span>엄숙한</span>
        </div>
      )}
      <span
        className={`text-subtext2 text-mobile_body3_sb md:text-body1_r mr-0.5 ${
          align === "vertical" && "hidden"
        }`}
      >
        편안한
      </span>
      <div
        className={`relative flex items-center ${
          align === "vertical" ? "w-full" : "w-[183px]"
        }`}
      >
        <div className="relative z-10 flex w-full justify-between px-1">
          {steps.map((step, index) => {
            const color = bgColors[index];
            return (
              <div
                key={step}
                className={`h-5 w-full flex-grow mx-0.5 cursor-pointer ${
                  index < (currentStep ?? -1) ? color : "bg-menuborder"
                } ${disabled ? "cursor-default" : ""} ${
                  index === 0 ? "ml-[-2px] rounded-l-20" : ""
                } ${
                  index === steps.length - 1 ? "mr-[-2px] rounded-r-20" : ""
                }`}
                onClick={() => handleStepClick(index + 1)}
              />
            );
          })}
        </div>
      </div>
      <span
        className={`text-subtext2 text-mobile_body3_sb md:text-body1_r ml-0.5 ${
          align === "vertical" && "hidden"
        }`}
      >
        엄숙한
      </span>
    </div>
  );
};

export default ProgressBar;
