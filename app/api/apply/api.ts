import { Pageable } from "@/types/api";
import { AxiosError } from "axios";
import {
  APPLY,
  APPLY_FORM,
  APPLY_MY,
  APPLY_TEMPS,
  APPLY_TEMPS_MY,
  CLUBS,
  RECRUITMENT,
} from "../apiUrl";
import { APPLY_TEMPS_MY } from "../apiUrl";
import axiosInstance from "../axiosInstance";
import {
  ApplicationListConditionReq,
  ApplyDetailRes,
  ApplyListRes,
} from "@/types/application";

import { IdResponse } from "@/types/api";
import {
  ApplyFormData,
  ApplyFormRes,
  ApplyListRes,
  ApplyDetailRes,
  ApplySaveReq,
  ApplyTempListRes,
  ApplyTempDetailRes,
  ApplicationListConditionReq,
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
      `${CLUBS}/${clubId}${APPLY_FORM}`
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
    const response = await axiosInstance.delete(`${APPLY}/${applyId}`);
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
    const response = await axiosInstance.delete(
      `${APPLY_TEMPS}/${applyTempId}`
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
// 지원 등록
export const postApplication = async (
  recruitmentId: string,
  formData: FormData
) => {
  try {
    const response = await axiosInstance.post(
      `${RECRUITMENT}/${recruitmentId}${APPLY}`,
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
      `${APPLY_TEMPS}/${applyTempId}`
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
      `${RECRUITMENT}/${recruitmentId}/apply-temps`,
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
      `/${RECRUITMENT}/${applyTempId}`,
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

// 동아리 상세 - 지원 현황 리스트
export const getApplicationsList = async (
  clubId: string,
  condition: ApplicationListConditionReq,
  page: Pageable["page"]
) => {
  try {
    const res = await axiosInstance.get<ApplyListRes>(
      `club/${clubId}/applies`,
      {
        params: {
          ...condition,
          page: page,
          size: 10,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log("Error fetching applications list", error);
    return {
      applyDataList: [],
      pageInfo: { contentSize: 0, totalSize: 0, totalPages: 0 },
    };
  }
};

// 지원현황 - 지원서 상세 조회
export const getApplicationDetail = async (applyId: string) => {
  try {
    const res = await axiosInstance.get<ApplyDetailRes>(`/applies/${applyId}`);
    return res.data;
  } catch (error) {
    console.log("Error fetching application detail");
    throw error;
  }
};

// 동아리 상세 - 지원 현황 리스트
export const getApplicationsList = async (
  clubId: string,
  condition: ApplicationListConditionReq,
  page: Pageable["page"]
) => {
  try {
    const res = await axiosInstance.get<ApplyListRes>(
      `club/${clubId}/applies`,
      {
        params: {
          ...condition,
          page: page,
          size: 10,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log("Error fetching applications list", error);
    return {
      applyDataList: [],
      pageInfo: { contentSize: 0, totalSize: 0, totalPages: 0 },
    };
  }
};

// 지원현황 - 지원서 상세 조회
export const getApplicationDetail = async (applyId: string) => {
  try {
    const res = await axiosInstance.get<ApplyDetailRes>(`/applies/${applyId}`);
    return res.data;
  } catch (error) {
    console.log("Error fetching application detail");
    throw error;
  }
};
