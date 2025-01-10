"use client";

import { useState } from "react";
import Image from "next/image";
import notice from "@/images/icon/notice.svg";

import SubTap from "@/components/tab/subTap";
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
      <div className="w-full inline-flex flex-col gap-4 mt-6 md:mt-8 md:gap-[22px]">
        <div className="md:flex md:justify-between">
          <h1 className="text-text1 text-mobile_h1_contents_title mb-4 md:text-h1_contents_title md:mb-0">
            동아리 지원
          </h1>
          <div className="overflow-x-auto no-scrollbar">
            <SubTap optionData={options} />
          </div>
        </div>
        <p className="text-subtext2 text-mobile_body2_m mb-5 md:text-h4 md:mb-[22px]">
          총 25개의 지원서가 있어요.
        </p>
      </div>
      <div className="w-full p-4 mb-5 flex flex-col justify-start items-start gap-2.5 bg-white/70 rounded-12 md:px-5 md:mb-[22px]">
        <div className="self-stretch justify-start items-center  gap-3 md:gap-5 inline-flex">
          <Image
            src={notice}
            alt={"notice"}
            width={24}
            height={24}
            className="w-6 h-6 md:w-8 md:h-8"
          />
          <div className="grow shrink basis-0 text-mobile_body3_m text-icon md:text-body2_m">
            <p>
              현재 작성 중인 지원서와 제출 후 1개월이 지난 지원서는 자유롭게
              삭제할 수 있어요.
            </p>
            <p className="hidden md:flex">
              다른 경우엔 고객센터로 문의해주세요.
            </p>
          </div>
        </div>
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
