import { AxiosError } from "axios";
import { APPLY_TEMPS_MY } from "../apiUrl";
import axiosInstance from "../axiosInstance";
import { ApplyFormData } from "@/types/application";

export const getAppliedList = async (
  page: number = 0,
  size: number = 10,
  sort: string[] = [""]
) => {
  try {
    const pageable = {
      page: page,
      size: size,
      sort: sort,
    };

    const { data } = await axiosInstance.get(APPLY_TEMPS_MY, {
      params: {
        pageable: pageable,
      },
    });

    console.log("내 임시 지원 리스트 조회 성공:", data);
    return data;
  } catch (err) {
    console.error("내 임시 지원 리스트 조회 실패:", err);
    return {
      data: [],
    };
  }
};

// 지원형식 조회
export const getApplyForm = async (clubId: string) => {
  try {
    const response = await axiosInstance.get<ApplyFormData>(
      `/clubs/${clubId}/apply-forms`
    );
    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response && err.response.data.message) {
        throw new Error(err.response.data.message);
      }
    }
    throw new Error("문제가 발생했습니다.");
  }
};
