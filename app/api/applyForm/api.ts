import { ApplyFormRes } from "@/types/application";
import { APPLY_FORM, CLUBS } from "../apiUrl";
import axiosInstance from "../axiosInstance";

// 지원서 형식 조회(관리자)
export const getApplicationForm = async (clubId: string) => {
  try {
    const res = await axiosInstance.get<ApplyFormRes>(
      `${CLUBS}/${clubId}${APPLY_FORM}`
    );
    return res.data;
  } catch (error) {
    console.log("failed to fetch application form", error);
    throw error;
  }
};

export interface RegisterApplyFormParams {
  clubId: string;
  data: {
    requiresPortfolio: boolean;
    applyQuestionList: string[];
  };
}

// 지원서 형식 수정/등록(관리자)
export const registerApplicationForm = async ({
  clubId,
  data,
}: RegisterApplyFormParams) => {
  try {
    const res = await axiosInstance.post(
      `${CLUBS}/${clubId}${APPLY_FORM}`,
      data
    );
    return res.data;
  } catch (error) {
    console.log("failed to post application form", error);
    throw error;
  }
};
