"use client";

import InvitationBtn from "@/components/button/iconBtn/invitationBtn";
import SubSearchBar from "@/components/input/subSearchBar";
import PullDown from "@/components/pulldown/pullDown";
import SubTap from "@/components/tab/subTap";
import { useState } from "react";

import Image from "next/image";

import checkIcon from "@/images/icon/checkBox.svg";
import uncheckIcon from "@/images/icon/emptyCheckBox.svg";
import SubPullDown from "@/components/pulldown/subPullDown";
import { MEMBER_STATUS_TYPE, ROLE_TYPE } from "@/data/pulldown";
import { CLUB_MEMBER_DATA } from "@/data/clubMember";
import DeleteBtn from "@/components/button/iconBtn/deleteBtn";
import TokenPullDown from "@/components/pulldown/tokenPullDown";
import { MAP_ROLE_TO_KO } from "../util/mapRole";
import ClubMemberList from "../components/clubMemberList";
import ClubMemberCategoryBar from "../components/clubMemberCategoryBar";
interface ClubMemberHeaderProps {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  handleSearch: (searchTerm: string) => void;
  selectedOption: string[];
  setSelectedOption: (value: string[]) => void;
}
const ClubMemberHeader = ({
  searchTerm,
  setSearchTerm,
  handleSearch,
  selectedOption,
  setSelectedOption,
}: ClubMemberHeaderProps) => {
  return (
    <div>
      <SubSearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
        placeholder="동아리원 이름"
        className="md:hidden mb-2"
      />
      <div className="flex justify-between items-center mb-4 md:mb-[22px] ">
        <div className="hidden mb-2 md:block">
          <SubTap optionData={MEMBER_STATUS_TYPE.slice(1)} />
        </div>
        <div className="md:hidden">
          <PullDown
            optionData={MEMBER_STATUS_TYPE}
            selectedOption={selectedOption}
            handleOption={([value]) => setSelectedOption([value])}
            optionSize="small"
          />
        </div>
        <InvitationBtn onClick={() => {}} className="p-2.5" />
      </div>
      <div className="flex justify-between items-center mb-4 md:mb-[22px]">
        <p className="text-subtext2 text-mobile_body2_m md:text-h4">
          총 nnn명의 회원이 있어요
        </p>
        <SubSearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
          placeholder="동아리원 이름"
          className="hidden md:flex md:w-[270px]"
        />
      </div>
    </div>
  );
};
export default ClubMemberHeader;
