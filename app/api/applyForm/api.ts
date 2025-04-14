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
