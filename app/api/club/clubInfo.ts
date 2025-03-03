import { ClubDetailRes } from "@/types/club";
import api from "..";

// 동아리 상세 정보 조회
export const fetchClubInfo = async (id: string) => {
  const res = await api.get<ClubDetailRes>(`/clubs/${id}`);
  return res.data;
};
