"use client";

import SubTap from "@/components/tab/subTap";
import { useState } from "react";
import PlusBtn from "@/components/button/withIconBtn/plusBtn";
import ListSection from "./content/listSection";
import { APPLICATION_DATA_LIST } from "@/data/application";

const options = [
  { id: 0, label: "전체", number: 14 },
  { id: 1, label: "작성중", number: 14 },
  { id: 2, label: "전형 진행중" },
  { id: 3, label: "최종발표 완료" },
];

const ITEMS_PER_PAGE = 20;

const Application = () => {
  const [visibleItems, setVisibleItems] = useState<number>(ITEMS_PER_PAGE);

  const handleLoadMore = () => {
    setVisibleItems((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <div>
      <div className="flex flex-col gap-5 mt-5 md:mt-8 md:gap-[22px]">
        <div className="md:flex md:justify-between">
          <h1 className="text-text1 text-mobile_h1_contents_title mb-4 md:text-h1_contents_title md:mb-0">
            동아리 지원
          </h1>
          <SubTap optionData={options} />
        </div>
        <p className="text-subtext2 text-mobile_body2_m mb-4 md:text-h4 md:mb-[22px]">
          총 25개의 지원서가 있어요.
        </p>
      </div>
      <div className="flex flex-col md:flex-grow md:mb-[124px] mb-[80px]">
        <ListSection dataList={APPLICATION_DATA_LIST.slice(0, visibleItems)} />
        {visibleItems < APPLICATION_DATA_LIST.length && (
          <div className="self-center mt-9 md:mt-10">
            <PlusBtn title={"더보기"} onClick={handleLoadMore} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Application;
