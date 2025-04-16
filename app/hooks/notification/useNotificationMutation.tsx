import {
  markClubNotificationAsRead,
  markMemberNotificationAsRead,
} from "@/api/notification/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

// 동아리 알림 읽음 처리
export const useClubNotificationMutation = () => {
  const queryClient = useQueryClient();
  const params = useSearchParams();
  const clubId = params.get("clubId") || "";

  const mutation = useMutation({
    mutationFn: ({ clubAlarmId }: { clubAlarmId: string }) =>
      markClubNotificationAsRead(clubId, clubAlarmId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["club", clubId, "notifications"],
      });
    },
  });

  return { markClubNotificationAsRead: mutation };
};

// 멤버 알림 읽음 처리
export const useMemberNotificationMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ memberAlarmId }: { memberAlarmId: string }) =>
      markMemberNotificationAsRead(memberAlarmId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my", "notifications"],
      });
    },
  });

  return { markMemberNotificationAsRead: mutation };
};

export const useNotificationMutations = () => {
  return {
    ...useClubNotificationMutation(),
    ...useMemberNotificationMutation(),
  };
};
