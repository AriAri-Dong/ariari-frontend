export interface SystemFaqData {
  id: number;
  title: string;
  body: string;
  systemFaqStatusType: "SECURITY" | "APPROVE";
}

export interface SystemNoticeType {
  id: number;
  title: string;
  body: string;
  createdDateTime: string;
}

export interface SystemNoticeDetailType {
  id: number;
  title: string;
  body: string;
  imageUrls?: string[];
  createdDateTime: string;
}

export interface SystemFaqDataResponse {
  systemFaqDataList: SystemFaqData[];
}

export interface SystemNoticeListResponse {
  systemNoticeDataList: SystemNoticeType[];
}

export interface SystemNoticeDetailResponse {
  systemNoticeData: SystemNoticeDetailType;
}

export type TermType = "PRIVACY_POLICY" | "CLUB_RULES" | "PLATFORM_RULES";
export interface TermsOfServiceResponse {
  id: string;
  termType: TermType;
  body: string;
}
