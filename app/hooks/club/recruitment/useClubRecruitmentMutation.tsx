import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteRecruitment,
  endRecruitment,
  postRecruitment,
} from "@/api/recruitment/api";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { RecruitmentData } from "@/types/recruitment";

type RecruitmentMutationProps = {
  clubId: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};
export const usePostRecruitmentMutation = ({
  clubId,
  onSuccess,
  onError,
}: RecruitmentMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => postRecruitment(clubId, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.clubRecruitmentList(clubId),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.clubActiveRecruitment(clubId),
      });

      onSuccess?.();
    },
    onError: (error: Error) => {
      console.error("모집 등록 실패:", error);
      onError?.(error);
    },
  });
};
// 모집 삭제
export const useDeleteRecruitmentMutation = ({
  clubId,
  onSuccess,
  onError,
}: RecruitmentMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRecruitment,
    onSuccess: (_, id) => {
      queryClient.setQueryData(
        QUERY_KEYS.clubRecruitmentList(clubId),
        (old: RecruitmentData[]) =>
          old?.filter((item: RecruitmentData) => item.id !== id)
      );
      onSuccess?.();
    },
    onError: (error) => {
      console.error("모집 삭제 실패:", error);
      onError?.(error);
    },
  });
};

// 모집 마감
export const useEndRecruitmentMutation = ({
  clubId,
  onSuccess,
  onError,
}: RecruitmentMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: endRecruitment,
    onSuccess: (_, id) => {
      queryClient.setQueryData(
        QUERY_KEYS.clubRecruitmentList(clubId),
        (old: RecruitmentData[]) =>
          old?.map((item: RecruitmentData) =>
            item.id === id ? { ...item, recruitmentStatusType: "CLOSED" } : item
          )
      );
      onSuccess?.();
    },
    onError: (error) => {
      console.error("모집 마감 실패:", error);
      onError?.(error);
    },
  });
};
