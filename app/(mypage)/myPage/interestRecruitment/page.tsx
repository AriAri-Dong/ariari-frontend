"use client";

import { useState } from "react";
import { Popularity_Sort_Type } from "@/data/pulldown";
import HeaderSection from "./content/headerSection";
import FilterSection from "./content/filterSection";
import PlusBtn from "@/components/button/withIconBtn/plusBtn";
import MainRecruitmentCard from "@/components/card/mainRecruitmentCard";
import { MAIN_RECRUITMENT_CARD } from "@/data/main";

const InterestRecruitmentPage = () => {
  const [isDeadlineChecked, setIsDeadlineChecked] = useState<boolean>(false);
  const [isRecruitmentChecked, setIsRecruitmentChecked] =
    useState<boolean>(false);
  const [sortType, setSortType] = useState<string>(
    Popularity_Sort_Type[0].label
  );

  const toggleDeadlineCheck = () => {
    setIsDeadlineChecked(!isDeadlineChecked);
  };

  const toggleRecruitmentCheck = () => {
    setIsRecruitmentChecked(!isRecruitmentChecked);
  };

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
        />
      </div>
      <div className="flex flex-col mt-5 md:mt-7">
        <div
          className="flex flex-col gap-5 md:gap-x-4 md:gap-y-7 md:flex-row md:flex-wrap
    md:grid md:grid-cols-3 lx:grid-cols-4"
        >
          <MainRecruitmentCard data={MAIN_RECRUITMENT_CARD} />
        </div>
        <div className="self-center mt-9 mb-[80px] md:mt-10 md:mb-[124px]">
          <PlusBtn title={"더보기"} onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default InterestRecruitmentPage;
