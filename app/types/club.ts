import { ClubMemberData, MemberData } from "./member";
import { PageInfo } from "./pageInfo";

export type ClubAffiliationType = "EXTERNAL" | "INTERNAL";
export type ClubFieldType =
  | "CULTURE"
  | "VOLUNTEER"
  | "STUDY"
  | "STARTUP"
  | "EMPLOYMENT"
  | "SPORTS"
  | "AMITY"
  | "ETC";
export type ClubRegionType =
  | "SEOUL_GYEONGGI"
  | "CHUNGCHEONG"
  | "GYEONGNAM"
  | "GYEONGBUK"
  | "JEONNAM"
  | "JEONBUK"
  | "GANGWON"
  | "JEJU"
  | "FOREIGN";
export type ParticipantType =
  | "UNIVERSITY_STUDENT"
  | "GRADUATE_STUDENT"
  | "OFFICE_WORKER";

export interface SchoolData {
  name: string;
}

export interface ClubData {
  id: string;
  name: string;
  profileUri: string;
  body: string;
  bannerUri: string;
  clubCategoryType: ClubFieldType;
  clubRegionType: ClubRegionType;
  participantType: ParticipantType;
  isMyBookmark: boolean;
  schoolData: SchoolData;
}
export type TokenType =
  | "C_TOKEN_1"
  | "C_TOKEN_2"
  | "C_TOKEN_3"
  | "C_TOKEN_4"
  | "C_PRIMARY"
  | "C_SUB2"
  | "C_TOKEN_6"
  | "C_TOKEN_7";

export interface ClubFaqData {
  id: string;
  title: string;
  body: string;
  clubFaqClassification: string;
  clubFaqColorType: TokenType;

  clubMemberData: ClubMemberData;
}

export interface ClubFaqListRes {
  clubFaqDataList: ClubFaqData[];
  pageInfo: PageInfo;
}

export interface ClubAnswerData {
  body: string;
  clubMemberData: ClubMemberData;
}

export interface ClubQuestionData {
  id: string;
  title: string;
  body: string;
  createdDateTime?: Date;
  memberData: MemberData;
  clubAnswerData: ClubAnswerData | null;
}

export interface ClubQnaListRes {
  clubQuestionDataList: ClubQuestionData[];
  pageInfo: PageInfo;
}

export interface MembershipBalance {
  id: string;
  amount: number; // 입금(양수) 또는 출금(음수)
  recordDateTime: string;
  createdDateTime: string;
  body: string;
  balance: number; // 현재 잔액
}

export interface MembershipBalanceRes {
  financialRecordDataList: MembershipBalance[];
  pageInfo: PageInfo;
}

export interface ClubActivity {
  clubActivityId: string;
  clubId: string;
  clubMember: ClubMemberData;
  accessType: "ALL" | "CLUB_MEMBER";
  body: string;
  createdDateTime: string;
  // deletedDateTime?: string | null;
  images: string[];
  likes: number;
  myLike: boolean;
  isMine: boolean;
  commentCount: number;
  comments: ClubActivityComment[];
}

export interface ClubActivityComment {
  clubActivityCommentId: string;
  clubMember: ClubMemberData;
  clubActivityId: string;
  body: string;
  createdDateTime: string;
  likes: number;
  myLike: boolean;
  isMine: boolean;
  comments: ClubActivityComment[];
}

export interface ClubDetailRes {
  clubData: ClubData;
  clubMemberData: ClubMemberData;
}

export interface MyClubData {
  id: string;
  name: string;
  profileUri: string;
  clubNoticeCreatedDt: string | null;
  clubActivityCreatedDt: string | null;
}

export interface MyClubListRes {
  myClubDataList: MyClubData[];
}

export interface ClubNoticeImageData {
  id: string;
  imageUri: string;
}

export interface ClubNoticeData {
  id: string;
  title: string;
  body: string;
  isFixed: true;
  createdDateTime: string;
  clubNoticeImageData: ClubNoticeImageData;
}

export interface ClubNoticeDataRes {
  clubNoticeDataList: ClubNoticeData[];
  pageInfo: PageInfo;
}

export interface ClubNoticeDetail {
  clubNoticeData: ClubNoticeData;
  clubMemberData: Omit<ClubMemberData, "profileType">;
  clubNoticeImageDataList: ClubNoticeImageData[];
}
