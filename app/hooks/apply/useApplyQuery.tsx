import { useQuery } from "@tanstack/react-query";
import { getMyApplyList, getMyApplyTmpList } from "@/api/apply/api";
import { QUERY_KEYS } from "@/constants/queryKeys";

// 내 지원 리스트 조회
export const useMyApplyListQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.myApplyList],
    queryFn: getMyApplyList,
    select: (data) => ({
      allApplications: data.applyDataList,
      totalCount: data.pageInfo.totalSize,
    }),
  });
};
// 내 임시 지원 리스트 조회
export const useMyApplyTmpListQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.myApplyTmpList],
    queryFn: getMyApplyTmpList,
    select: (data) => ({
      tempList: data.applyDataList,
      totalCount: data.pageInfo.totalSize,
    }),
  });
};
