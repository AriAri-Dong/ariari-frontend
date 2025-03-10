import { getClubFaqList, getClubQnaList } from "@/api/club/help/api";
import { ClubFaqListRes, ClubQnaListRes } from "@/types/club";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

// 동아리 상세 FAQ 리스트 조회
export const useClubFaqQuery = (clubId: string) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError } =
    useInfiniteQuery<ClubFaqListRes, AxiosError>({
      queryKey: ["club-faqs", clubId],
      queryFn: ({ pageParam = 0 }) =>
        getClubFaqList(clubId, pageParam as number),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length;
        const totalPages = lastPage.pageInfo.totalPages;

        // 마지막 페이지 판단 기준 - 전체 페이지 수, 현재 불러진 페이지 수
        return totalPages > nextPage ? nextPage : undefined;
      },
    });

  return {
    faqList: data?.pages.flatMap((page) => page.clubFaqDataList) ?? [],
    totalSize: data?.pages[0].pageInfo.totalSize ?? 0,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
  };
};

// 동아리 상세 Q&A 리스트 조회
export const useClubQnaQuery = (clubId: string) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError } =
    useInfiniteQuery<ClubQnaListRes, AxiosError>({
      queryKey: ["club-questions", clubId],
      queryFn: ({ pageParam = 0 }) =>
        getClubQnaList(clubId, pageParam as number),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length;
        const totalPages = lastPage.pageInfo.totalPages;

        // 마지막 페이지 판단 기준 - 전체 페이지 수, 현재 불러진 페이지 수
        return totalPages > nextPage ? nextPage : undefined;
      },
    });

  return {
    qnaList: data?.pages.flatMap((page) => page.clubQuestionDataList) ?? [],
    totalSize: data?.pages[0].pageInfo.totalSize ?? 0,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
  };
};
