import { useQuery } from "@tanstack/react-query";
import { getClubRecruitment } from "@/api/recruitment/api";
import { QUERY_KEYS } from "@/constants/queryKeys";

// 동아리의 모집공고 리스트 조회
export const useClubRecruitmentQuery = (clubId: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: QUERY_KEYS.clubRecruitmentList(clubId),
    queryFn: () =>
      getClubRecruitment(clubId).then((res) => res?.recruitmentDataList),
    enabled: !!clubId,
  });

  return {
    data,
    isLoading,
    isError,
  };
};
