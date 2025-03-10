import { ClubRecruitmentListRes } from "@/types/recruitment";
import { RECRUITMENT_RANKING } from "../apiUrl";
import axiosInstance from "../axiosInstance";

export const getRecruitmentRanking = async () => {
  try {
    const { data } = await axiosInstance.get(RECRUITMENT_RANKING);
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

// 해당 동아리 모집공고 리스트
export const getClubRecruitment = async (clubId: string) => {
  try {
    const { data } = await axiosInstance.get<ClubRecruitmentListRes>(
      `/clubs/${clubId}/recruitments`
    );
    return data;
  } catch (err) {
    console.log("동아리 모집공고 리스트 조회 실패", err);
  }
};

// 모집 종료
export const endRecruitment = async (recruitmentId: string) => {
  try {
    const { data } = await axiosInstance.put(`/recruitments/${recruitmentId}`);
    return data;
  } catch (err) {
    console.log("모집종료 실패", err);
  }
};

// 모집 삭제
export const deleteRecruitment = async (recruitmentId: string) => {
  try {
    const { data } = await axiosInstance.delete(
      `/recruitments/${recruitmentId}`
    );
    return data;
  } catch (err) {
    console.log("모집삭제 실패", err);
  }
};
