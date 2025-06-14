"use client";

import React, { useEffect, useState } from "react";
import PlusBtn from "@/components/button/withIconBtn/plusBtn";
import ClubInfoCard from "@/components/card/clubInfoCard";
import ClubIntroduction from "@/components/card/clubIntroduction";
import { POPULARITY_SORT_TYPE } from "@/data/pulldown";
import { ClubData, ClubResponse, Pageable } from "@/types/api";
import { getBookmarkClubsInfo } from "@/api/club/api";
import HeaderSection from "./headerSection";
import FilterSection from "./filterSection";
import RequiredLogin from "@/components/feedback/requiredLogin";
import { useUserStore } from "@/stores/userStore";

const MainSection = () => {
  const user = useUserStore((state) => state.user);
  const isSignIn = !!user;

  const [clubData, setClubData] = useState<ClubData[]>([]);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [more, setMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const [sortType, setSortType] = useState<string>(
    POPULARITY_SORT_TYPE[0].label
  );

  const toggleCheck = () => {
    setIsChecked(!isChecked);
  };

  // 동아리 리스트 조회
  const fetchClubs = async (newPage = 0, reset = false) => {
    try {
      const pageable: Pageable = {
        page: newPage,
        size: 10,
        sort: [""],
      };

      const response: ClubResponse = await getBookmarkClubsInfo(
        isChecked,
        pageable
      );
      console.log("북마크 동아리 리스트:", response);

      if (reset) {
        setClubData(response.clubDataList);
      } else {
        setClubData((prev) => [...prev, ...response.clubDataList]);
      }

      if (
        response.clubDataList.length === 0 ||
        newPage + 1 >= response.pageInfo.totalPages
      ) {
        setMore(false);
      }
    } catch (error) {
      console.error("동아리 정보 가져오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchClubs(0, true);
  }, [isChecked]);

  if (!isSignIn) {
    <RequiredLogin />;
  }

  return (
    <div>
      <div className="flex flex-col gap-5 mt-[46px] md:mt-8 md:gap-[22px]">
        <HeaderSection />
        <FilterSection
          isChecked={isChecked}
          toggleCheck={toggleCheck}
          sortType={sortType}
          setSortType={setSortType}
          totalCount={clubData.length}
        />
      </div>
      <div className="min-h-[300px] md:min-h-[450px] flex flex-col">
        <div className="grid grid-cols-1 mt-5 gap-6 md:grid-cols-2 md:gap-[18px] md:mt-7">
          {clubData.map((club) => (
            <div
              key={club.id}
              className="flex flex-col gap-[14px] md:gap-[22px] md:mt-[18px]"
            >
              <ClubInfoCard
                id={club.id}
                name={club.name}
                profileUri={club.profileUri}
                body={club.body}
                bannerUri={club.bannerUri}
                clubCategoryType={club.clubCategoryType || "-"}
                clubRegionType={club.clubRegionType || "-"}
                participantType={club.participantType || "-"}
                isMyBookmark={club.isMyBookmark}
                schoolData={club.schoolData}
                bookmarkCount={club.bookmarkCount}
              />
              <ClubIntroduction
                introductionText={club.body}
                badgeType={club.badgeType}
              />
            </div>
          ))}
        </div>
        <div className="self-center mt-9 mb-[80px] md:mt-10 md:mb-[124px]">
          {clubData.length > 10 && (
            <>
              {more && (
                <PlusBtn
                  title={"더보기"}
                  onClick={() => {
                    const nextPage = page + 1;
                    setPage(nextPage);
                    fetchClubs(nextPage);
                  }}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainSection;
