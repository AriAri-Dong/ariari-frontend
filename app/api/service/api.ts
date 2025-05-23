import {
  SystemFaqDataResponse,
  SystemNoticeDetailResponse,
  SystemNoticeListResponse,
  TermsOfServiceResponse,
  TermType,
} from "@/types/service";
import { SERVICE_FAQS, SERVICE_NOTICES, SYSTEM_TERM } from "../apiUrl";
import axiosInstance from "../axiosInstance";

// 서비스 공지사항 리스트 조회
export const getServiceNotices = async () => {
  const { data } = await axiosInstance.get<SystemNoticeListResponse>(
    SERVICE_NOTICES
  );
  return data.systemNoticeDataList;
};

// 서비스 공지사항 상세 조회
export const getServiceNoticesDetail = async (systemNoticeId: number) => {
  const { data } = await axiosInstance.get<SystemNoticeDetailResponse>(
    `${SERVICE_NOTICES}/${systemNoticeId}/details`
  );
  return data.systemNoticeData;
};

// 서비스 FAQ 조회
export const getServiceFaqDetail = async () => {
  const { data } = await axiosInstance.get<SystemFaqDataResponse>(SERVICE_FAQS);
  return data.systemFaqDataList;
};

// 약관 - 개인정보처리방침, 동아리 이용수칙, 플랫폼 이용수칙

export const getTerms = async (termType: TermType) => {
  try {
    const { data } = await axiosInstance.get<TermsOfServiceResponse>(
      `${SYSTEM_TERM}/${termType}`
    );
    return data;
  } catch (error) {
    console.error("Error fetching terms:", error);
    throw error;
  }
};
