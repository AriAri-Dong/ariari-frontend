import { UserDataResponseType } from "@/types/api";
import axiosInstance from "..";
import { MEMBERS_MY } from "../apiUrl";

export const getMemberData = async () => {
  try {
    const { data } = await axiosInstance.get<UserDataResponseType>(MEMBERS_MY);
    console.log("성공 >>>", data);
    return data;
  } catch (err) {
    console.error(err);
    console.error("유저 정보 조회 실패:", err);
    // return {
    //   memberData: { id: "", nickname: "", profileType: "" },
    //   schoolData: { name: "" },
    // };
  }
};
