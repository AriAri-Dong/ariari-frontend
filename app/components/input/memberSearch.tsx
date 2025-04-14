import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ClubMemberData, MemberData } from "@/types/member";
import { entrustAdmin, getClubMembers, getMemberList } from "@/api/member/api";
import noimage from "@/images/test/test.svg";
import { profileImageMap } from "@/utils/mappingProfile";
import Alert from "../alert/alert";

// 공통 속성
interface BaseMemberSearchProps {
  nickname: string;
  setNickname: (value: string) => void;
  setErrorMessage: (value: string | null) => void;
  placeholder?: string;
  handleMemberClick?: (member: MemberData | ClubMemberData) => void;
}

// TOTAL_MEMBER용
interface TotalMemberSearchProps extends BaseMemberSearchProps {
  type: "TOTAL_MEMBER";
}

// CLUB_MEMBER용
interface ClubMemberSearchProps extends BaseMemberSearchProps {
  type: "CLUB_MEMBER";
  clubId: string;
}

const MemberSearch = (
  props: TotalMemberSearchProps | ClubMemberSearchProps
) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [members, setMembers] = useState<(MemberData | ClubMemberData)[]>([]);
  const [loading, setLoading] = useState(false);
  const {
    nickname,
    setNickname,
    setErrorMessage,
    placeholder,
    type,
    handleMemberClick,
  } = props;

  const isClubMemberData = (
    member: MemberData | ClubMemberData
  ): member is ClubMemberData => "clubMemberRoleType" in member;

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setMembers([]);
      return;
    }

    setLoading(true);
    if (type === "CLUB_MEMBER") {
      getClubMembers(props.clubId, undefined, searchTerm)
        .then((res) => {
          if (res) {
            setMembers(res.clubMemberDataList);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (type === "TOTAL_MEMBER") {
      getMemberList(searchTerm)
        .then((response) => {
          setMembers(response!.memberDataList);
        })
        .catch(() => {
          setMembers([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [props, searchTerm, type]);

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setNickname("");
          setErrorMessage(null);
        }}
        placeholder={
          placeholder
            ? placeholder
            : "초대하실 사용자의 서비스 닉네임을 작성해 주세요."
        }
        className="w-full flex-grow px-4 py-3 rounded-[12px] bg-searchbar text-mobile_body1_r md:px-[22px] md:py-[13px] md:text-body1_r focus:outline-none  placeholder:text-subtext2"
      />
      {searchTerm && !nickname && (
        <div className="absolute w-full bg-white border rounded-12 mt-2 max-h-[400px] md:max-h-[282px] overflow-y-auto shadow-default no-scrollbar z-10">
          {loading ? (
            <p className="p-3 text-center">Loading...</p>
          ) : members.length > 0 ? (
            members.map((member, idx) => {
              const name = isClubMemberData(member)
                ? member.name
                : member.nickname;
              const profileImg = isClubMemberData(member)
                ? member.memberData.profileType
                : member.profileType;
              return (
                <div
                  key={idx}
                  className="flex items-center px-2 md:px-4 py-2.5 gap-[14px] md:gap-3 hover:bg-hover active:bg-pressed cursor-pointer"
                  onClick={() => {
                    setNickname(name);
                    setSearchTerm(name);
                    if (handleMemberClick) {
                      handleMemberClick(member);
                    }
                  }}
                >
                  <Image
                    src={profileImg ? profileImageMap[profileImg] : noimage}
                    alt={"profile_img"}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <span className="text-body1_sb text-text1 text-mobile_body1_m">
                    {name}
                  </span>
                </div>
              );
            })
          ) : (
            <p className="p-3 text-center">검색 결과가 없습니다</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MemberSearch;
