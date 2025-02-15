"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { MEMBER_STATUS_TYPE } from "@/data/pulldown";
import {
  ClubMemberData,
  clubMemberRoleType,
  clubMemberStatusType,
} from "@/types/member";
import ClubMemberCategoryBar from "./components/clubMemberCategoryBar";
import ClubMemberHeader from "./components/clubMemberHeader";
import ClubMemberList from "./components/clubMemberList";
import MobileMenu from "../../components/menu/mobileMenu";
import LeftMenu from "../../components/menu/leftMenu";
import {
  deleteClubMember,
  entrustAdmin,
  getClubMembers,
  putClubMembersRole,
  putClubMembersStatus,
} from "@/api/members";
import { getClubDetail } from "@/api/club";
import { MAP_STATUS_TO_EN } from "./util/mapStatus";
import { PageInfo } from "@/types/pageInfo";
import PlusBtn from "@/components/button/withIconBtn/plusBtn";

const contentSize = 2;

const ClubMemberPage = () => {
  const params = useSearchParams();
  const clubId = params.get("clubId");
  const router = useRouter();

  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
  const [page, setPage] = useState<number>(0);

  const [selectedOption, setSelectedOption] = useState<string[]>([
    MEMBER_STATUS_TYPE[1].label,
  ]);
  const [clubMember, setClubMember] = useState<ClubMemberData[] | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);
  const [selectedMember, setSelectedMember] = useState<string[]>([]);

  const [myMemberData, setMyMemberData] = useState<ClubMemberData | null>(null);
  const [didMount, setDidMount] = useState(false);

  // 검색 핸들러
  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setPage(0);
    setClubMember(null);
  };
  const handleOption = (value: string) => {
    setSelectedOption([value]);
    setPage(0);
    setClubMember(null);
  };
  // 멤버 선택 toggle
  const toggleMember = (memberId: string) => {
    setSelectedMember((prevSelected) => {
      if (prevSelected.includes(memberId)) {
        return prevSelected.filter((id) => id !== memberId);
      } else {
        if (selectedMember.length + 1 == clubMember?.length) {
        }
        return [...prevSelected, memberId];
      }
    });
  };
  // 멤버 전체 선택 toggle
  const toggleSelectAll = () => {
    setIsAllSelected(!isAllSelected);
    if (isAllSelected) {
      setSelectedMember([]);
    } else {
      const allMemberIds = clubMember?.map((member) => member.memberData.id);
      setSelectedMember(allMemberIds!);
    }
  };
  const clearAllSelections = () => {
    setSelectedMember([]);
  };

  // 동아리 회원 권한 수정
  const handleRoleChange = (memberId: string, newRole: clubMemberRoleType) => {
    // 최고 관리자 권한 위임
    if (newRole === "ADMIN") {
      entrustAdmin(memberId)
        .then(() => {
          alert("권한이 위임되었습니다. 일반회원으로 전환되었습니다.");
          router.push(`/club?clubId=${clubId}`);
        })
        .catch((err) => {
          console.error(err);
          alert("변경에 실패했습니다.");
        });
    } else {
      // ADMIN이 본인 권한 수정
      if (
        myMemberData?.clubMemberRoleType == "ADMIN" &&
        memberId == myMemberData.id
      ) {
        alert("관리자는 본인의 권한을 변경할 수 없습니다.");
        return;
      }
      // 권한 수정
      putClubMembersRole(memberId, newRole)
        .then(() => {
          setClubMember((prevMembers) =>
            prevMembers!.map((member) =>
              member.id == memberId
                ? { ...member, clubMemberRoleType: newRole }
                : member
            )
          );
        })
        .catch((err) => {
          console.error(err);
          alert("변경에 실패했습니다.");
        });
    }
  };
  // 동아리 회원 상태 수정
  const handleStatusChange = (
    memberIds: string[],
    newStatus: clubMemberStatusType
  ) => {
    if (clubId) {
      putClubMembersStatus(clubId, memberIds, newStatus)
        .then(() => {
          setClubMember((prevMembers) =>
            prevMembers!.map((member) =>
              memberIds.includes(member.memberData.id)
                ? { ...member, clubMemberStatusType: newStatus }
                : member
            )
          );
        })
        .catch((err) => {
          console.log(err);
          alert("변경에 실패했습니다.");
        });
    }
  };
  // 동아리 회원 삭제
  const handleDeleteMember = (memberId: string) => {
    if (clubId) {
      deleteClubMember(memberId)
        .then(() => {
          setClubMember((prevMembers) =>
            prevMembers!.filter((member) => member.id !== memberId)
          );
        })
        .catch((err) => {
          console.log(err);
          alert("삭제에 실패했습니다.");
        });
    }
  };

  // 전체 선택 여부
  useEffect(() => {
    if (
      clubMember?.length != 0 &&
      clubMember?.length == selectedMember.length
    ) {
      setIsAllSelected(true);
    } else {
      setIsAllSelected(false);
    }
  }, [selectedMember, clubMember]);

  // 동아리 멤버 리스트
  useEffect(() => {
    if (clubId && didMount) {
      const handleLoadClubMembers = () => {
        getClubMembers(
          clubId!,
          MAP_STATUS_TO_EN[selectedOption[0]],
          searchTerm,
          page,
          contentSize
        )
          .then((res) => {
            setClubMember((prevMembers) =>
              prevMembers
                ? [...prevMembers, ...res.clubMemberDataList]
                : res.clubMemberDataList
            );
            setPageInfo(res.pageInfo);
          })
          .catch((err) => {
            console.error("동아리 회원 목록을 불러오는 데 실패했습니다.", err);
          });
      };
      handleLoadClubMembers();
    }
  }, [clubId, selectedOption, searchTerm, page, didMount]);

  // 내 멤버 정보
  useEffect(() => {
    if (clubId) {
      const fetchClubDetail = async () => {
        try {
          const data = await getClubDetail(clubId);
          setMyMemberData(data.clubMemberData);
        } catch (error) {
          console.error(error);
        }
      };

      fetchClubDetail();
    }
  }, [clubId]);

  useEffect(() => {
    setDidMount(true);
  }, []);

  return (
    <>
      <div className="bg-sub_bg flex justify-center items-center w-full pb-20 md:pb-[124px]">
        <div className="w-full max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-lx px-4 mt-6 md:mt-8 md:px-5">
          <MobileMenu />
          <div className="flex lg:gap-9">
            <LeftMenu />
            <div className="w-full">
              <section>
                <ClubMemberHeader
                  totalSize={pageInfo ? pageInfo?.totalSize : 0}
                  handleSearch={handleSearch}
                  selectedOption={selectedOption}
                  handleOption={handleOption}
                />
              </section>
              <section>
                <ClubMemberCategoryBar
                  selectedMember={selectedMember}
                  isAllSelected={isAllSelected}
                  toggleSelectAll={toggleSelectAll}
                  handleStatusChange={handleStatusChange}
                  clearAllSelections={clearAllSelections}
                />
              </section>
              <section className="flex flex-col gap-2.5 md:gap-4 md:py-2.5 md:rounded-[4px] md:bg-background">
                {clubMember ? (
                  clubMember.length > 0 ? (
                    clubMember.map((member, index) => (
                      <div key={index}>
                        <ClubMemberList
                          data={member}
                          myMemberData={myMemberData!}
                          isSelected={selectedMember?.includes(
                            member.memberData.id
                          )}
                          toggleMember={toggleMember}
                          handleRoleChange={handleRoleChange}
                          handleStatusChange={handleStatusChange}
                          handleDeleteMember={handleDeleteMember}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="text-center p-10 text-subtext1">
                      조건에 맞는 회원을 찾을 수 없습니다.
                    </div>
                  )
                ) : (
                  <div className="text-center p-10 text-subtext1">
                    로딩중...
                  </div>
                )}
              </section>

              {clubMember && pageInfo && pageInfo.totalPages > page + 1 && (
                <div className="flex justify-center mt-9 md:mt-10">
                  <PlusBtn
                    title={"더보기"}
                    onClick={() => {
                      setPage((prev) => prev + 1);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClubMemberPage;
