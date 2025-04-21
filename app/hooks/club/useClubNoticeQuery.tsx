import {
  getClubFixedNoticeList,
  getClubNoticeDetail,
} from "@/api/club/notice/api";
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
