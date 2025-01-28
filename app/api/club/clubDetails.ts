import { CLUBS } from "../apiUrl";
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
