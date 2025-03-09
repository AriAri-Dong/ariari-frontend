import { ClubDetailRes } from "@/types/club";
import axiosInstance from "../axiosInstance";
import { CLUBS } from "../apiUrl";

// 동아리 상세 정보 조회
export const fetchClubInfo = async (id: string) => {
  const res = await axiosInstance.get<ClubDetailRes>(`${CLUBS}/${id}`);
  return res.data;
};
