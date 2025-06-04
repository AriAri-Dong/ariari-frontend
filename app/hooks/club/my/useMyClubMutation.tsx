import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enterClubByInviteKey } from "@/api/club/api";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { EnterClubRes } from "@/types/club";

interface EnterClubMutationParams {
  inviteKey: string;
  name: string;
}

type MyClubMutationProps = {
  onSuccess?: (data: EnterClubRes) => void;
  onError?: (error: Error) => void;
};

export const useEnterClubMutation = ({
  onSuccess,
  onError,
}: MyClubMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ inviteKey, name }: EnterClubMutationParams) =>
      enterClubByInviteKey(inviteKey, name),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.myClubList] });
      onSuccess?.(data);
    },
    onError: (error: Error) => {
      onError?.(error);
    },
  });
};
