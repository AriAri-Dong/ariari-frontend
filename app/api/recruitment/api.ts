import axios from "axios";
import { RECRUITMENT_RANKING } from "../apiUrl";
import axiosInstance from "../axiosInstance";

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
