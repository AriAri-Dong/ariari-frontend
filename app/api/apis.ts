import api from "@/api";
import { AuthResponseType } from "@/api/types";

export const getTokenWithCode = async (code: string) => {
  const url = `/login/kakao?code=${code}`;

  const { data } = await api.get<AuthResponseType>(url);

  return data;
};
