import api from "@/api";
import { AuthResponseType, UserDataResponseType } from "@/types/api";

export const getTokenWithCode = async (code: string) => {
  const url = `/login/kakao?code=${code}`;

  try {
    const { data } = await api.get<AuthResponseType>(url);

    return data;
  } catch (err) {
    console.error(err);
    return { accessToken: "", refreshToken: "", isFirstLogin: false };
  }
};

export const getUserData = async () => {
  const url = `/member`;

  try {
    const { data } = await api.get<UserDataResponseType>(url);

    return data;
  } catch (err) {
    console.error(err);
    return {
      memberData: { id: "", nickname: "", profileType: "" },
      schoolData: { name: "" },
    };
  }
};
