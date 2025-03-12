import { Pageable } from "@/types/api";
import { CLUBS, CLUBS_MY, CLUBS_SEARCH } from "../apiUrl";
import axiosInstance from "../axiosInstance";

// 동아리 수정
export const updateClubInfo = async (clubId: number) => {
  try {
    const response = await axiosInstance.put(CLUBS, clubId);
    return response.data;
  } catch (error) {
    console.error("Error updating user info:", error);
    throw error;
  }
};

interface ClubInfoResponse {
  data: any;
}

// 전체 동아리 검색 조회
export const getAllClubsInfo = async () => {
  try {
    const response = await axiosInstance.get(CLUBS);
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};

// 동아리 등록
export const createClub = async (clubData: any) => {
  try {
    const response = await axiosInstance.post(CLUBS, clubData);
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

/**
 * 동아리 검색 조회 API 호출
 * @param query 검색할 문자열
 * @param pageable 페이지네이션 정보
 * @returns 클럽 정보
 */
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

/**
 * 내 동아리 목록 조회 API 호출
 * @param pageable 페이지네이션 정보
 * @returns 내 동아리 목록
 */
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

// 동아리 북마크
export const postClubBookmark = async (clubId: string) => {
  try {
    const response = await axiosInstance.post(`/clubs/${clubId}/bookmark`);
    return response.status;
  } catch (err) {
    console.log("동아리 북마크 실패", err);
  }
};

// 동아리 북마크 취소
export const deleteClubBookmark = async (clubId: string) => {
  try {
    const response = await axiosInstance.delete(`/clubs/${clubId}/bookmark`);
    return response.status;
  } catch (err) {
    console.log("동아리 북마크 취소 실패", err);
  }
};
