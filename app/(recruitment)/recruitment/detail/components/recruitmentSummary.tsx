interface RecruitmentSummaryProps {
  members: number;
  startDate: string;
  endDate: string;
  email: string;
}

/**
 *
 * @param members 모집 인원
 * @param startDate 모집 시작 날짜
 * @param endDate 모집 종료 날짜
 * @param email 모집자 이메일
 * @returns
 */
const RecruitmentSummary = ({
  members,
  startDate,
  endDate,
  email,
}: RecruitmentSummaryProps) => {
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
          모집 기간
        </p>
        <p className="text-mobile_body2_r md:text-body1_m">
          {startDate} ~ {endDate}
        </p>
      </div>
      {/* <div className="flex flex-row gap-[65px]">
        <p className="w-[56px] text-mobile_body2_sb md:text-body1_m">이메일</p>
        <p className="text-mobile_body2_r md:text-body1_m">{email}</p>
      </div> */}
    </div>
  );
};

export default RecruitmentSummary;
