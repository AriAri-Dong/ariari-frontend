"use client";

import { useState } from "react";

import InvitationBtn from "@/components/button/iconBtn/invitationBtn";
import SubSearchBar from "@/components/input/subSearchBar";
import PullDown from "@/components/pulldown/pullDown";
import SubTap from "@/components/tab/subTap";
import InvitaionForm from "./invitationForm";

import { MEMBER_STATUS_TYPE } from "@/data/pulldown";
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
  const [isInvitationModalOpen, setIsInvitationModalOpen] =
    useState<boolean>(false);
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
        <InvitationBtn
          onClick={() => {
            setIsInvitationModalOpen(true);
          }}
          className="p-[10px]"
        />
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
      {isInvitationModalOpen && (
        <InvitaionForm
          onClose={() => {
            setIsInvitationModalOpen(false);
          }}
          onSubmit={() => {}}
        />
      )}
    </div>
  );
};
export default ClubMemberHeader;
