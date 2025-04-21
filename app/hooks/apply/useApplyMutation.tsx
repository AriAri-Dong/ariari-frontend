import {
  deleteMyApply,
  deleteMyApplyTmp,
  postApplication,
  postApplicationTemp,
  putApplicationTemp,
} from "@/api/apply/api";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface BaseMutationProps {
  onSuccess: (res?: any) => void;
  onError: () => void;
}

export interface ApplyMutationProps extends BaseMutationProps {
  recruitmentId: string;
}

// 지원 생성
export const useSubmitApplicationMutation = ({
  recruitmentId,
  onSuccess,
  onError,
}: ApplyMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      recruitmentId,
      formData,
    }: {
      recruitmentId: string;
      formData: FormData;
    }) => postApplication(recruitmentId, formData),
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.myApplyList] });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.recruitmentDetail(recruitmentId),
      });
    },
    onError: () => {
      onError();
    },
  });
};

// 임시 지원 생성
export const usePostTempApplicationMutation = ({
  recruitmentId,
  onSuccess,
  onError,
}: ApplyMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      recruitmentId,
      formData,
    }: {
      recruitmentId: string;
      formData: FormData;
    }) => postApplicationTemp(recruitmentId, formData),
    onSuccess: (res) => {
      onSuccess(res);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.myApplyTmpList] });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.recruitmentDetail(recruitmentId),
      });
    },
    onError: () => {
      onError();
    },
  });
};

// 임시 지원 수정
export const usePutTempApplicationMutation = ({
  onSuccess,
  onError,
}: BaseMutationProps) => {
  return useMutation({
    mutationFn: ({
      applyTempId,
      formData,
    }: {
      applyTempId: string;
      formData: FormData;
    }) => putApplicationTemp(applyTempId, formData),
    onSuccess: () => {
      onSuccess();
    },
    onError: () => {
      onError();
    },
  });
};

// 임시지원 삭제
export const useDeleteTmpMutation = ({
  recruitmentId,
  onSuccess,
  onError,
}: ApplyMutationProps) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMyApplyTmp,
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.myApplyTmpList],
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.recruitmentDetail(recruitmentId),
      });
    },
    onError: (err: Error) => {
      onError();
      console.error(err.message);
    },
  });
};

// 지원 삭제
export const useDeleteApplyMutation = ({
  recruitmentId,
  onSuccess,
  onError,
}: ApplyMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMyApply,
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.myApplyList] });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.recruitmentDetail(recruitmentId),
      });
    },
    onError: (err: Error) => {
      onError();
      console.log(err.message);
    },
  });
};
