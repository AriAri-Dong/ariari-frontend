"use client";

import { useState } from "react";
import { useUserStore } from "@/providers/userStoreProvider";

import Image from "next/image";
import defaultImg from "@/images/icon/defaultAriari.svg";
import MemberSearch from "../input/memberSearch";
import Alert from "../alert/alert";

import { Delegator } from "@/types/components/delegate";
import { ClubData } from "@/types/club";
import { ClubMemberData, MemberData } from "@/types/member";

import { entrustAdmin } from "@/api/member/api";

interface SelectAdministratorProps {
  club: ClubData;
  selectedUser: Delegator | null;
  setSelectedUser: (label: string, id: string) => void;
}

const SelectAdministrator = ({
  club,
  selectedUser,
  setSelectedUser,
}: SelectAdministratorProps) => {
  const { memberData } = useUserStore((state) => state);

  const [nickname, setNickname] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const isClubMemberData = (
    member: MemberData | ClubMemberData
  ): member is ClubMemberData => "clubMemberRoleType" in member;

  const handleMemberClick = (member: ClubMemberData | MemberData) => {
    if (!isClubMemberData(member)) {
      setAlertMessage("잘못된 멤버 형식입니다.");
      return;
    }

    if (member.memberData.memberId === memberData.memberId) {
      setAlertMessage("본인에게 위임할 수 없습니다.");
      return;
    }
    entrustAdmin(member.id)
      .then(() => {
        setAlertMessage(`${member.name}님에게 위임되었습니다.`);
        setSelectedUser(member.name, member.id);
      })
      .catch(() => {
        setAlertMessage("변경에 실패했습니다.");
      });
  };
  return (
    <div className="flex justify-start items-center px-2.5 py-2 gap-4 md:gap-3.5">
      <Image
        src={club.profileUri || defaultImg}
        alt={"club_image"}
        className="rounded-full object-cover w-12 h-12 md:w-[68px] md:h-[68px]"
      />
      <div className="justify-start items-start flex flex-col">
        <div className="text-text1 text-mobile_h4_sb md:text-h3">
          {club.name}
        </div>
        <div className="flex items-center gap-1 ">
          <div className="text-subtext2 text-mobile_body1_m md:text-body2_m whitespace-nowrap">
            위임대상 :
          </div>
          {selectedUser ? (
            <div className="text-mobile_body1_m md:text-body2_m">
              {selectedUser.name}
            </div>
          ) : (
            <MemberSearch
              nickname={nickname}
              setNickname={setNickname}
              setErrorMessage={setErrorMessage}
              placeholder={"멤버 검색"}
              type="CLUB_MEMBER"
              clubId={club.id}
              handleMemberClick={handleMemberClick}
            />
          )}
        </div>
      </div>
      {/* ====== 알림 ======*/}
      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </div>
  );
};

export default SelectAdministrator;
