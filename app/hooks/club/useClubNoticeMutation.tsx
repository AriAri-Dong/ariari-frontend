import {
  addClubNotice,
  updateClubNotice,
  deleteClubNotice,
} from "@/api/club/notice/api";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useClubNoticeMutation = ({ clubId }: { clubId: string }) => {
  const queryClient = useQueryClient();

  // 공통 캐시 초기화 함수
  const invalidateNoticeQueries = (clubId: string) => {
    queryClient.invalidateQueries({
      queryKey: ["club", clubId, "notices"],
    });
  };

  // 공지사항 등록
  const addNotice = useMutation({
    mutationFn: addClubNotice,
    onSuccess: () => {
      invalidateNoticeQueries(clubId);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.myClubList] });
    },
    onError: (error) => {
      console.log("add new club notice error", error);
    },
  });

  // 공지사항 수정
  const updateNotice = useMutation({
    mutationFn: updateClubNotice,
    onSuccess: (_, variables) => {
      const { clubNoticeId } = variables;
      invalidateNoticeQueries(clubId);
      queryClient.invalidateQueries({
        queryKey: ["club-notice", clubNoticeId],
      });
    },
    onError: (error) => {
      console.log("update club notice error", error);
    },
  });

  // 공지사항 삭제
  const deleteNotice = useMutation({
    mutationFn: ({ clubNoticeId }: { clubNoticeId: string }) =>
      deleteClubNotice(clubNoticeId),
    onSuccess: () => {
      invalidateNoticeQueries(clubId);
    },
    onError: (error) => {
      console.log("delete club notice error", error);
    },
  });

  return { addNotice, updateNotice, deleteNotice };
};
