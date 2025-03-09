import { Pageable } from "@/types/api";
import { SCHOOLS } from "../apiUrl";
import axiosInstance from "../axiosInstance";

export interface SchoolDataResponseType {
  id: string;
  name: string;
}

// getSchoolData 함수 정의
export const getSchoolData = async (
  query?: string,
  pageable: Pageable = { page: 0, size: 10, sort: [""] }
) => {
  try {
    const params = {
      // query: query,
      page: pageable.page,
      size: pageable.size,
      ...(pageable.sort ? { sort: pageable.sort.join(",") } : {}),
    };

    const { data } = await axiosInstance.get<{
      data: SchoolDataResponseType[];
    }>(SCHOOLS, {
      params: params,
    });

    console.log("학교 정보 조회 성공:", data);
    return data;
  } catch (err) {
    console.error("학교 정보 조회 실패:", err);
    return {
      data: [],
    };
  }
};
