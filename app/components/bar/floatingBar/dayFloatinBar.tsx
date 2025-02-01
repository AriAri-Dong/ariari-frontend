"use client";

import React, { useState, useEffect } from "react";

interface DayFloatingBarProps {
  deadline: Date;
}

const DayFloatingBar = ({ deadline }: DayFloatingBarProps) => {
  const [timeLeft, setTimeLeft] = useState<string>("");

  const calculateTimeLeft = () => {
    const now = new Date();
    const timeDifference = deadline.getTime() - now.getTime();

    if (timeDifference <= 0) return "마감되었습니다";

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((timeDifference / 1000) % 60)
      .toString()
      .padStart(2, "0");

    return days === 0
      ? `${hours}:${minutes}:${seconds}`
      : `${days}일 ${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDeadline = `${
    deadline.getMonth() + 1
  }월 ${deadline.getDate()}일 ${deadline.getHours()}:${deadline
    .getMinutes()
    .toString()
    .padStart(2, "0")} 모집 마감`;

  return (
    <div
      className="fixed bottom-0 left-0 w-full flex justify-center"
      style={{ zIndex: 1000 }}
    >
      <div
        className="w-full bg-white70 shadow-default rounded-56
        max-w-[1048px] mb-9 px-[38px] py-[18px]"
      >
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <p className="text-subtext1 text-mobile_body3_m md:text-body3_m">
              모집 마감까지 남은 시간
            </p>
            <h3 className="text-h3 text-text1">{formattedDeadline}</h3>
          </div>
          <div className="text-primary text-mobile_h1_contents_title md:text-h1_contents_title">
            {timeLeft}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayFloatingBar;
