"use client";

import PullDown from "@/components/pulldown/pullDown";
import SubTap from "@/components/tab/subTap";
import ClubRankingCard from "@/components/card/clubRankingCard";
import ClubRankingList from "@/components/card/clubLankingList";

import { Affiliation_Type, Area_Type, Field_Type } from "@/data/pulldown";
import { useState } from "react";
import useResponsive from "../../../hooks/useResponsive";
import FilterBtn from "@/components/button/iconBtn/filterBtn";

const dummyCardData = [
  { id: 1, rank: 1, title: "Card 1", description: "짧은 동아리 소개." },
  {
    id: 2,
    rank: 2,
    title: "Card 2",
    description: "긴 동아리 소개 긴 동아리 소개 긴 동아리 소개 긴 동아리 소개",
  },
  { id: 3, rank: 3, title: "Card 3", description: "짧은 동아리 소개" },
  {
    id: 4,
    rank: 4,
    title: "Card 4",
    description: "긴 동아리 소개 긴 동아리 소개 긴 동아리 소개 긴 동아리 소개",
  },
  {
    id: 5,
    rank: 5,
    title: "Card 5",
    description: "짧은 동아리 소개",
  },
  {
    id: 6,
    rank: 6,
    title: "Card 6",
    description: "짧은 동아리 소개",
  },
  {
    id: 7,
    rank: 7,
    title: "Card 6",
    description: "짧은 동아리 소개",
  },
  {
    id: 8,
    rank: 8,
    title: "Card 6",
    description: "짧은 동아리 소개",
  },
  {
    id: 9,
    rank: 9,
    title: "Card 6",
    description: "짧은 동아리 소개",
  },
];

const ClubRanking = () => {
  const isTab = useResponsive("md");
  const isDesktop = useResponsive("lg");
  const [fieldType, setFieldType] = useState<string[]>([]);
  const [affiliationType, setAffiliationType] = useState<string[]>([]);
  const [showFilter, setShowFilter] = useState<boolean>(false);

  return (
    <section className="mt-5 mb-12 md:mt-8 md:mb-[68px]">
      <div className="flex justify-between items-center">
        <div className="text-mobile_h1_contents_title md:text-h1_contents_title">
          실시간 동아리 랭킹
        </div>
        <div className=" md:flex md:gap-[16px]">
          {isTab ? (
            <>
              <PullDown
                optionData={Field_Type}
                optionSize="small"
                handleOption={setFieldType}
                selectedOption={fieldType}
              />
              <SubTap optionData={Affiliation_Type.slice(1, 3)} />
            </>
          ) : (
            <FilterBtn onClick={() => setShowFilter(!showFilter)} />
          )}
        </div>
      </div>
      {showFilter && (
        <div className="flex mt-[16px] gap-[10px] md:hidden ">
          <>
            <PullDown
              optionData={Affiliation_Type}
              optionSize="small"
              handleOption={setAffiliationType}
              selectedOption={affiliationType}
            />
            <PullDown
              optionData={Field_Type}
              optionSize="small"
              handleOption={setFieldType}
              selectedOption={fieldType}
            />
          </>
        </div>
      )}

      <div>
        <ClubRankingCard
          clubs={dummyCardData.slice(0, isDesktop ? 3 : isTab ? 2 : 1)}
        />
        <ClubRankingList
          clubs={dummyCardData.slice(
            isDesktop ? 3 : isTab ? 2 : 1,
            isDesktop ? 10 : isTab ? 8 : 7
          )}
        />
      </div>
    </section>
  );
};

export default ClubRanking;
