import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { getMyClubList } from "@/api/club/api";
import { useUserStore } from "@/providers/userStoreProvider";
import { useShallow } from "zustand/shallow";
import { MyClubListRes } from "@/types/club";

// 내 동아리 리스트 조회
export const useMyClubListQuery = () => {
  const isSignIn = useUserStore(useShallow((state) => state.isSignIn));

  const { data, isLoading, isError } = useQuery<MyClubListRes>({
    queryKey: [QUERY_KEYS.myClubList],
    queryFn: getMyClubList,
    enabled: isSignIn,
  });

  return {
    data,
    isLoading,
    isError,
  };
};
