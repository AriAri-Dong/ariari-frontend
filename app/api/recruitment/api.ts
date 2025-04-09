import axios from "axios";
import {
  RECRUITMENT,
  RECRUITMENT_BOOKMARKS,
  RECRUITMENT_EXTERNAL,
  RECRUITMENT_INTERNAL,
  RECRUITMENT_RANKING_EXTERNAL,
  RECRUITMENT_RANKING_INTERNAL,
} from "../apiUrl";
import axiosInstance from "../axiosInstance";
import { ClubSearchCondition, Pageable } from "@/types/api";
import {
  ClubRecruitmentListResponse,
  RecruitmentResponse,
} from "@/types/recruitment";
import { AxiosError } from "axios";

// 교내 모집 랭킹 리스트 조회
export const getInternalRecruitmentRanking = async () => {
  try {
    const { data } = await axiosInstance.get(RECRUITMENT_RANKING_INTERNAL);
    console.log("성공 >>>", data);
    return data;
  } catch (err) {
    console.error("조회 실패:", err);
  }
};

// 교외 모집 랭킹 리스트 조회
export const getExternalRecruitmentRanking = async () => {
  try {
    const { data } = await axios.get(RECRUITMENT_RANKING_EXTERNAL);
    console.log("성공 >>>", data);
    return data;
  } catch (err) {
    console.error("조회 실패:", err);
  }
};

// 전체 모집 리스트 조회
export const getAllRecruitments = async (
  condition: ClubSearchCondition,
  pageable: Pageable
): Promise<ClubRecruitmentListResponse> => {
  try {
    const filteredCondition = {
      clubCategoryTypes: condition.clubCategoryTypes
        ? condition.clubCategoryTypes[0]
        : undefined,
      clubRegionTypes: condition.clubRegionTypes
        ? condition.clubRegionTypes[0]
        : undefined,
      participantTypes: condition.participantTypes
        ? condition.participantTypes[0]
        : undefined,
    };

    // 쿼리 파라미터 생성
    const params = {
      ...filteredCondition,
      page: pageable.page,
      size: pageable.size,
      ...(pageable.sort ? { sort: pageable.sort.join(",") } : {}),
    };

    const response = await axiosInstance.get<ClubRecruitmentListResponse>(
      RECRUITMENT,
      {
        params,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching recruitment info:", error);
    throw error;
  }
};

// 교내 모집 리스트 조회
export const getInternalRecruitments = async (
  condition: ClubSearchCondition,
  pageable: Pageable
): Promise<ClubRecruitmentListResponse> => {
  try {
    const filteredCondition = {
      clubCategoryTypes: condition.clubCategoryTypes
        ? condition.clubCategoryTypes[0]
        : undefined,
      clubRegionTypes: condition.clubRegionTypes
        ? condition.clubRegionTypes[0]
        : undefined,
      participantTypes: condition.participantTypes
        ? condition.participantTypes[0]
        : undefined,
    };

    // 쿼리 파라미터 생성
    const params = {
      ...filteredCondition,
      page: pageable.page,
      size: pageable.size,
      ...(pageable.sort ? { sort: pageable.sort.join(",") } : {}),
    };

    const response = await axiosInstance.get<ClubRecruitmentListResponse>(
      RECRUITMENT_INTERNAL,
      {
        params,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching recruitment info:", error);
    throw error;
  }
};

// 교외 모집 리스트 조회
export const getExternalRecruitments = async (
  condition: ClubSearchCondition,
  pageable: Pageable
): Promise<ClubRecruitmentListResponse> => {
  try {
    const filteredCondition = {
      clubCategoryTypes: condition.clubCategoryTypes
        ? condition.clubCategoryTypes[0]
        : undefined,
      clubRegionTypes: condition.clubRegionTypes
        ? condition.clubRegionTypes[0]
        : undefined,
      participantTypes: condition.participantTypes
        ? condition.participantTypes[0]
        : undefined,
    };

    // 쿼리 파라미터 생성
    const params = {
      ...filteredCondition,
      page: pageable.page,
      size: pageable.size,
      ...(pageable.sort ? { sort: pageable.sort.join(",") } : {}),
    };

    const response = await axios.get<ClubRecruitmentListResponse>(
      RECRUITMENT_EXTERNAL,
      {
        params,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching recruitment info:", error);
    throw error;
  }
};

// 모집공고 북마크 등록
export const addRecruitmentBookmark = async (recruitmentId: string) => {
  try {
    const response = await axiosInstance.post(
      `${RECRUITMENT}/${recruitmentId}/bookmark`
    );
    console.log("북마크 등록 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error(" 북마크 등록 실패:", error);
    throw error;
  }
};

// 모집공고 북마크 삭제
export const removeRecruitmentBookmark = async (recruitmentId: string) => {
  try {
    const response = await axiosInstance.delete(
      `${RECRUITMENT}/${recruitmentId}/bookmark`
    );
    console.log("북마크 삭제 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error(" 북마크 삭제 실패:", error);
    throw error;
  }
};

// 북마크 모집공고 조회
export const getBookmarkRecruitment = async (
  pageable: Pageable
): Promise<ClubRecruitmentListResponse> => {
  try {
    const params = {
      page: pageable.page,
      size: pageable.size,
      ...(pageable.sort ? { sort: pageable.sort.join(",") } : {}),
    };

    const response = await axiosInstance.get<ClubRecruitmentListResponse>(
      RECRUITMENT_BOOKMARKS,
      {
        params,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching club info:", error);
    throw error;
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
