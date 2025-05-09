import axiosInstance from "../axiosInstance";
import { AxiosError } from "axios";
import {
  ClubReviewData,
  ClubReviewDetail,
  ClubReviewListRes,
  ClubReviewSaveReq,
  PassReviewDetail,
  PassReviewListRes,
  PassReviewSaveReq,
  TagData,
} from "@/types/review";
import {
  CLUB_REVIEW,
  CLUB_REVIEW_DETAIL,
  CLUB_REVIEW_TAG,
  PASS_REVIEW,
  PASS_REVIEW_DETAIL,
} from "../apiUrl";

// 동아리 활동후기 리스트
export const getClubReview = async (
  clubId: string,
  page?: number,
  size?: number,
  sort?: string
) => {
  try {
    const params: Record<string, any> = {
      ...(page && { page }),
      ...(size && { size }),
      ...(sort && { sort }),
    };
    const { data } = await axiosInstance.get<ClubReviewListRes>(
      `${CLUB_REVIEW}/${clubId}`,
      { params }
    );
    console.log(data);
    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response && err.response.data.message) {
        throw new Error(err.response.data.message);
      }
    }
    throw new Error("문제가 발생했습니다.");
  }
};
// 동아리 활동후기 상세 조회
export const getClubReviewDetail = async (clubReviewId: string) => {
  try {
    const { data } = await axiosInstance.get<ClubReviewDetail>(
      `${CLUB_REVIEW_DETAIL}/${clubReviewId}`
    );
    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response && err.response.data.message) {
        throw new Error(err.response.data.message);
      }
    }
    throw new Error("문제가 발생했습니다.");
  }
};

// 동아리 태그 통계
export const getClubTagStatistics = async (clubId: string) => {
  try {
    const { data } = await axiosInstance.get<TagData[]>(
      `${CLUB_REVIEW}/${clubId}/tag-statistics`
    );
    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response && err.response.data.message) {
        throw new Error(err.response.data.message);
      }
    }
    throw new Error("문제가 발생했습니다.");
  }
};

// 사용 가능한 태그 리스트
export const getClubTag = async () => {
  try {
    const { data } = await axiosInstance.get<TagData[]>(CLUB_REVIEW_TAG);
    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response && err.response.data.message) {
        throw new Error(err.response.data.message);
      }
    }
    throw new Error("문제가 발생했습니다.");
  }
};

// 활동후기 작성하기
export const postClubReview = async (
  clubId: string,
  data: ClubReviewSaveReq
) => {
  try {
    const res = await axiosInstance.post(`${CLUB_REVIEW}/${clubId}`, data);
    return res.status;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response && err.response.data.message) {
        throw new Error(err.response.data.message);
      }
    }
    throw new Error("문제가 발생했습니다.");
  }
};

// --------------- 합격 후기 -----------------

// 동아리 합격후기 리스트
export const getAcceptanceReview = async (
  clubId: string,
  page?: number,
  size?: number,
  sort?: string
) => {
  try {
    const params: Record<string, any> = {
      ...(page && { page }),
      ...(size && { size }),
      ...(sort && { sort }),
    };
    const { data } = await axiosInstance.get<PassReviewListRes>(
      `${PASS_REVIEW}/${clubId}`,
      { params }
    );
    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response && err.response.data.message) {
        throw new Error(err.response.data.message);
      }
    }
    throw new Error("문제가 발생했습니다.");
  }
};

// 동아리 합격후기 상세 조회
export const getAccectanceReviewDetail = async (clubReviewId: string) => {
  try {
    const { data } = await axiosInstance.get<PassReviewDetail>(
      `${PASS_REVIEW_DETAIL}/${clubReviewId}`
    );
    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response && err.response.data.message) {
        throw new Error(err.response.data.message);
      }
    }
    throw new Error("문제가 발생했습니다.");
  }
};
// 합격후기 작성하기
export const postAcceptanceReview = async (
  clubId: string,
  data: PassReviewSaveReq
) => {
  try {
    const res = await axiosInstance.post(`${PASS_REVIEW}/${clubId}`, data);
    return res.status;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response && err.response.data.message) {
        throw new Error(err.response.data.message);
      }
    }
    throw new Error("문제가 발생했습니다.");
  }
};
