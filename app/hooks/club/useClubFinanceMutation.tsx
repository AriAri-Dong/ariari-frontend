import { addFinancialRecord } from "@/api/club/finance/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// 동아리 회비내역 등록(role- ADMIN, MANAGER)
type UseAddFinancialRecordType = {
  clubId: string;
};
export const useAddFinancialRecordMutation = ({
  clubId,
}: UseAddFinancialRecordType) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addFinancialRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["club-financial-records", clubId],
      });
      queryClient.invalidateQueries({
        queryKey: ["finance-balance", clubId],
      });
    },
    onError: (error) => {
      console.log("add financial record error", error);
    },
  });

  return { addFinancialRecord: mutation };
};
