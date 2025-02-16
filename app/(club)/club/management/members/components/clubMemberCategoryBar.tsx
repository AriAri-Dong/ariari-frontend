"use client";

import Image from "next/image";

import checkIcon from "@/images/icon/checkBox_checked.svg";
import uncheckIcon from "@/images/icon/checkBox_unchecked.svg";
import SubPullDown from "@/components/pulldown/subPullDown";
import { MEMBER_STATUS_TYPE } from "@/data/pulldown";
import { clubMemberStatusType } from "@/types/member";
import { MAP_STATUS_TO_EN } from "../util/mapStatus";

interface ClubMemberCategoryBarProps {
  selectedMember: string[];
  isAllSelected: boolean;
  toggleSelectAll: () => void;
  clearAllSelections: () => void;
  handleStatusChange: (
    memberId: string[],
    statusType: clubMemberStatusType
  ) => void;
}
const ClubMemberCategoryBar = ({
  selectedMember,
  isAllSelected,
  toggleSelectAll,
  clearAllSelections,
  handleStatusChange,
}: ClubMemberCategoryBarProps) => {
  return (
    <div className="flex justify-between items-center mb-4 text-subtext2 text-mobile_body3_m rounded-[4px] md:text-body1_m  md:mb-5 md:px-6 md:py-1.5 md:bg-white70">
      <div
        className="flex items-center gap-1 md:gap-2.5 flex-[6] cursor-pointer"
        onClick={toggleSelectAll}
      >
        <Image
          src={isAllSelected ? checkIcon : uncheckIcon}
          alt="checkbox"
          width={16}
          height={16}
          className="md:w-5 md:h-5"
        />
        <p>전체 선택</p>
      </div>
      <div className="flex-[4] flex justify-end md:justify-center">
        <div className="md:flex-[2]" />
        <div className="md:flex-[2] flex justify-center">
          <SubPullDown
            optionData={MEMBER_STATUS_TYPE.slice(2)}
            selectedOption={"활동상태 변경"}
            handleOption={(value) => {
              handleStatusChange(selectedMember, MAP_STATUS_TO_EN[value]);
              clearAllSelections();
            }}
          />
        </div>
        <div className="md:flex-[1]" />
      </div>
    </div>
  );
};
export default ClubMemberCategoryBar;
