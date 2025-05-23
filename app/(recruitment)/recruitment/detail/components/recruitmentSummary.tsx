"use client";

import { formatKSTTime } from "@/utils/formatKSTTime";

interface RecruitmentSummaryProps {
  members: number;
  startDate: string;
  endDate: string;
  procedureType: string;
}

/**
 *
 * @param members 모집 인원
 * @param startDate 모집 시작 날짜
 * @param endDate 모집 종료 날짜
 * @param procedureType 모집 유형 (서류 or 서류.면접)
 * @returns
 */
const RecruitmentSummary = ({
  members,
  startDate,
  endDate,
  procedureType,
}: RecruitmentSummaryProps) => {
  const startDateTime = startDate ? formatKSTTime(startDate, "YYYY.MM.DD") : "";
  const endDateTime = endDate ? formatKSTTime(endDate, "YYYY.MM.DD") : "";
  return (
    <div className="felx text-subtext1 space-y-[14px]">
      <div className="flex flex-row gap-[65px]">
        <p className="w-[56px] text-mobile_body2_sb md:text-body1_m">
          모집 인원
        </p>
        <p className="text-mobile_body2_r md:text-body1_m">{members}명</p>
      </div>
      <div className="flex flex-row gap-[65px]">
        <p className="w-[56px] text-mobile_body2_sb md:text-body1_m">
          모집 절차
        </p>
        <p className="text-mobile_body2_r md:text-body1_m">
          {procedureType == "DOCUMENT" ? "서류" : "서류/면접"}
        </p>
      </div>
      <div className="flex flex-row gap-[65px]">
        <p className="w-[56px] text-mobile_body2_sb md:text-body1_m">
          모집 기간
        </p>
        <p className="text-mobile_body2_r md:text-body1_m">
          {startDateTime} ~ {endDateTime}
        </p>
      </div>
    </div>
  );
};

export default RecruitmentSummary;
