"use client";

import { useState } from "react";
import PlusBtn from "@/components/button/withIconBtn/plusBtn";
import HeaderSection from "./content/headerSection";
import { POINT_DATA_LIST } from "@/data/myPoint";
import ListSection from "./content/listSection";
import PointStatusCard from "@/components/card/pointStatusCard";

const ITEMS_PER_PAGE = 20;

const MyPoint = () => {
  const [visibleItems, setVisibleItems] = useState<number>(ITEMS_PER_PAGE);

  const handleLoadMore = () => {
    setVisibleItems((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <div className="mt-[46px]">
      <HeaderSection />
      <div className="flex flex-col gap-6 mt-5 md:mt-[22px] md:flex-row md:items-start">
        <PointStatusCard username={"Suyoooi"} point={20} />
        <div className="flex flex-col md:flex-grow md:mb-[124px] mb-[80px]">
          <ListSection
            dataList={POINT_DATA_LIST.slice(0, visibleItems)}
            isLast={visibleItems >= POINT_DATA_LIST.length}
          />
          {visibleItems < POINT_DATA_LIST.length && (
            <div className="self-center mt-9 md:mt-10">
              <PlusBtn title={"더보기"} onClick={handleLoadMore} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPoint;
