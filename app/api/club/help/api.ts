import axiosInstance from "@/api/axiosInstance";
import { ClubFaqListRes } from "@/types/club";

// 동아리 상세 FAQ 리스트 조회
export const getClubFaqList = async (clubId: string) => {
  const res = await axiosInstance.get<ClubFaqListRes>(
    `/clubs/${clubId}/club-faqs`
  );
  return res.data;
};
