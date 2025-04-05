import { getClubNotifications } from "@/api/notification/api";
import { ClubNotificationListRes } from "@/types/notification";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

// 동아리 알림 전체 조회
export const useClubNotificationQuery = (clubId: string) => {
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery<ClubNotificationListRes, AxiosError>({
    queryKey: ["club", clubId, "notifications"],
    queryFn: ({ pageParam = 0 }) =>
      getClubNotifications(clubId, pageParam as number),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length;
      const totalPages = lastPage.pageInfo.totalPages;

      return totalPages > nextPage ? nextPage : undefined;
    },
  });

  return {
    clubNotifications:
      data?.pages.flatMap((page) => page.clubAlarmDataList) || [],
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    isError,
  };
};
