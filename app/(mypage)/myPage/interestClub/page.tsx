"use client";

import PlusBtn from "@/components/button/withIconBtn/plusBtn";
import ClubInfoCard from "@/components/card/clubInfoCard";
import ClubIntroduction from "@/components/card/clubIntroduction";
import { CLUB_PROFILE_DATA } from "@/data/clubProfile";
import { useState } from "react";
import { Popularity_Sort_Type } from "@/data/pulldown";
import FilterSection from "./content/filterSection";
import HeaderSection from "./content/headerSection";

const InterestClub = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [sortType, setSortType] = useState<string>(
    Popularity_Sort_Type[0].label
  );

  const toggleCheck = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <div className="flex flex-col gap-5 mt-[46px] md:mt-8 md:gap-[22px]">
        <HeaderSection />
        <FilterSection
          isChecked={isChecked}
          toggleCheck={toggleCheck}
          sortType={sortType}
          setSortType={setSortType}
        />
      </div>
      <div className="flex flex-col">
        <div className="grid grid-cols-1 mt-5 gap-6 md:grid-cols-2 md:gap-[18px] md:mt-7">
          {CLUB_PROFILE_DATA.map((club) => (
            <div
              key={club.id}
              className="flex flex-col gap-[14px] md:gap-[22px] md:mt-[18px]"
            >
              <ClubInfoCard
                clubName={club.clubName}
                clubImage={club.clubImage}
                affiliation={club.affiliation}
                field={club.field}
                region={club.region}
                target={club.target}
                heartNumber={club.heartNumber}
                clubPageUrl={club.clubPageUrl}
              />
              <ClubIntroduction
                introductionText={club.introductionText}
                badgeType={club.badgeType}
              />
            </div>
          ))}
        </div>
        <div className="self-center mt-9 mb-[80px] md:mt-10 md:mb-[124px]">
          <PlusBtn title={"더보기"} onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default InterestClub;
