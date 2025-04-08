import React, { useState, useEffect } from "react";

interface ProgressBarProp {
  disabled?: boolean;
  initialStep?: number | null;
  align?: "horizontal" | "vertical";
}

/**
 *
 * @param disabled 비활성화 상태 (읽기 모드일 경우 true)
 * @param initialStep 초기
 * @param align 정렬 상태
 * @returns
 */
const ProgressBar = ({
  disabled = false,
  initialStep = null,
  align = "vertical",
}: ProgressBarProp) => {
  const [currentStep, setCurrentStep] = useState<number | null>(initialStep);
  const steps = [0, 1, 2, 3, 4];
  const colors = [
    "selectedoption_default",
    "selectedoption_hover",
    "selectedoption_pressed",
    "selectedoption_border",
    "primary",
  ];

  const handleStepClick = (step: number) => {
    if (!disabled) {
      setCurrentStep(currentStep === step ? null : step);
    }
  };

  // 초기 step이 있을 경우 상태 설정
  useEffect(() => {
    if (initialStep !== null) {
      setCurrentStep(initialStep);
    }
  }, [initialStep]);

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
          {steps.map((step, index) => (
            <div
              key={step}
              className={`h-5 w-full flex-grow mx-0.5 cursor-pointer ${
                index <= (currentStep ?? -1)
                  ? `bg-${colors[index]}`
                  : "bg-menuborder"
              } ${disabled ? "cursor-default" : ""} ${
                index === 0 ? "ml-[-2px] rounded-l-20" : ""
              } ${index === steps.length - 1 ? "mr-[-2px] rounded-r-20" : ""}`}
              onClick={() => handleStepClick(index)}
            />
          ))}
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
