"use client";

import React, { useEffect, useState } from "react";
import MediumBtn from "@/components/button/basicBtn/mediumBtn";
import BookmarkBtn from "@/components/button/iconBtn/bookmarkBtn";
import SahreBtn from "@/components/button/iconBtn/shareBtn";
import LargeBtn from "@/components/button/basicBtn/largeBtn";

const RecruitmentBottomBar = () => {
  const [count, setCount] = useState<number>(0);
  const [isScrap, setIsScrap] = useState<boolean>(false);

  const onBookmarkClick = () => {
    setIsScrap(!isScrap);
  };

  useEffect(() => {
    if (isScrap) {
      setCount(1);
    } else {
      setCount(0);
    }
  }, [isScrap]);

  return (
    <div className="flex bg-white w-full space-x-3">
      <div className="flex-shrink-0">
        <SahreBtn onClick={() => {}} />
      </div>
      <div className="flex-shrink-0">
        <BookmarkBtn
          onClick={onBookmarkClick}
          count={count}
          isScrap={isScrap}
        />
      </div>
      <div className="hidden md:flex flex-shrink-0">
        <MediumBtn title={"지원하기 D-3"} onClick={() => {}} />
      </div>
      <div className="block md:hidden flex-grow">
        <LargeBtn title={"지원하기 D-3"} onClick={() => {}} />
      </div>
    </div>
  );
};

export default RecruitmentBottomBar;
