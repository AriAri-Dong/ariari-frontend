import { UserDataResponseType } from "@/types/api";
import {
  MEMBERS_MY_NICKNAME,
  MEMBERS_MY_PROFILE,
  MEMBERS,
  MEMBERS_MY,
} from "../apiUrl";
import axiosInstance from "../axiosInstance";

// 닉네임 변경 API
export const updateNickname = async (nickname: string) => {
  try {
    const { data } = await axiosInstance.put(MEMBERS_MY_NICKNAME, { nickname });
    console.log("닉네임 변경 성공 >>>", data);
    return data;
  } catch (err) {
    console.error("닉네임 변경 실패:", err);
    throw err;
  }
};

// 프로필 변경 API
export const updateProfileType = async (profileType: string) => {
  try {
    const { data } = await axiosInstance.put(MEMBERS_MY_PROFILE, {
      profileType,
    });
    console.log("프로필 변경 성공 >>>", data);
    return data;
  } catch (err) {
    console.error("프로필 변경 실패:", err);
    throw err;
  }
};

// 닉네임으로 회원 데이터 조회
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

// 현재 로그인된 사용자 정보 조회
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
