"use client";

import Badge from "../badge/badge";

interface RecruitmentCardProps {
  onClick: () => void;
  title: string;
  date: string;
  status: "enable" | "disable";
}

const RecruitmentCard = ({
  onClick,
  title,
  date,
  status,
}: RecruitmentCardProps) => {
  return (
    <div
      className="w-full m-w-[1248px] p-4 md:py-[26px] md:pl-9 md:pr-[30px] rounded-lg
    bg-background focus:bg-hover md:hover:bg-hover md:focus:bg-pressed cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-col items-start md:flex-row md:justify-between md:items-center">
        <div className="flex flex-col items-start md:flex-row  md:items-center gap-3 md:gap-12">
          <div className="flex gap-2">
            <Badge status={status} />
          </div>
          <h3 className="text-body1_m md:text-h4_sb text-text1">{title}</h3>
        </div>
        <p className="mt-2 md:mt-0 text-subtext2 text-body4_r md:text-body3_r">
          {date}
        </p>
      </div>
    </div>
  );
};

export default RecruitmentCard;
