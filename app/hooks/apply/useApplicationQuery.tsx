import { getApplicationDetail, getApplicationsList } from "@/api/apply/api";
import {
  ApplicationListConditionReq,
  ApplyDetailRes,
  ApplyListRes,
} from "@/types/application";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

// 동아리 상세 지원 현황 리스트 조회
export const useApplicationQuery = (
  clubId: string,
  condition: ApplicationListConditionReq,
  options?: { enabled: boolean }
) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError } =
    useInfiniteQuery<ApplyListRes, AxiosError>({
      queryKey: ["club", "applications", clubId, JSON.stringify(condition)],
      queryFn: ({ pageParam = 0 }) =>
        getApplicationsList(clubId, condition, pageParam as number),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length;
        const totalPages = lastPage.pageInfo.totalPages;

        // 마지막 페이지 판단 기준 - 전체 페이지 수, 현재 불러진 페이지 수
        return totalPages > nextPage ? nextPage : undefined;
      },
      ...options,
    });

  // 전체/대기중 탭에 표기되는 항목 개수
  const { data: fixedTotalSize } = useQuery<
    { totalAllSize: number; totalPendingSize: number },
    AxiosError
  >({
    queryKey: ["club", "applications", clubId, "fixed-total-size"],
    queryFn: async () => {
      const [allApplyRes, pendingApplyRes] = await Promise.all([
        getApplicationsList(clubId, { isPendent: false }, 0),
        getApplicationsList(clubId, { isPendent: true }, 0),
      ]);
      return {
        totalAllSize: allApplyRes.pageInfo.totalSize,
        totalPendingSize: pendingApplyRes.pageInfo.totalSize,
      };
    },
    staleTime: Infinity,
    ...options,
  });

  return {
    allTabSize: fixedTotalSize?.totalAllSize ?? 0,
    pendingTabSize: fixedTotalSize?.totalPendingSize ?? 0,
    applicationsList: data?.pages.flatMap((page) => page.applyDataList) ?? [],
    totalSize: data?.pages[0].pageInfo.totalSize ?? 0,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
  };
};

// 동아리 상세 지원현황 - 지원서 상세 조회
export const useApplyDetailQuery = (applyId: string) => {
  const {
    data: applyDetail,
    isLoading,
    isError,
  } = useQuery<ApplyDetailRes, AxiosError>({
    queryKey: ["club", "application", applyId],
    queryFn: () => getApplicationDetail(applyId),
  });
  return {
    applyDetail,
    isLoading,
    isError,
  };
};
