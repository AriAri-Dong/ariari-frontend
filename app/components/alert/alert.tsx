"use client";

import React, { useEffect, useState } from "react";

interface AlertProps {
  text: string;
  subText?: string;
  onClose?: () => void;
}

/**
 *
 * @param text
 * @param subText
 * @param onClose
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

  return (
    <>
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500">
          <div className="flex flex-col gap-0.5 py-2.5 px-7 bg-black_50 rounded-lg text-center">
            <h1 className="text-mobile_body1_m text-background md:text-body1_m">
              {text}
            </h1>
            <p className="text-mobile_body3_m text-white70 md:text-body3_m">
              {subText}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Alert;
