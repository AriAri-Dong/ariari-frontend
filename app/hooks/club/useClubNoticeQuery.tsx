import {
  getNormalClubNoticeList,
  getClubFixedNoticeList,
  getClubNoticeDetail,
} from "@/api/club/notice/api";
import { ClubNoticeDataRes } from "@/types/club";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

// 고정된 동아리 공지사항 리스트 조회
export const useClubPinnedNoticeQuery = (clubId: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["club", clubId, "notices", "fixed"],
    queryFn: () => getClubFixedNoticeList(clubId),
    staleTime: 0,
  });

  return {
    pinnedNoticeList: data?.clubNoticeDataList || [],
    isLoading,
    isError,
    error,
  };
};

// 전체 동아리 공지사항 리스트 조회
export const useClubNoticeQuery = (clubId: string) => {
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery<ClubNoticeDataRes, AxiosError>({
    queryKey: ["club", clubId, "notices"],
    queryFn: ({ pageParam = 0 }) =>
      getNormalClubNoticeList(clubId, pageParam as number),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length;
      const totalPages = lastPage.pageInfo.totalPages;

      return totalPages > nextPage ? nextPage : undefined;
    },
  });

  return {
    notices: data?.pages.flatMap((page) => page.clubNoticeDataList) || [],
    totalSize: data?.pages[0].pageInfo.totalSize ?? 0,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoadingNotices: isLoading,
    isNoticesError: isError,
  };
};

// 동아리 공지사항 상세 조회
export const useClubNoticeDetail = (
  clubNoticeId: string,
  options?: { enabled: boolean }
) => {
  const {
    data: noticeDetail,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["club-notice", clubNoticeId],
    queryFn: () => getClubNoticeDetail(clubNoticeId),
    enabled: options?.enabled ?? true,
  });

  return {
    noticeDetail,
    isLoading,
    isError,
    error,
  };
};
