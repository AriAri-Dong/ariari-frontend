"use client";

import React, { useEffect, useState } from "react";
import { Metadata } from "next";
import ClubInfoCard from "@/components/card/clubInfoCard";
import ClubIntroduction from "@/components/card/clubIntroduction";
import PlusBtn from "@/components/button/withIconBtn/plusBtn";
import { getAllClubsInfo } from "@/api/club/api";
import {
  ClubData,
  ClubResponse,
  ClubSearchCondition,
  Pageable,
} from "@/types/api";

export const metadata: Metadata = {
  title: "동아리 목록 탐색 | 관심 있는 동아리를 찾아보세요",
  description:
    "다양한 분야와 성격의 동아리를 탐색하고 원하는 동아리를 쉽게 찾을 수 있습니다.",
  openGraph: {
    title: "동아리 목록 탐색 | 관심 있는 동아리를 찾아보세요",
    description:
      "다양한 분야와 성격의 동아리를 탐색하고 원하는 동아리를 쉽게 찾을 수 있습니다.",
    url: "https://ariari.com/exploration",
    siteName: "아리아리",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "아리아리",
      },
    ],
    type: "website",
  },
};

const Exploration = () => {
  const [clubData, setClubData] = useState<ClubData[]>([]);
  const [page, setPage] = useState<number>(0);
  const [more, setMore] = useState<boolean>(true);
  const [totalSize, setTotalSize] = useState<number>(0);

  // 동아리 리스트 조회
  const fetchClubs = async (newPage = 0, reset = false) => {
    try {
      const condition: ClubSearchCondition = {
        clubCategoryTypes: undefined,
        clubRegionTypes: undefined,
        participantTypes: undefined,
      };

      const pageable: Pageable = {
        page: newPage,
        size: 10,
        sort: [""],
      };

      const response: ClubResponse = await getAllClubsInfo(condition, pageable);
      console.log("전체 동아리 리스트:", response);

      if (reset) {
        setClubData(response.clubDataList);
      } else {
        setClubData((prev) => [...prev, ...response.clubDataList]);
      }

      setTotalSize(response.pageInfo.totalSize);

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
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-5 mt-5 md:mt-8 md:gap-[22px]">
        <h1 className="text-text1 text-mobile_h1_contents_title md:text-h1_contents_title ">
          동아리 탐색
        </h1>
        <p className="text-subtext2 text-mobile_body2_m md:text-h4">
          총 {totalSize}개의 동아리가 있어요.
        </p>
      </div>
      {/* 데이터가 없을 경우 최소 높이 추가 (**통일 필요**) */}
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
          {totalSize > 10 && clubData.length < totalSize && more && (
            <PlusBtn
              title={"더보기"}
              onClick={() => {
                const nextPage = page + 1;
                setPage(nextPage);
                fetchClubs(nextPage);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Exploration;
