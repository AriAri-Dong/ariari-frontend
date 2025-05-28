import React from "react";
import Image from "next/image";
import tooltip from "@/images/icon/triangle.svg";

interface TooltipProps {
  message: string;
  children: React.ReactNode;
  position?: "left" | "center" | "right";
}

/**
 *
 * @param message 툴팁 메세지
 * @param children 호버 했을 때 툴팁이 보여져야하는 컴포넌트
 * @param position 기준 컴포넌트 기준 툴팁 위치
 * @returns
 */

const positionStyles = {
  left: "left-0",
  center: "left-1/2 -translate-x-1/2",
  right: "right-0",
};

const arrowPositionStyles = {
  left: "left-6",
  center: "left-1/2 -translate-x-1/2",
  right: "right-6",
};
const Tooltip = ({ message, children, position = "center" }: TooltipProps) => {
  return (
    <div className="relative flex items-center group">
      {children}
      <div
        className={`${positionStyles[position]}  w-max min-w-[200px] z-50 tooltip-content absolute 
        p-2.5 md:py-[18px] mt-4 top-full bg-background text-center text-subtext1 rounded-xl text-base
        hidden group-hover:block shadow-default`}
      >
        {message}
        <Image
          src={tooltip}
          alt={"tooltip"}
          width={24}
          height={24}
          className={`tooltip-arrow absolute top-[-10px] ${arrowPositionStyles[position]}`}
        />
      </div>
    </div>
  );
};

export default Tooltip;
