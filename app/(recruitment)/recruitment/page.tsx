"use client";

import { useEffect, useState } from "react";
import PlusBtn from "@/components/button/withIconBtn/plusBtn";
import FilterSection from "./content/filterSection";
import MainRecruitmentCard from "@/components/card/mainRecruitmentCard";
import HeaderSection from "./content/headerSection";
import { POPULARITY_SORT_TYPE } from "@/data/pulldown";
import { RecruitmentData, RecruitmentResponse } from "@/types/recruitment";
import { ClubSearchCondition, Pageable } from "@/types/api";
import { getAllRecruitments } from "@/api/recruitment/api";

const Recruitment = () => {
  const [recruitmentData, setRecruitmentData] = useState<RecruitmentData[]>([]);
  const [page, setPage] = useState<number>(0);
  const [more, setMore] = useState<boolean>(true);
  const [sortType, setSortType] = useState<string>(
    POPULARITY_SORT_TYPE[0].label
  );

  const [affiliationFilter, setAffiliationFilter] = useState<string | null>(
    null
  );
  const [fieldFilter, setFieldFilter] = useState<string | null>(null);
  const [areaFilter, setAreaFilter] = useState<string | null>(null);
  const [targetFilter, setTargetFilter] = useState<string | null>(null);

  const fetchRecruitments = async (newPage = 0, reset = false) => {
    try {
      const condition: ClubSearchCondition = {
        // clubCategoryTypes: affiliationFilter ? [affiliationFilter] : undefined,
        clubCategoryTypes: fieldFilter ? [fieldFilter] : undefined,
        clubRegionTypes: areaFilter ? [areaFilter] : undefined,
        participantTypes: targetFilter ? [targetFilter] : undefined,
      };

      const pageable: Pageable = {
        page: newPage,
        size: 10,
        sort: sortType === "정렬 기준" ? [] : [sortType],
      };

      const response: RecruitmentResponse = await getAllRecruitments(
        condition,
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
  }, [affiliationFilter, fieldFilter, areaFilter, targetFilter, sortType]);

  return (
    <div>
      <div className="flex flex-col gap-5 mt-5 md:mt-8 md:gap-[22px]">
        <HeaderSection
          setAffiliationFilter={setAffiliationFilter}
          setFieldFilter={setFieldFilter}
          setAreaFilter={setAreaFilter}
          setTargetFilter={setTargetFilter}
          setSortType={setSortType}
        />
        <FilterSection
          sortType={sortType}
          setSortType={setSortType}
          dataCount={recruitmentData.length || 0}
        />
      </div>
      <div className="flex flex-col mt-5 md:mt-7">
        <div className="md:min-h-[450px] min-h-[300px] flex flex-col gap-5 md:gap-x-4 md:gap-y-7 md:flex-row md:flex-wrap md:grid md:grid-cols-3 lx:grid-cols-4">
          <MainRecruitmentCard data={recruitmentData} />
        </div>
        <div className="self-center mt-9 mb-[80px] md:mt-10 md:mb-[124px]">
          {more && (
            <PlusBtn
              title="더보기"
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

export default Recruitment;
