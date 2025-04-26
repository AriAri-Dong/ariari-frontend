import {
  updateApplicationStatus,
  UpdateApplicationStatusParams,
} from "@/api/apply/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

// 지원 현황 - 지원 상태 업데이트
type UseUpdateStatusMutationProps = {
  options?: {
    onSuccess?: () => void;
    onError?: (error: unknown) => void;
  };
};

export const useUpdateStatusMutation = ({
  options,
}: UseUpdateStatusMutationProps = {}) => {
  const queryClient = useQueryClient();
  const params = useSearchParams();
  const clubId = params.get("clubId") || "";

  const mutation = useMutation({
    mutationFn: ({
      applications,
      type,
      interviewMessage,
    }: UpdateApplicationStatusParams) =>
      updateApplicationStatus({ applications, type, interviewMessage }),
    onSuccess: (_, variables) => {
      const { applications } = variables;
      // 지원서 목록 데이터 갱신
      queryClient.invalidateQueries({
        queryKey: ["club", "applications", clubId],
      });

      // 지원서 상세 조회 데이터 갱신
      applications.forEach((applyId) => {
        queryClient.invalidateQueries({
          queryKey: ["club", "application", applyId],
        });
      });

      options?.onSuccess?.();
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  return { updateApplicationStatus: mutation };
};
