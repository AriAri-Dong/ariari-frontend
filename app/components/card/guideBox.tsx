"use client";

import { useState } from "react";

import Image from "next/image";
import error from "@/images/icon/error.svg";
import keyboardArrowDown from "@/images/icon/keyboardArrowDown.svg";
import keyboardArrowUp from "@/images/icon/keyboardArrowUp.svg";
import { GuideData } from "@/types/components/card";

interface GuidBoxProps {
  data: GuideData;
  className?: string;
}
const GuidBox = ({ data, className }: GuidBoxProps) => {
  const [isContentVisible, setIsContentVisible] = useState<boolean>(true);

  return (
    <div
      className={`py-4 pr-[18px] pl-2.5 bg-slate-100 rounded-xl flex-col justify-start items-start gap-2.5 flex  md:p-4 ${className}`}
    >
      <div className="w-full flex-col justify-start items-start gap-2.5 flex">
        <div className="w-full justify-between items-center flex">
          <div className="items-center gap-2 flex">
            <Image
              src={error}
              alt={"error"}
              width={18}
              height={18}
              className="md:w-6 md:h-6"
            />
            <div className="text-mobile_body1_sb text-icon md:text-body1_sb">
              {data.title}
            </div>
          </div>
          <div className="justify-between items-center flex overflow-hidden">
            <Image
              src={isContentVisible ? keyboardArrowUp : keyboardArrowDown}
              alt={"keyboardArrowUp"}
              width={24}
              height={24}
              className="md:w-7 md:h-7 cursor-pointer"
              onClick={() => {
                setIsContentVisible(!isContentVisible);
              }}
            />
          </div>
        </div>

        {isContentVisible && (
          <div className="flex flex-col gap-2 text-body3_m text-icon md:gap-1">
            {data.instructions.map((instruction, index) => (
              <div key={index} className="flex gap-1">
                <p>{index + 1}.</p>
                <div>{instruction}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GuidBox;
