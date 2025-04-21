import { useQuery } from "@tanstack/react-query";
import { getRecruitmentDetail } from "@/api/recruitment/api";
import { QUERY_KEYS } from "@/constants/queryKeys";

export const useRecruitmentDetailQuery = (recruitmentId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.recruitmentDetail(recruitmentId),
    queryFn: () => getRecruitmentDetail(recruitmentId),
    select: (data) => data,
  });
};
