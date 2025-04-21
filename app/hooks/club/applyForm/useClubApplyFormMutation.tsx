import {
  registerApplicationForm,
  RegisterApplyFormParams,
} from "@/api/applyForm/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

// 지원서 형식 수정/등록(관리자)
interface UseClubApplyFormMutationProps {
  options?: {
    onSuccess?: () => void;
    onError?: (error: unknown) => void;
  };
}

export const useClubApplyFormMutation = ({
  options,
}: UseClubApplyFormMutationProps) => {
  const queryClient = useQueryClient();
  const params = useSearchParams();
  const clubId = params.get("clubId") || "";

  const mutation = useMutation({
    mutationFn: ({ data }: { data: RegisterApplyFormParams["data"] }) =>
      registerApplicationForm({ clubId, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["club", clubId, "apply-form"],
      });
      options?.onSuccess?.();
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  return { updateApplicationForm: mutation };
};
