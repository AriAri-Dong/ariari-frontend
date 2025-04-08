"use client";

import React, { useEffect, useState } from "react";

export interface AlertProps {
  text: string;
  subText?: string;
  onClose?: () => void;
}

/**
 * Alert component
 * @param text main 텍스트
 * @param subText sub 텍스트
 * @param onClose 닫기 핸들러
 * @returns
 */
const Alert = ({ text, subText, onClose }: AlertProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
      if (onClose) {
        onClose();
      }
    }, 800);

    return () => clearTimeout(timeout);
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-1000 flex items-center justify-center transition-opacity duration-500"
      style={{ zIndex: 1000 }}
    >
      <div className="flex flex-col gap-0.5 py-2.5 px-7 bg-black_50 rounded-lg text-center">
        <h1
          className="text-mobile_body1_m text-background md:text-body1_m"
          dangerouslySetInnerHTML={{ __html: text }}
        />
        {subText && (
          <p
            className="text-mobile_body3_m text-white70 md:text-body3_m"
            dangerouslySetInnerHTML={{ __html: subText }}
          />
        )}
      </div>
    </div>
  );
};

export default Alert;
