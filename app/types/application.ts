import { MemberData } from "./member";
import { PageInfo } from "./pageInfo";

export type ApplyStatusType = "PENDENCY" | "APPROVE" | "REFUSAL" | "INTERVIEW";

interface ApplyData {
  id: string;
  name: string;
  applyStatusType: ApplyStatusType;
  createdDateTime: string;
  memberData: MemberData;
  recruitmentTitle: string;
  clubName: string;
}

interface ApplyListRes {
  applyDataList: ApplyData[];
  pageInfo: PageInfo;
}

interface ApplyTempData {
  id: string;
  name: string;
  createdDateTime: string;
  recruitmentTitle: string;
  clubName: string;
}

interface ApplyTempListRes {
  applyDataList: ApplyTempData[];
  pageInfo: PageInfo;
}
