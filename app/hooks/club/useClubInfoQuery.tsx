import { fetchClubInfo } from "@/api/club/clubInfo";
import { useQuery } from "@tanstack/react-query";

// 동아리 상세 정보 조회
export const useClubInfoQuery = (clubId: string) => {
  const {
    data: clubInfo,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["club", clubId],
    queryFn: () => fetchClubInfo(clubId),
    staleTime: 0,
  });

  return {
    clubInfo,
    isLoading,
    isError,
    errorMessage: isError && error instanceof Error ? error.message : null,
  };
};
