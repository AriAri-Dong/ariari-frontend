import {
  SystemFaqDataResponse,
  SystemNoticeDetailResponse,
  SystemNoticeListResponse,
} from "@/types/service";
import axios from "axios";
import { SERVICE_FAQS, SERVICE_NOTICES } from "../apiUrl";

// 서비스 공지사항 리스트 조회
export const getServiceNotices = async () => {
  const { data } = await axios.get<SystemNoticeListResponse>(SERVICE_NOTICES);
  return data.systemNoticeDataList;
};

// 서비스 공지사항 상세 조회
export const getServiceNoticesDetail = async (systemNoticeId: number) => {
  const { data } = await axios.get<SystemNoticeDetailResponse>(
    `${SERVICE_NOTICES}/${systemNoticeId}`
  );
  return data.systemNoticeData;
};

// 서비스 FAQ 조회
export const getServiceFaqDetail = async () => {
  const { data } = await axios.get<SystemFaqDataResponse>(SERVICE_FAQS);
  return data.systemFaqDataList;
};
