"use client";

import Image from "next/image";

import checkIcon from "@/images/icon/checkBox.svg";
import uncheckIcon from "@/images/icon/emptyCheckBox.svg";
import SubPullDown from "@/components/pulldown/subPullDown";
import { MEMBER_STATUS_TYPE } from "@/data/pulldown";

interface ClubMemberCategoryBarProps {
  isAllSelected: boolean;
  toggleSelectAll: () => void;
}
const ClubMemberCategoryBar = ({
  isAllSelected,
  toggleSelectAll,
}: ClubMemberCategoryBarProps) => {
  return (
    <div className="flex justify-between items-center mb-4 text-subtext2 text-mobile_body3_m rounded-[4px] md:text-body1_m  md:mb-5 md:px-6 md:py-1.5 md:bg-white70">
      <div className="flex gap-1 md:gap-2.5 flex-[6]">
        <Image
          src={isAllSelected ? checkIcon : uncheckIcon}
          alt="checkbox"
          width={16}
          height={16}
          onClick={toggleSelectAll}
          className="md:w-5 md:h-5 cursor-pointer"
        />
        <p>전체 선택</p>
      </div>
      <div className="flex-[4] flex justify-end md:justify-center">
        <div>
          <SubPullDown
            optionData={MEMBER_STATUS_TYPE.slice(1)}
            selectedOption={"활동상태 변경"}
            handleOption={() => {}}
          />
        </div>
      </div>
    </div>
  );
};
export default ClubMemberCategoryBar;
