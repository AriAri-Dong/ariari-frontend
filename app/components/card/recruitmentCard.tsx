"use client";

import useResponsive from "@/hooks/useResponsive";

import Badge from "../badge/badge";
import DeleteBtn from "../button/iconBtn/deleteBtn";
import EndBtn from "../button/iconBtn/endBtn";
import { RecruitmentStatusType } from "@/types/recruitment";

type ManagerActionsProps = {
  isManager: true;
  onDelete: (id: string) => void;
  onEnd: (id: string) => void;
};

type GeneralUserProps = {
  isManager?: false;
};

type RecruitmentCardProps = {
  id: string;
  title: string;
  date: string;
  status: RecruitmentStatusType;
  className?: string;
  onClick: () => void;
} & (ManagerActionsProps | GeneralUserProps);

const RecruitmentCard = (props: RecruitmentCardProps) => {
  const { id, title, date, status, className, isManager, onClick } = props;
  const isMdUp = useResponsive("md");

  const handleDelete = (event: React.MouseEvent | React.TouchEvent) => {
    if (isManager) {
      event.stopPropagation();
      alert("모집 삭제");
      props.onDelete(id);
    }
  };

  const handleEnd = (event: React.MouseEvent | React.TouchEvent) => {
    if (isManager) {
      event.stopPropagation();
      alert("모집 종료");
      props.onEnd(id);
    }
  };

  return (
    <div
      className={`w-full m-w-[1248px] p-4 md:px-6 md:py-[26px] rounded-lg bg-background focus:bg-hover md:hover:bg-hover md:focus:bg-pressed cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="flex flex-col items-start md:flex-row md:justify-between md:items-center">
        <div className="w-full flex flex-col items-start md:flex-row  md:items-center gap-3 md:gap-10 md:w-fit">
          <div className="w-full flex justify-between md:w-fit">
            <Badge status={status} />
            {!isMdUp && isManager && status !== "OPEN" && (
              <div onClick={(e) => handleDelete(e)}>
                <DeleteBtn onClick={() => {}} />
              </div>
            )}
            {!isMdUp && isManager && status === "OPEN" && (
              <div
                className="flex items-center gap-1 px-1.5 py-1 text-mobile_body3_m text-subtext2"
                onClick={handleEnd}
              >
                <EndBtn onClick={() => {}} />
                <p>모집 종료</p>
              </div>
            )}
          </div>
          <h3 className="text-body1_m md:text-h4_sb text-text1">{title}</h3>
        </div>
        <div className="flex items-center gap-3 mt-2 md:mt-0">
          <p className="text-subtext2 text-body4_r md:px-3.5 md:text-body3_r">
            {date}
          </p>
          {isMdUp && isManager && status !== "OPEN" && (
            <div onClick={(e) => handleDelete(e)}>
              <DeleteBtn onClick={() => {}} />
            </div>
          )}
          {isMdUp && isManager && status === "OPEN" && (
            <div onClick={(e) => handleEnd(e)}>
              <EndBtn onClick={() => {}} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecruitmentCard;
