import { AxiosError } from "axios";
import { APPLY_MY, APPLY_TEMPS_MY } from "../apiUrl";
import axiosInstance from "../axiosInstance";

import { IdResponse } from "@/types/api";
import {
  ApplyFormData,
  ApplyFormRes,
  ApplyListRes,
  ApplySaveReq,
  ApplyTempListRes,
  ApplyTempDetailRes,
} from "@/types/application";

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
// 지원형식 조회
export const getApplyForm = async (clubId: string) => {
  try {
    const response = await axiosInstance.get<ApplyFormRes>(
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

// 내 임시 지원 리스트 조회
export const getMyApplyTmpList = async () => {
  try {
    console.log("내 임시 지원 리스트 조회");
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
// 지원 등록
export const postApplication = async (
  recruitmentId: string,
  formData: FormData
) => {
  try {
    const response = await axiosInstance.post(
      `/recruitments/${recruitmentId}/applies`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

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

// 임시 지원 상세 조회
export const getApplicationTemp = async (
  applyTempId: string
): Promise<ApplyTempDetailRes> => {
  try {
    const response = await axiosInstance.get<ApplyTempDetailRes>(
      `apply-temps/${applyTempId}`
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

// 임시 지원 저장
export const postApplicationTemp = async (
  recruitmentId: string,
  formData: FormData
) => {
  try {
    const response = await axiosInstance.post<IdResponse>(
      `/recruitments/${recruitmentId}/apply-temps`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return response.data.id;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response && err.response.data.message) {
        throw new Error(err.response.data.message);
      }
    }
    throw new Error("문제가 발생했습니다.");
  }
};
// 임시 지원 수정
export const putApplicationTemp = async (
  applyTempId: string,
  formData: FormData
) => {
  try {
    const response = await axiosInstance.put<string>(
      `/apply-temps/${applyTempId}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

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
