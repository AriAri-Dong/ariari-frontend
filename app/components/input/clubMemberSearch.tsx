import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ClubMemberData, MemberData } from "@/types/member";
import { entrustAdmin, getClubMembers, getMemberList } from "@/api/member/api";
import noimage from "@/images/test/test.svg";
import searchIcon from "@/images/icon/search.svg";

import { profileImageMap } from "@/utils/mappingProfile";

const CONTENT_SIZE = 10;

interface ClubMemberSearchProps {
  clubId: string;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  setErrorMessage: (value: string | null) => void;
  placeholder?: string;
  handleMemberClick?: (member: ClubMemberData) => void;
}

const ClubMemberSearch = ({
  clubId,
  searchTerm,
  setSearchTerm,
  setErrorMessage,
  placeholder,
  handleMemberClick,
}: ClubMemberSearchProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [members, setMembers] = useState<ClubMemberData[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setMembers([]);
      setPage(0);
      setHasMore(true);
      return;
    }

    setLoading(true);
    // 동아리 회원 검색
    getClubMembers(clubId, undefined, searchTerm, page, CONTENT_SIZE)
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
  }, [clubId, searchTerm, page]);

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
  }, [setSearchTerm]);

  return (
    <div className="relative w-full" ref={containerRef}>
      <div className="w-full flex flex-grow gap-3 px-4 py-3 rounded-[12px] bg-searchbar md:gap-4 md:px-[22px] md:py-[13px] focus:outline-none">
        <Image
          src={searchIcon}
          alt="search"
          width={20}
          height={20}
          className="md:w-6 md:h-6"
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setErrorMessage(null);
            setPage(0);
            setHasMore(true);
          }}
          placeholder={
            placeholder ? placeholder : "동아리 활동 이름을 검색해 보세요."
          }
          className="w-full flex-grow bg-searchbar text-mobile_body1_r md:text-body1_r focus:outline-none placeholder:text-subtext2"
        />
      </div>
      {searchTerm && (
        <div
          id="member-scroll-container"
          className="absolute w-full bg-white border rounded-12 mt-2 max-h-[400px] md:max-h-[282px] overflow-y-auto shadow-default no-scrollbar z-10"
        >
          {loading && members.length === 0 ? (
            <p className="p-3 text-center">Loading...</p>
          ) : members.length > 0 ? (
            members.map((member, idx) => {
              return (
                <div
                  key={idx}
                  className="flex items-center px-2 md:px-4 py-2.5 gap-[14px] md:gap-3 hover:bg-hover active:bg-pressed cursor-pointer"
                  onClick={() => {
                    if (handleMemberClick) {
                      handleMemberClick(member);
                      setSearchTerm("");
                    }
                  }}
                >
                  <Image
                    src={
                      member.memberData.profileType
                        ? profileImageMap[member.memberData.profileType]
                        : noimage
                    }
                    alt={"profile_img"}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <div className="text-body1_sb text-text1 text-mobile_body1_m">
                      {member.name}
                    </div>
                    <div>{member.memberData.nickname}</div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="p-3 text-center">검색 결과가 없습니다</p>
          )}
        </div>
      )}
      <div></div>
    </div>
  );
};

export default ClubMemberSearch;
