import axios from "axios";
import {
  RECRUITMENT,
  RECRUITMENT_BOOKMARKS,
  RECRUITMENT_RANKING,
} from "../apiUrl";
import axiosInstance from "../axiosInstance";
import { ClubSearchCondition, Pageable } from "@/types/api";
import { RecruitmentData, RecruitmentResponse } from "@/types/recruitment";

export const getRecruitmentRanking = async () => {
  try {
    const { data } = await axios.get(RECRUITMENT_RANKING);
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

// 전체 모집리스트 조회
export const getAllRecruitments = async (
  condition: ClubSearchCondition,
  pageable: Pageable
): Promise<RecruitmentResponse> => {
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

    const response = await axiosInstance.get<RecruitmentResponse>(RECRUITMENT, {
      params,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching recruitment info:", error);
    throw error;
  }
};

// 모집공고 북마크 등록
export const addRecruitmentBookmark = async (recruitmentId: number) => {
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
export const removeRecruitmentBookmark = async (recruitmentId: number) => {
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
): Promise<RecruitmentResponse> => {
  try {
    const params = {
      page: pageable.page,
      size: pageable.size,
      ...(pageable.sort ? { sort: pageable.sort.join(",") } : {}),
    };

    const response = await axiosInstance.get<RecruitmentResponse>(
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
