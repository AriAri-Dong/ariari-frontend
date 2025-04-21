import { getApplicationForm } from "@/api/applyForm/api";
import { useQuery } from "@tanstack/react-query";

// 지원서 형식 조회(관리자)
export const useClubApplyFormQuery = (clubId: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["club", clubId, "apply-form"],
    queryFn: () => getApplicationForm(clubId),
  });

  return {
    specialQuestions: data?.applyFormData.specialQuestionList,
    applyQuestionDataList: data?.applyFormData.applyQuestionDataList,
    portfolio: data?.applyFormData.portfolio,
    isLoading,
    isError,
    errorMessage: isError && error instanceof Error ? error.message : null,
  };
};
