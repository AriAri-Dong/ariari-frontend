import {
  getClubFinanceBalance,
  getClubFinancialRecords,
} from "@/api/club/finance/api";
import { MembershipBalanceRes } from "@/types/club";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

// 동아리 회비 현재 잔액 조회
export const useFinanceBalanceQuery = (clubId: string) => {
  const {
    data: balance,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["finance-balance", clubId],
    queryFn: () => getClubFinanceBalance(clubId),
  });

  return {
    balance,
    isLoadingBalance: isLoading,
    isBalanceError: isError,
  };
};

// 동아리 회비 내역 전체 조회
export const useFinancialRecordsQuery = (clubId: string) => {
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery<MembershipBalanceRes, AxiosError>({
    queryKey: ["club-financial-records", clubId],
    queryFn: ({ pageParam = 0 }) =>
      getClubFinancialRecords(clubId, pageParam as number),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length;
      const totalPages = lastPage.pageInfo.totalPages;

      return totalPages > nextPage ? nextPage : undefined;
    },
  });

  return {
    financialRecords: data?.pages.flatMap(
      (page) => page.financialRecordDataList
    ),
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoadingRecords: isLoading,
    isRecordsError: isError,
  };
};
