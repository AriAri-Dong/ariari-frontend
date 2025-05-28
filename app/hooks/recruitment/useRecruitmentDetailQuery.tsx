import { useQuery } from "@tanstack/react-query";
import {
  getClubActiveRecruitment,
  getRecruitmentDetail,
} from "@/api/recruitment/api";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { ClubActiceRecruitmentResponse } from "@/types/recruitment";
// 모집 상세 조회
export const useRecruitmentDetailQuery = (recruitmentId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.recruitmentDetail(recruitmentId),
    queryFn: () => getRecruitmentDetail(recruitmentId),
    select: (data) => data,
  });
};
// 동아리의 모집중인 모집공고 정보 조회
export const useClubActiveRecruitment = (clubId: string) => {
  return useQuery<ClubActiceRecruitmentResponse>({
    queryKey: QUERY_KEYS.clubActiveRecruitment(clubId),
    queryFn: () => getClubActiveRecruitment(clubId),
    select: (data) => data,
  });
};
