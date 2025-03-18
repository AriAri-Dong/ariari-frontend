import { AxiosError } from "axios";
import { APPLY_MY, APPLY_TEMPS_MY } from "../apiUrl";
import axiosInstance from "../axiosInstance";
import { ApplyListRes, ApplyTempListRes } from "@/types/application";

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

// 내 지원 리스트 조회
export const getMyApplyList = async () => {
  try {
    const response = await axiosInstance.get<ApplyListRes>(APPLY_MY);
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

// 내 임시 지원 리스트 조회
export const getMyApplyTmpList = async () => {
  try {
    const response = await axiosInstance.get<ApplyTempListRes>(APPLY_TEMPS_MY);
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

// 지원 삭제
export const deleteMyApply = async (applyId: string) => {
  try {
    const response = await axiosInstance.delete(`/applies/${applyId}`);
    return response.status;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response && err.response.data.message) {
        throw new Error(err.response.data.message);
      }
    }
    throw new Error("문제가 발생했습니다.");
  }
};

// 임시 지원 삭제
export const deleteMyApplyTmp = async (applyTempId: string) => {
  try {
    const response = await axiosInstance.delete(`/apply-temps/${applyTempId}`);
    return response.status;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response && err.response.data.message) {
        throw new Error(err.response.data.message);
      }
    }
    throw new Error("문제가 발생했습니다.");
  }
};
