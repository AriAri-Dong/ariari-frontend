import {
  addClubNotice,
  AddClubNoticeParams,
  deleteClubNotice,
} from "@/api/club/notice/api";
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
    mutationFn: ({ formData }: AddClubNoticeParams) =>
      addClubNotice({ clubId, formData }),
    onSuccess: () => {
      invalidateNoticeQueries(clubId);
    },
    onError: (error) => {
      console.log("add new club notice error", error);
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

  return { addNotice, deleteNotice };
};

// 동아리 공지사항 삭제
