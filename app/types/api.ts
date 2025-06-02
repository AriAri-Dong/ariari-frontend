import {
  ClubAffiliationType,
  ClubFieldType,
  ClubRegionType,
  ParticipantType,
} from "./club";
import { profileType } from "./member";
import { TagData } from "./review";

export type AuthResponseType = {
  accessToken: string;
  refreshToken: string;
  oauthSignUpKey: string;
};

export type SignUpWithKeyBody = {
  email: string | null;
  profileType: profileType;
  schoolAuthCode: string | null;
  nickName: string;
};

export type UserDataResponseType = {
  memberData: {
    memberId: string;
    nickname: string;
    profileType: string;
  };
  schoolData: {
    name: string;
  };
};

// 동아리 검색 조건 타입
export type ClubSearchCondition = {
  clubCategoryTypes?: string[];
  clubRegionTypes?: string[];
  participantTypes?: string[];
};

// 페이지네이션 타입
export type Pageable = {
  page: number;
  size: number;
  sort?: string[];
};

// 개별 동아리 데이터 타입
export type ClubData = {
  id: string;
  name: string;
  profileUri: string;
  body: string;
  bannerUri: string;
  clubCategoryType: ClubFieldType;
  clubRegionType: ClubRegionType;
  participantType: ParticipantType;
  isMyBookmark: boolean;
  schoolData: {
    name: string;
  };
  bookmarkCount: number;
  badgeType?: TagData;
};

// 동아리 목록 API 응답 타입
export type ClubResponse = {
  clubDataList: ClubData[];
  pageInfo: {
    contentSize: number;
    totalSize: number;
    totalPages: number;
  };
};

// 동아리 검색 결과 타입
export type ClubInfoResponse = {
  data: ClubData[];
};

// 동아리 생성 요청 타입
export type CreateClubRequest = {
  name: string;
  profileUri?: string;
  body: string;
  bannerUri?: string;
  clubCategoryType: ClubFieldType;
  clubRegionType: ClubRegionType;
  participantType: ParticipantType;
};

// 동아리 수정 요청 타입
export type UpdateClubRequest = {
  clubId: number;
  name?: string;
  profileUri?: string;
  body?: string;
  bannerUri?: string;
  clubCategoryType?: ClubFieldType;
  clubRegionType?: ClubRegionType;
  participantType?: ParticipantType;
};

export type ClubListResponse = {
  clubDataList: ClubData[];
  pageInfo: PageInfo;
};

export type ClubListData = {
  id: number;
  name: string;
  profileUri: string;
  body: string;
  bannerUri: string;
  clubCategoryType: ClubFieldType;
  clubRegionType: ClubRegionType;
  participantType: ParticipantType;
  isMyBookmark: boolean;
  schoolData: SchoolData;
  badgeType?: any;
  bookmarkCount: number;
};

export type SchoolData = {
  name: string;
};

export type PageInfo = {
  contentSize: number;
  totalSize: number;
  totalPages: number;
};

// 동아리 정보 타입 정의
export interface CreateClubData {
  name: string;
  body: string;
  affiliationType: ClubAffiliationType;
  categoryType: ClubFieldType;
  regionType: ClubRegionType;
  participantType: ParticipantType;
}

export interface CreateClubTypeData {
  affiliationType: ClubAffiliationType;
  categoryType: ClubFieldType;
  regionType: ClubRegionType;
  participantType: ParticipantType;
}

export interface IdResponse {
  id: string;
}
