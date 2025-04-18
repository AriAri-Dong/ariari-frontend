import { addClubNotice, AddClubNoticeParams } from "@/api/club/notice/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// 동아리 공지 등록
export const useClubNoticeMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ clubId, formData }: AddClubNoticeParams) =>
      addClubNotice({ clubId, formData }),
    onSuccess: (_, variables) => {
      const { clubId } = variables;

      queryClient.invalidateQueries({
        queryKey: ["club", clubId, "notices"],
      });
    },
    onError: (error) => {
      console.log("add new club notice error", error);
    },
  });

  return { addClubNotice: mutation };
};
