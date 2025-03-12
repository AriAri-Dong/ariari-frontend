import axios from "axios";
import { RECRUITMENT, RECRUITMENT_RANKING } from "../apiUrl";
import axiosInstance from "../axiosInstance";
import { ClubSearchCondition, Pageable } from "@/types/api";
import { RecruitmentResponse } from "@/types/recruitment";

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
      clubCategoryTypes: condition.clubCategoryTypes?.length
        ? condition.clubCategoryTypes
        : undefined,
      clubRegionTypes: condition.clubRegionTypes?.length
        ? condition.clubRegionTypes
        : undefined,
      participantTypes: condition.participantTypes?.length
        ? condition.participantTypes
        : undefined,
    };

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
