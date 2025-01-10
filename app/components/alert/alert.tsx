"use client";

import React, { useEffect, useState } from "react";

interface AlertProps {
  text: string;
  onClose?: () => void;
}

const Alert = ({ text, onClose }: AlertProps) => {
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
          <div
            className="py-2.5 px-7 text-mobile_body1_m text-background bg-black_50
      md:text-body1_m rounded-lg"
          >
            {text}
          </div>
        </div>
      )}
    </>
  );
};

export default Alert;
