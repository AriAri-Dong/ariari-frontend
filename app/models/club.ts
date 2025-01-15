import { ClubMemberData, MemberData } from "./member";
import { PageInfo } from "./page";

export interface ClubFaqData {
  id: number; // $int64
  title: string;
  body: string;
  clubFaqClassification: string;
  clubFaqColorType:
    | "C_TOKEN_1"
    | "C_TOKEN_2"
    | "C_TOKEN_3"
    | "C_TOKEN_4"
    | "C_TOKEN_5"
    | "C_TOKEN_6"
    | "C_TOKEN_7";
  clubMemberData: ClubMemberData;
}

export interface ClubFaqListRes {
  contents: ClubFaqData[];
  pageInfo: PageInfo;
}

export interface ClubAnswerData {
  body: string;
  clubMemberData: ClubMemberData;
}

export interface ClubQuestionData {
  id: number; // int64
  title: string;
  body: string;
  memberData: MemberData;
  clubAnswerData: ClubAnswerData | null;
}

export interface ClubQnaListRes {
  clubQuestionDataList: ClubQuestionData[];
  pageInfo: PageInfo;
}
