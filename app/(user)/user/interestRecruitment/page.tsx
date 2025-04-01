"use client";

import React, { useEffect, useState } from "react";
import { POPULARITY_SORT_TYPE } from "@/data/pulldown";
import HeaderSection from "./content/headerSection";
import FilterSection from "./content/filterSection";
import PlusBtn from "@/components/button/withIconBtn/plusBtn";
import MainRecruitmentCard from "@/components/card/mainRecruitmentCard";
import { RecruitmentData, RecruitmentResponse } from "@/types/recruitment";
import { getBookmarkRecruitment } from "@/api/recruitment/api";
import { Pageable } from "@/types/api";

const InterestRecruitmentPage = () => {
  const [recruitmentData, setRecruitmentData] = useState<RecruitmentData[]>([]);
  const [page, setPage] = useState<number>(0);
  const [more, setMore] = useState<boolean>(true);
  const [isDeadlineChecked, setIsDeadlineChecked] = useState<boolean>(false);
  const [isRecruitmentChecked, setIsRecruitmentChecked] =
    useState<boolean>(false);
  const [sortType, setSortType] = useState<string>(
    POPULARITY_SORT_TYPE[0].label
  );

  const toggleDeadlineCheck = () => {
    setIsDeadlineChecked(!isDeadlineChecked);
  };

  const toggleRecruitmentCheck = () => {
    setIsRecruitmentChecked(!isRecruitmentChecked);
  };

  // 모집 목록
  const fetchRecruitments = async (newPage = 0, reset = false) => {
    try {
      const pageable: Pageable = {
        page: newPage,
        size: 10,
        sort: sortType === "정렬 기준" ? [""] : [sortType],
      };

      const response: RecruitmentResponse = await getBookmarkRecruitment(
        pageable
      );

      if (reset) {
        setRecruitmentData(response.recruitmentDataList);
      } else {
        setRecruitmentData((prev) => [
          ...prev,
          ...response.recruitmentDataList,
        ]);
      }

      if (newPage + 1 >= response.pageInfo.totalPages) {
        setMore(false);
      }
    } catch (error) {
      console.error("Error fetching recruitments:", error);
    }
  };

  useEffect(() => {
    fetchRecruitments(0, true);
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-5 mt-[46px] md:mt-8 md:gap-[22px]">
        <HeaderSection />
        <FilterSection
          isDeadlineChecked={isDeadlineChecked}
          isRecruitmentChecked={isRecruitmentChecked}
          toggleDeadlineCheck={toggleDeadlineCheck}
          toggleRecruitmentCheck={toggleRecruitmentCheck}
          sortType={sortType}
          setSortType={setSortType}
          dataCount={recruitmentData.length || 0}
        />
      </div>
      <div className="flex flex-col mt-5 md:mt-7">
        <div
          className="md:min-h-[450px] min-h-[300px] flex flex-col gap-5 md:gap-x-4 md:gap-y-7 md:flex-row md:flex-wrap
    md:grid md:grid-cols-3 lx:grid-cols-4"
        >
          <MainRecruitmentCard data={recruitmentData} />
        </div>
        <div className="self-center mt-9 mb-[80px] md:mt-10 md:mb-[124px]">
          {more && (
            <PlusBtn
              title={"더보기"}
              onClick={() => {
                const nextPage = page + 1;
                setPage(nextPage);
                fetchRecruitments(nextPage);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default InterestRecruitmentPage;
