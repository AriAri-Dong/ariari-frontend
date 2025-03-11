import { addFaq } from "@/api/club/help/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// 동아리 상세 FAQ 등록(관리자)
type UseAddFaqType = {
  clubId: string;
  onSubmit: () => void;
};
export const useAddFaqMutation = ({ clubId, onSubmit }: UseAddFaqType) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addFaq,
    onSuccess: () => {
      onSubmit();
      queryClient.invalidateQueries({ queryKey: ["club-faqs", clubId] });
    },
    onError: (error) => {
      console.log("add faq error", error);
    },
  });

  return { addFaq: mutation };
};
