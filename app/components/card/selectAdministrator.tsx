"use client";

import Image from "next/image";
import SubPullDown from "../pulldown/subPullDown";
import { Delegator, JoinedClub } from "@/types/components/delegate";

interface SelectAdministratorProps {
  club: JoinedClub;
  selectedUser: Delegator;
  setSelectedUser: (label: string, id: number) => void;
}

const SelectAdministrator = ({
  club,
  selectedUser,
  setSelectedUser,
}: SelectAdministratorProps) => {
  return (
    <div className="flex justify-start items-center px-2.5 py-2 gap-4 md:gap-3.5">
      <Image
        src={club.image}
        alt={"club_image"}
        className="rounded-full object-cover w-12 h-12 md:w-[68px] md:h-[68px]"
      />
      <div className="justify-start items-start flex flex-col">
        <div className="text-text1 text-mobile_h4_sb md:text-h3">
          {club.name}
        </div>
        <div className="flex items-center gap-1 ">
          <div className="text-subtext2 text-mobile_body1_m md:text-body2_m">
            위임대상 :
          </div>
          <SubPullDown
            optionData={club.users}
            selectedOption={selectedUser.name}
            handleOptionWithId={setSelectedUser}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectAdministrator;
