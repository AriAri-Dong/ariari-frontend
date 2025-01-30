import { CLUBS, CLUBS_SEARCH } from "../apiUrl";
import axiosInstance from "../axiosInstance";

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

// 동아리 검색 조회
export const getClubsInfo = async () => {
  try {
    const response = await axiosInstance.get(CLUBS_SEARCH);
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};

// 내 동아리 조회
export const getMyClubs = async (
  page: number = 0,
  size: number = 1,
  sort: string[] = ["name"]
) => {
  try {
    const params = {
      page,
      size,
      sort: sort.join(","),
    };

    // 요청 보내기
    const response = await axiosInstance.get(CLUBS_SEARCH, { params });
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
