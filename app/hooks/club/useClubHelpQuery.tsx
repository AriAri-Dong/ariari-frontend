import { getClubFaqList } from "@/api/club/help/api";
import { ClubFaqListRes } from "@/types/club";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

// 동아리 상세 FAQ 리스트 조회
export const useClubFaqQuery = (clubId: string) => {
  const { data, isLoading, isError, error } = useQuery<
    ClubFaqListRes,
    AxiosError
  >({
    queryKey: ["club-faqs", clubId],
    queryFn: () => getClubFaqList(clubId),
  });

  return {
    faqList: data?.clubFaqDataList ?? [],
    faqPageInfo: data?.pageInfo,
    isLoading,
    isError,
    error,
  };
};
