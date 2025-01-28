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
export const postClub = async (clubData: any) => {
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
