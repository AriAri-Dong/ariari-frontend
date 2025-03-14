import { Pageable } from "@/types/api";
import { SCHOOLS, SCHOOLS_VALIDATE, SCHOOLS_SEND } from "../apiUrl";
import axiosInstance from "../axiosInstance";

export interface SchoolDataResponseType {
  id: string;
  name: string;
}

// 학교 이메일 인증 요청 (이메일 발송)
export const sendSchoolAuthEmail = async (email: string) => {
  try {
    const { data } = await axiosInstance.post(SCHOOLS_SEND, { email });
    console.log("학교 인증 이메일 발송 성공:", data);
    return data;
  } catch (err) {
    console.error("학교 인증 이메일 발송 실패:", err);
    throw err;
  }
};

// 학교 인증 코드 검증
export const validateSchoolAuthCode = async (schoolAuthCode: string) => {
  try {
    const { data } = await axiosInstance.post(SCHOOLS_VALIDATE, {
      schoolAuthCode,
    });
    console.log("학교 인증 코드 검증 성공:", data);
    return data;
  } catch (err) {
    console.error("학교 인증 코드 검증 실패:", err);
    throw err;
  }
};

// 학교 정보 조회
export const getSchoolData = async (
  query?: string,
  pageable: Pageable = { page: 0, size: 10, sort: [""] }
) => {
  try {
    const params = {
      page: pageable.page,
      size: pageable.size,
      ...(pageable.sort ? { sort: pageable.sort.join(",") } : {}),
    };

    const { data } = await axiosInstance.get<{
      data: SchoolDataResponseType[];
    }>(SCHOOLS, { params });

    console.log("학교 정보 조회 성공:", data);
    return data;
  } catch (err) {
    console.error("학교 정보 조회 실패:", err);
    throw err;
  }
};
