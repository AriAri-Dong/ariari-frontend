import { getClubFixedNoticeList } from "@/api/club/notice/api";
import { useQuery } from "@tanstack/react-query";

// 고정된 동아리 공지사항 리스트 조회
export const useClubPinnedNoticeQuery = (clubId: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["club", clubId, "notices", "fixed"],
    queryFn: () => getClubFixedNoticeList(clubId),
  });

  return {
    pinnedNoticeList: data?.clubNoticeDataList || [],
    isLoading,
    isError,
    error,
  };
};
