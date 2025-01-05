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
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="backdrop-blur-sm bg-black_50 py-2.5 px-7 rounded-lg">
        <span className="text-mobile_body1_m text-background md:text-body1_m">
          {text}
        </span>
      </div>
    </div>
  );
};

export default Alert;
