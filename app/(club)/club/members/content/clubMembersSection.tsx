"use client";

import { useEffect, useState } from "react";

import ClubMemberList from "../components/clubMemberList";
import ClubMemberCategoryBar from "../components/clubMemberCategoryBar";
import ClubMemberHeader from "../components/clubMemberHeader";
import LeftMenu from "../../components/menu/leftMenu";
import { MEMBER_STATUS_TYPE } from "@/data/pulldown";
import { CLUB_MEMBER_DATA } from "@/data/clubMembers";
import { ClubMemberData } from "@/types/member";

const ClubMembersSection = () => {
  const [selectedOption, setSelectedOption] = useState<string[]>([
    MEMBER_STATUS_TYPE[0].label,
  ]);
  const [clubMember, setClubMember] =
    useState<ClubMemberData[]>(CLUB_MEMBER_DATA);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);
  const [selectedMember, setSelectedMember] = useState<number[]>([]);

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
        if (selectedMember.length + 1 == clubMember.length) {
        }
        return [...prevSelected, memberId];
      }
    });
  }

  function toggleSelectAll() {
    setIsAllSelected(!isAllSelected);
    if (isAllSelected) {
      setSelectedMember([]);
    } else {
      const allMemberIds = clubMember.map((member) => member.id);
      setSelectedMember(allMemberIds);
    }
  }

  useEffect(() => {
    if (clubMember.length == selectedMember.length) {
      setIsAllSelected(true);
    } else {
      setIsAllSelected(false);
    }
  }, [selectedMember, clubMember]);

  return (
    <div className="pt-6 pb-20 md:pt-8 md:pb-[124px]">
      <div className="flex lg:gap-9">
        <LeftMenu />
        <div className="w-full">
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
            {clubMember.map((member, index) => (
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
      </div>
    </div>
  );
};

export default ClubMembersSection;
