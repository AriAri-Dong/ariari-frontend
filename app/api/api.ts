import {
  ClubRecruitmentListResponse,
  RecruitmentResponse,
} from "@/types/recruitment";
import axios from "axios";
import api from ".";

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
