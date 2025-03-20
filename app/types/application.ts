import { MemberData } from "./member";
import { PageInfo } from "./pageInfo";

export type ApplyStatusType = "PENDENCY" | "APPROVE" | "REFUSAL" | "INTERVIEW";

export interface ApplyData {
  id: string;
  name: string;
  applyStatusType: ApplyStatusType;
  createdDateTime: string;
  memberData: MemberData;
  recruitmentTitle: string;
  clubName: string;
}

export interface ApplyListRes {
  applyDataList: ApplyData[];
  pageInfo: PageInfo;
}

export interface ApplyTempData {
  id: string;
  name: string;
  createdDateTime: string;
  recruitmentTitle: string;
  clubName: string;
}

export interface ApplyTempListRes {
  applyDataList: ApplyTempData[];
  pageInfo: PageInfo;
}

export interface ApplicationListConditionReq {
  isPendent: boolean;
  query?: string;
  startDateTime?: Date;
  endDateTime?: Date;
}
