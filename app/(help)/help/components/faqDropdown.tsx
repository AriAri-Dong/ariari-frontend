"use client";

import React, { useState } from "react";
import Image from "next/image";
import keyboardArrowDown from "@/images/icon/keyboardArrowDown.svg";
import keyboardArrowUp from "@/images/icon/keyboardArrowUp.svg";
import polygon from "@/images/icon/polygon_4.svg";
import { profileImageMap } from "@/utils/mappingProfile";
import Alert from "@/components/alert/alert";
import { SystemFaqData } from "@/types/service";

interface FaqDropdownProps {
  data: SystemFaqData;
  isOpen: boolean;
  setSelected: (value: number | null) => void;
}

const FaqDropdown = ({ data, isOpen, setSelected }: FaqDropdownProps) => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const onClick = (id: number) => {
    setSelected(isOpen ? null : id);
  };

  return (
    <div className="flex flex-col gap-4 justify-start items-start pt-4 pb-2.5 pl-4 pr-3 md:px-6 md:py-[26px] bg-background rounded-[8px] md:gap-8">
      <div className="w-full justify-between items-center md:flex">
        <div className="w-[62px] h-[24px] flex items-center justify-center mr-10 rounded-[4px] text-mobile_body3_m text-center mb-2.5 md:mb-0 md:w-[66px] md:h-[28px] md:text-body3_m bg-selectedoption_hover text-primary shrink-0">
          FAQ
        </div>
        <div className="w-full flex justify-between items-center md:flex">
          <div className="text-text1 text-mobile_body1_m md:text-h4">
            {data.title}
          </div>
          <button
            className="flex justify-center items-center p-0.5 cursor-pointer"
            onClick={() => onClick(data.id)}
          >
            <Image
              src={isOpen ? keyboardArrowUp : keyboardArrowDown}
              alt="arrow"
              width={28}
              height={28}
            />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="w-full flex-col justify-start items-start gap-8 flex">
          <div className="w-full items-start gap-8 flex md:pl-1">
            <Image
              src={profileImageMap["ARIARI_MONKEY"]}
              alt="club_img"
              width={56}
              height={56}
              className="hidden md:block rounded-full"
            />
            <div className="w-full flex justify-start items-start relative">
              <Image
                src={polygon}
                alt="polygon"
                width={34}
                height={30.5}
                className="hidden absolute left-[-16px] top-[8px] md:block"
              />
              <div className="w-full flex p-3 bg-hover rounded-[12px] justify-start items-center text-subtext2 text-mobile_body1_r md:body1_r md:p-6">
                {data.body}
              </div>
            </div>
          </div>
        </div>
      )}

      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </div>
  );
};

export default FaqDropdown;
