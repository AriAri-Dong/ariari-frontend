import axiosInstance from "../axiosInstance";
import { AxiosError } from "axios";
import {
  ClubReviewData,
  ClubReviewDetail,
  ClubReviewListRes,
  ClubReviewSaveReq,
  TagData,
  TagIconType,
} from "@/types/review";

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
      `/club-review/${clubId}`,
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
      `/club-review/detail/${clubReviewId}`
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
      `club-review/${clubId}/tag-statistics`
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
    const { data } = await axiosInstance.get<TagData[]>(`club-review/tag-data`);
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
    const res = await axiosInstance.post(`/club-review/${clubId}`, data);
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
