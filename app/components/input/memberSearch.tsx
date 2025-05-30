import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ClubMemberData, MemberData } from "@/types/member";
import { entrustAdmin, getClubMembers, getMemberList } from "@/api/member/api";
import noimage from "@/images/test/test.svg";
import { profileImageMap } from "@/utils/mappingProfile";

const CONTENT_SIZE = 10;

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [members, setMembers] = useState<(MemberData | ClubMemberData)[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

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
      setPage(0);
      setHasMore(true);
      return;
    }

    setLoading(true);
    // 동아리 회원 검색
    if (type === "CLUB_MEMBER") {
      getClubMembers(props.clubId, undefined, searchTerm, page, CONTENT_SIZE)
        .then((res) => {
          if (res) {
            const newMembers = res.clubMemberDataList;
            setMembers((prev) =>
              page === 0 ? newMembers : [...prev, ...newMembers]
            );
            setHasMore(newMembers.length === CONTENT_SIZE);
            console.log(newMembers.length === CONTENT_SIZE);
          }
        })
        .finally(() => setLoading(false));
      // 통합 회원검색
    } else if (type === "TOTAL_MEMBER") {
      getMemberList(searchTerm, page, CONTENT_SIZE)
        .then((response) => {
          const newMembers = response!.memberDataList;
          setMembers((prev) =>
            page === 0 ? newMembers : [...prev, ...newMembers]
          );
          setHasMore(newMembers.length === CONTENT_SIZE);
        })
        .catch(() => {
          setMembers([]);
          setHasMore(false);
        })
        .finally(() => setLoading(false));
    }
  }, [props, searchTerm, page, type]);

  // 멤버 목록 무한 스크롤
  useEffect(() => {
    const container = document.getElementById("member-scroll-container");
    if (!container) return;

    const handleScroll = () => {
      if (
        container.scrollTop + container.clientHeight >=
          container.scrollHeight - 30 &&
        hasMore &&
        !loading
      ) {
        setPage((prev) => prev + 1);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);
  // 외부 클릭시 드롭다운 닫기

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setNickname("");
          setErrorMessage(null);
          setPage(0);
          setHasMore(true);
        }}
        placeholder={
          placeholder
            ? placeholder
            : "초대하실 사용자의 서비스 닉네임을 작성해 주세요."
        }
        className="w-full flex-grow px-4 py-3 rounded-[12px] bg-searchbar text-mobile_body1_r md:px-[22px] md:py-[13px] md:text-body1_r focus:outline-none  placeholder:text-subtext2"
      />
      {searchTerm && !nickname && (
        <div
          id="member-scroll-container"
          className="absolute w-full bg-white border rounded-12 mt-2 max-h-[400px] md:max-h-[282px] overflow-y-auto shadow-default no-scrollbar z-10"
        >
          {loading && members.length === 0 ? (
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
