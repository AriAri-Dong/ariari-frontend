import axiosInstance from "../axiosInstance";
import {
  ClubRecruitmentListResponse,
  RecruitmentResponse,
} from "@/types/recruitment";
import { RECRUITMENT_RANKING } from "../apiUrl";
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

// 해당 동아리 모집공고 리스트
export const getClubRecruitment = async (clubId: string) => {
  try {
    const { data } = await axiosInstance.get<ClubRecruitmentListResponse>(
      `/clubs/${clubId}/recruitments`
    );
    return data;
  } catch (err) {
    console.log("동아리 모집공고 리스트 조회 실패", err);
  }
};

// 모집 종료
export const endRecruitment = async (recruitmentId: string) => {
  try {
    const { data } = await axiosInstance.put(`/recruitments/${recruitmentId}`);
    return data;
  } catch (err) {
    console.log("모집종료 실패", err);
  }
};

// 모집 삭제
export const deleteRecruitment = async (recruitmentId: string) => {
  try {
    const { data } = await axiosInstance.delete(
      `/recruitments/${recruitmentId}`
    );
    return data;
  } catch (err) {
    console.log("모집삭제 실패", err);
  }
};
// 모집공고 상세
export const getRecruitmentDetail = async (recruitmentId: string) => {
  try {
    const response = await axiosInstance.get<RecruitmentResponse>(
      `/recruitments/${recruitmentId}`
    );
    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response && err.response.data.message) {
        throw new Error(err.response.data.message);
      }
    }
    throw new Error("모집공고를 찾을 수 없습니다.");
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

// 모집공고 북마크
export const postRecruitmentBookmark = async (recruitmentId: string) => {
  try {
    const response = await axiosInstance.post(
      `/recruitments/${recruitmentId}/bookmark`
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

// 모집공고 북마크 취소
export const deleteRecruitmentBookmark = async (recruitmentId: string) => {
  try {
    const response = await axiosInstance.delete(
      `/recruitments/${recruitmentId}/bookmark`
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
