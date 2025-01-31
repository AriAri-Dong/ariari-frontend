import api from "@/api";
import { AuthResponseType, UserDataResponseType } from "@/api/types";

export const getTokenWithCode = async (code: string) => {
  const url = `/login/kakao?code=${code}`;

  const { data } = await api.get<AuthResponseType>(url);

  return data;
};

export const getUserData = async () => {
  const url = `/member`;

  const { data } = await api.get<UserDataResponseType>(url);

  return data;
};
