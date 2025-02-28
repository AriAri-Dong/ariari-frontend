import { UserDataResponseType } from "@/types/api";
import { MEMBERS, MEMBERS_MY } from "../apiUrl";
import axiosInstance from "../axiosInstance";

export const getMemberDataByNickname = async (nickname: string) => {
  try {
    const { data } = await axiosInstance.get<UserDataResponseType[]>(MEMBERS, {
      params: { nickname },
    });
    console.log("성공 >>>", data);
    return data;
  } catch (err) {
    console.error("회원 정보 조회 실패:", err);
    return [];
  }
};

export const getMemberData = async () => {
  try {
    const { data } = await axiosInstance.get<UserDataResponseType>(MEMBERS_MY);
    console.log("성공 >>>", data);
    return data;
  } catch (err) {
    console.error("유저 정보 조회 실패:", err);
    return {
      memberData: { id: "", nickname: "", profileType: "" },
      schoolData: { name: "" },
    };
  }
};
