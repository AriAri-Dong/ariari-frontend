import axiosInstance from "../axiosInstance";
import { CLUBS, CLUBS_MY, CLUBS_SEARCH } from "../apiUrl";
import {
  ClubResponse,
  ClubSearchCondition,
  ClubData,
  Pageable,
  ClubInfoResponse,
} from "@/types/api";

// 동아리 수정
export const updateClubInfo = async (clubId: number) => {
  try {
    const response = await axiosInstance.put(`${CLUBS}/${clubId}`);
    return response.data;
  } catch (error) {
    console.error("Error updating club info:", error);
    throw error;
  }
};

// 전체 동아리 조회
export const getAllClubsInfo = async (
  condition: ClubSearchCondition,
  pageable: Pageable
): Promise<ClubResponse> => {
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

    const response = await axiosInstance.get<ClubResponse>(CLUBS, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching club info:", error);
    throw error;
  }
};

// 동아리 등록
export const createClub = async (clubData: any) => {
  try {
    const response = await axiosInstance.post(CLUBS, clubData);
    return response.data;
  } catch (error) {
    console.error("Error creating club:", error);
    throw error;
  }
};

// 동아리 검색 조회
export const getClubsInfo = async (
  query: string,
  pageable: Pageable
): Promise<ClubInfoResponse> => {
  try {
    const params = {
      query,
      page: pageable.page,
      size: pageable.size,
      ...(pageable.sort ? { sort: pageable.sort.join(",") } : {}),
    };

    const response = await axiosInstance.get<ClubInfoResponse>(CLUBS_SEARCH, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching club info:", error);
    throw error;
  }
};

// 내 동아리 목록 조회
export const getMyClubs = async (
  pageable: Pageable
): Promise<ClubInfoResponse> => {
  try {
    const params = {
      page: pageable.page,
      size: pageable.size,
      ...(pageable.sort ? { sort: pageable.sort.join(",") } : {}),
    };

    const response = await axiosInstance.get<ClubInfoResponse>(CLUBS_MY, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching my clubs info:", error);
    throw error;
  }
};

// 동아리 상세 조회
export const getClubDetails = async (clubId: string) => {
  try {
    const response = await axiosInstance.get(`${CLUBS}/${clubId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching club details:", error);
    throw error;
  }
};
