import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { getMyClubList } from "@/api/club/api";
import { MyClubListRes } from "@/types/club";
import { useUserStore } from "@/stores/userStore";

// 내 동아리 리스트 조회
export const useMyClubListQuery = () => {
  const isSignIn = useUserStore((state) => !!state.user);

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
