import { addFaq, addQuestion } from "@/api/club/help/api";
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

// 동아리 상세 Q&A 질문 등록(일반회원, 미소속회원)
type UseAddQuestionType = {
  clubId: string;
  onSubmit: () => void;
};
export const useAddQuestionMutation = ({
  clubId,
  onSubmit,
}: UseAddQuestionType) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addQuestion,
    onSuccess: () => {
      onSubmit();
      queryClient.invalidateQueries({ queryKey: ["club-questions", clubId] });
    },
    onError: (error) => {
      console.log("add question error", error);
    },
  });

  return { addQuestion: mutation };
};
