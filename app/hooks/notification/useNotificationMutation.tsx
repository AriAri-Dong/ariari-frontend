import { readClubNotification } from "@/api/notification/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export const useClubNotificationMutation = () => {
  const queryClient = useQueryClient();
  const params = useSearchParams();
  const clubId = params.get("clubId") || "";

  const mutation = useMutation({
    mutationFn: ({ clubAlarmId }: { clubAlarmId: string }) =>
      readClubNotification(clubId, clubAlarmId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["club", clubId, "notifications"],
      });
    },
  });

  return { readClubNotification: mutation };
};
