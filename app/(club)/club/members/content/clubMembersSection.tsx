"use client";

import { useState } from "react";

import { MEMBER_STATUS_TYPE, ROLE_TYPE } from "@/data/pulldown";
import { CLUB_MEMBER_DATA } from "@/data/clubMember";
import ClubMemberList from "../components/clubMemberList";
import ClubMemberCategoryBar from "../components/clubMemberCategoryBar";
import ClubMemberHeader from "../components/clubMemberHeader";

const ClubMembersSection = () => {
  const [selectedOption, setSelectedOption] = useState<string[]>([
    MEMBER_STATUS_TYPE[0].label,
  ]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);
  const [selectedMember, setSelectedMember] = useState<number[]>([1, 3, 5]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      console.log(`검색어: ${searchTerm}`);
    }
  };
  const changeStatus = (value: string) => {
    //
  };
  function toggleMember(memberId: number) {
    setSelectedMember((prevSelected) => {
      if (prevSelected.includes(memberId)) {
        return prevSelected.filter((id) => id !== memberId);
      } else {
        return [...prevSelected, memberId];
      }
    });
  }

  function toggleSelectAll() {
    setIsAllSelected(!isAllSelected);
    if (isAllSelected) {
      setSelectedMember([]);
    } else {
      const allMemberIds = CLUB_MEMBER_DATA.map((member) => member.id);
      setSelectedMember(allMemberIds);
    }
  }

  return (
    <div className="w-full m-auto max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-lx pt-6 pb-20 md:pt-8 md:pb-[124px] px-4 md:px-5">
      <section>
        <ClubMemberHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      </section>

      <section>
        <ClubMemberCategoryBar
          isAllSelected={isAllSelected}
          toggleSelectAll={toggleSelectAll}
        />
      </section>

      <section className="flex flex-col gap-2.5 md:gap-4 md:py-2.5 md:rounded-[4px] md:bg-background">
        {CLUB_MEMBER_DATA.map((member, index) => (
          <div key={index}>
            <ClubMemberList
              data={member}
              isSelected={selectedMember?.includes(member.id)}
              toggleMember={toggleMember}
            />
          </div>
        ))}
      </section>
    </div>
  );
};

export default ClubMembersSection;