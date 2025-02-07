"use client";

import { useState } from "react";
import Image from "next/image";
import reset from "@/images/icon/reset.svg";
import vector from "@/images/icon/backVector.svg";
import IconBtn from "@/components/button/withIconBtn/IconBtn";
import { useRouter } from "next/navigation";
import FilterBtn from "@/components/button/iconBtn/filterBtn";
import PullDown from "@/components/pulldown/pullDown";
import {
  AFFILIATION_TYPE,
  AREA_TYPE,
  FIELD_TYPE,
  TARGET_TYPE,
} from "@/data/pulldown";

const HeaderSection = () => {
  const router = useRouter();

  const [filter, setFilter] = useState<boolean>(false);
  const [affiliationType, setAffiliationType] = useState<string[]>([]);
  const [areaType, setAreaType] = useState<string[]>([]);
  const [fieldType, setFieldType] = useState<string[]>([]);
  const [targetType, setTargetType] = useState<string[]>([]);

  const handleRefresh = () => {
    setAffiliationType([]);
    setAreaType([]);
    setFieldType([]);
    setTargetType([]);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between">
      <div className="flex justify-between gap-2">
        <div className="flex">
          <h1 className="text-text1 text-mobile_h1_contents_title md:text-h1_contents_title">
            모집공고
          </h1>
        </div>
        <div className="md:hidden">
          <FilterBtn onClick={() => setFilter(!filter)} />
        </div>
      </div>

      <div
        className={`flex-row-reverse md:flex-row md:gap-4
        ${filter ? `flex` : `hidden md:flex`}`}
      >
        <div className="hidden md:flex md:gap-4">
          <IconBtn
            type={"reset"}
            size={"small"}
            title={"초기화"}
            onClick={handleRefresh}
          />
        </div>
        <div className="flex gap-2 mt-4 md:mt-0 md:gap-4">
          <PullDown
            optionData={AFFILIATION_TYPE.slice(1)}
            optionSize="small"
            handleOption={setAffiliationType}
            selectedOption={affiliationType}
          />
          <PullDown
            optionData={FIELD_TYPE.slice(1)}
            optionSize="small"
            handleOption={setFieldType}
            selectedOption={fieldType}
          />
          <PullDown
            optionData={AREA_TYPE.slice(1)}
            optionSize="small"
            handleOption={setAreaType}
            selectedOption={areaType}
          />
          <PullDown
            optionData={TARGET_TYPE.slice(1)}
            optionSize="small"
            handleOption={setTargetType}
            selectedOption={targetType}
          />
          <Image
            src={reset}
            alt={"reset"}
            width={16}
            height={16}
            onClick={handleRefresh}
            className="md:hidden mr-2"
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
