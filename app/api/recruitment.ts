import { ClubRecruitmentListRes } from "@/types/recruitment";
import api from ".";

// 해당 동아리 모집공고 리스트
export const getClubRecruitment = async (clubId: string) => {
  const response = await api.get<ClubRecruitmentListRes>(
    `/clubs/${clubId}/recruitments`
  );
  return response.data;
};

// 모집 종료
export const endRecruitment = async (recruitmentId: string) => {
  const response = await api.put(`/recruitments/${recruitmentId}`);
  return response.data;
};

// 모집 삭제
export const deleteRecruitment = async (recruitmentId: string) => {
  const response = await api.delete(`/recruitments/${recruitmentId}`);
  return response.data;
};
