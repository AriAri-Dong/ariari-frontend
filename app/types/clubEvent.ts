import { ClubMemberData, clubMemberRoleType, MemberData } from "./member";
import { PageInfo } from "./pageInfo";

export type ClubEventData = {
  id: string;
  title: string;
  body: string;
  location: string;
  eventDateTime: string;
  clubMemberDataList: ClubMemberData[];
  attendeeCount: number;
};

export type ClubEventListRes = {
  clubEventDataList: ClubEventData[];
  pageInfo: PageInfo;
};

export interface ClubEventSaveReq {
  title: string;
  body: string;
  location: string;
  eventDateTime: string;
}
