import { AxiosError } from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getClubEventList } from "@/api/club/event/api";
import { ClubEventListRes } from "@/types/clubEvent";
import { formatTime } from "@/utils/formatKSTTime";
// 일정 리스트 조회
export const useClubEventQuery = (clubId: string) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError } =
    useInfiniteQuery<ClubEventListRes, AxiosError>({
      queryKey: ["clubEventList", clubId],
      queryFn: ({ pageParam = 0 }) =>
        getClubEventList(clubId, pageParam as number),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length;
        const totalPages = lastPage.pageInfo.totalPages;
        return nextPage < totalPages ? nextPage : undefined;
      },
      select: (data) => ({
        ...data,
        pages: data.pages.map((page) => ({
          ...page,
          clubEventDataList: page.clubEventDataList.map((event) => ({
            ...event,
            eventDateTime: formatTime(event.eventDateTime),
          })),
        })),
      }),
    });

  return {
    data: data?.pages.flatMap((page) => page.clubEventDataList) ?? [],
    totalSize: data?.pages[0].pageInfo.totalSize ?? 0,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
  };
};
