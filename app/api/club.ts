import { ClubDetailRes } from "@/types/club";
import { api } from "./api";

// 동아리 상세정보
export const getClubDetail = async (clubId: string) => {
  const response = await api.get<ClubDetailRes>(`/clubs/${clubId}`);
  return response.data;
};
