"use client";

import { ListSectionProps } from "@/types/components/point";

const PointList = ({
  date,
  title,
  point,
  isLast,
}: ListSectionProps & { isLast: boolean }) => {
  return (
    <div
      className={`flex justify-between items-center px-2.5 md:px-5 py-4 md:py-[18px] border-t-2 ${
        isLast ? "border-b-2" : ""
      }`}
    >
      <div className="flex flex-row gap-7">
        <p className="text-subtext2 text-mobile_body4_r md:text-body4_r content-center">
          {date}
        </p>
        <h3 className="text-subtext1 text-mobile_body1_m md:text-body1_m">
          {title}
        </h3>
      </div>
      <p
        className={`text-mobile_body1_m md:text-body1_m ${
          point < 0 ? "text-noti" : "text-primary"
        }`}
      >
        {point} p
      </p>
    </div>
  );
};

export default PointList;
