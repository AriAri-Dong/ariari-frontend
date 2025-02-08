import {
  ClubRecruitmentListResponse,
  RecruitmentResponse,
} from "@/types/recruitment";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Authorization:
      "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiI2NzMxMjc2MTc0NDgzNTcyNjgiLCJ0b2tlblR5cGUiOiJBQ0NFU1NfVE9LRU4iLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9VU0VSIn1dLCJpYXQiOjE3Mzg2MzY4NjYsImV4cCI6MTczODY3Mjg2Nn0.mfigEE0G2nN_cW1yUbXFs1wjb5lIl0thlOXcBOy6AMH_IhYeY_zB7pkI-v2V3zW_",
  },
});

export const getRecruitmentDetail = async (recruitmentId: string) => {
  console.log("id", recruitmentId);
  const response = await api.get<RecruitmentResponse>(
    `/recruitments/${recruitmentId}`
  );
  return response.data;
};
export const getClubRecruitmentList = async (clubId: string) => {
  const response = await api.get<ClubRecruitmentListResponse>(
    `/clubs/${clubId}/recruitments`
  );
  return response.data;
};

export const postClubBookmark = async (clubId: string) => {
  const response = await api.post(`/clubs/${clubId}/bookmark`);
  return response.status;
};
export const deleteClubBookmark = async (clubId: string) => {
  const response = await api.delete(`/clubs/${clubId}/bookmark`);
  return response.status;
};
export const postRecruitmentBookmark = async (recruitmentId: string) => {
  const response = await api.post(`/recruitments/${recruitmentId}/bookmark`);
  return response.status;
};
export const deleteRecruitmentBookmark = async (recruitmentId: string) => {
  const response = await api.delete(`/recruitments/${recruitmentId}/bookmark`);
  return response.status;
};
