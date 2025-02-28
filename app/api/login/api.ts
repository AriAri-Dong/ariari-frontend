import axios from "axios";
import { MEMBERS_MY, REISSUE } from "../apiUrl";
import api from "..";
import { AuthResponseType, UserDataResponseType } from "@/types/api";

export const refreshAccessToken = async () => {
  const response = await axios.post(REISSUE, {}, { withCredentials: true });

  return response.data.accessToken;
};

export const getTokenWithCode = async (code: string) => {
  const url = `/login/kakao?code=${code}`;

  try {
    const { data } = await api.get<AuthResponseType>(url);

    return data;
  } catch (err) {
    console.error(err);
    return { accessToken: "", isFirstLogin: false };
  }
};

export const getMemberData = async () => {
  try {
    const { data } = await api.get<UserDataResponseType>(MEMBERS_MY);

    return data;
  } catch (err) {
    console.error(err);
    return {
      memberData: { id: "", nickname: "", profileType: "" },
      schoolData: { name: "" },
    };
  }
};
