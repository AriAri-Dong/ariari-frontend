import {
  ClubRecruitmentListResponse,
  FormDataRequest,
  RecruitmentSaveReq,
} from "@/types/recruitment";
import { RECRUITMENT_RANKING } from "../apiUrl";
import axiosInstance from "../axiosInstance";
import { AxiosError } from "axios";

export const getRecruitmentRanking = async () => {
  try {
    const { data } = await axiosInstance.get(RECRUITMENT_RANKING);
    console.log("성공 >>>", data);
    return data;
  } catch (err) {
    console.error("조회 실패:", err);
    // return {
    //   memberData: { id: "", nickname: "", profileType: "" },
    //   schoolData: { name: "" },
    // };
  }
};
// 동아리 모집공고 리스트
export const getClubRecruitmentList = async (clubId: string) => {
  try {
    const response = await axiosInstance.get<ClubRecruitmentListResponse>(
      `/clubs/${clubId}/recruitments`
    );
    return response.data;
  } catch (err) {
    console.log("동아리 모집공고 리스트 불러오기 실패", err);
  }
};
// 모집공고 등록
export const postRecruitment = async (clubId: string, formData: FormData) => {
  try {
    const response = await axiosInstance.post(
      `/clubs/${clubId}/recruitments`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.status;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response && err.response.data.message) {
        throw new Error(err.response.data.message);
      }
    }
    throw new Error("문제가 발생했습니다.");
  }
};
