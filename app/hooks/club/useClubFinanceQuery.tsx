import { getClubFinanceBalance } from "@/api/club/finance/api";
import { useQuery } from "@tanstack/react-query";

// 동아리 회비 현재 잔액 조회
export const useFinanceBalanceQuery = (clubId: string) => {
  const {
    data: balance,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["finance-balance", clubId],
    queryFn: () => getClubFinanceBalance(clubId),
  });

  return { balance, isLoading, isError, error };
};
