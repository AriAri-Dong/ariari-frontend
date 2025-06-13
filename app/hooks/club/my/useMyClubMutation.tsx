import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteClub,
  enterClubByInviteAlarm,
  enterClubByInviteKey,
} from "@/api/club/api";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { withdrawalClub } from "@/api/member/api";

interface EnterClubMutationParams {
  inviteKey: string;
  name: string;
}
interface EnterClubAlarmMutationParams {
  inviteAlarmCode: string;
  name: string;
  clubId: string;
}
type MyClubMutationProps = {
  onSuccess?: (data: string) => void;
  onError?: (error: Error) => void;
};
// 동아리 가입 - 링크
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
// 동아리 가입 - 개별 알림
export const useEnterClubAlarmMutation = ({
  onSuccess,
  onError,
}: MyClubMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      inviteAlarmCode,
      name,
      clubId,
    }: EnterClubAlarmMutationParams) =>
      enterClubByInviteAlarm(name, inviteAlarmCode, clubId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.myClubList] });
      onSuccess?.(data);
    },
    onError: (error: Error) => {
      onError?.(error);
    },
  });
};
// 동아리 탈퇴
export const useWithdrawClubMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: withdrawalClub,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.myClubList] });
    },
    onError: (error: Error) => {
      console.error("동아리 탈퇴 실패:", error);
      throw error;
    },
  });
};
// 동아리 폐쇄
export const useDeleteClubMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteClub,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.myClubList] });
    },
    onError: (error: Error) => {
      console.error("동아리 폐쇄 실패:", error);
      throw error;
    },
  });
};
