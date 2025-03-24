import { ClubDetailRes } from "@/types/club";
import axiosInstance from "../axiosInstance";
import { CLUBS } from "../apiUrl";
import { AxiosError } from "axios";

// 동아리 상세 정보 조회
export const fetchClubInfo = async (id: string) => {
  try {
    const res = await axiosInstance.get<ClubDetailRes>(`${CLUBS}/${id}`);

    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response && err.response.data.code === 404) {
        throw new Error("해당 동아리를 찾을 수 없습니다.");
      }
      if (err.response && err.response.data.message) {
        throw new Error(err.response.data.message);
      }
    }
    throw new Error("문제가 발생했습니다.");
  }
};
