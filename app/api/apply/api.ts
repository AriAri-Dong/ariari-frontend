import { Pageable } from "@/types/api";
import { APPLY_TEMPS_MY } from "../apiUrl";
import axiosInstance from "../axiosInstance";
import { ApplicationListConditionReq, ApplyListRes } from "@/types/application";

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
