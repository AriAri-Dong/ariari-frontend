import {
  getClubNotifications,
  getMyNotifications,
} from "@/api/notification/api";
import {
  ClubNotificationListRes,
  MemberNotificationListRes,
} from "@/types/notification";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

// 동아리 알림 전체 조회
export const useClubNotificationQuery = (
  clubId: string,
  options?: { enabled: boolean }
) => {
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
    enabled: options?.enabled ?? true,
    staleTime: 0,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length;
      const totalPages = lastPage.alarmPageInfo.totalPages;

      return totalPages > nextPage ? nextPage : undefined;
    },
  });

  return {
    clubNotifications:
      data?.pages.flatMap((page) => page.clubAlarmDataList) || [],
    unreadCount: data?.pages[0].alarmPageInfo.unreadCount,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    isError,
  };
};

// 멤버 알림 전체 조회
export const useMyNotificationQuery = (options?: { enabled: boolean }) => {
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery<MemberNotificationListRes, AxiosError>({
    queryKey: ["my", "notifications"],
    queryFn: ({ pageParam = 0 }) => getMyNotifications(pageParam as number),
    enabled: options?.enabled ?? true,
    initialPageParam: 0,
    staleTime: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length;
      const totalPages = lastPage.alarmPageInfo.totalPages;

      return totalPages > nextPage ? nextPage : undefined;
    },
  });

  return {
    myNotifications:
      data?.pages.flatMap((page) => page.memberAlarmDataList) || [],
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    isError,
  };
};
