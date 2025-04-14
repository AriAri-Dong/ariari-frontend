// 백엔드 응답 타입
export interface ClubActivityApi {
  id: number;
  creatorId: number;
  creatorName: string;
  createdDateTime: string;
  updatedDateTime: string;
  accessType: "ALL" | "CLUB_MEMBER";
  body: string;
  clubActivityImageDataList: ClubActivityImage[];
  likeCount: number;
  commentCount: number;
  myLiked: boolean;
}

export interface ClubActivityImage {
  id: number;
  imageUri: string;
}

// 프론트에서 사용하는 타입
export interface ClubActivity {
  clubActivityId: string;
  clubId?: string;
  clubMember: ClubMemberData;
  createdDateTime: string;
  accessType: "ALL" | "CLUB_MEMBER";
  body: string;
  images: string[];
  likes: number;
  myLike: boolean;
  isMine: boolean;
  commentCount: number;
  comments: ClubActivityComment[];
}

// 댓글 타입
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

// 멤버 기본 타입
export interface ClubMemberData {
  id: string;
  name: string;
  profileType: string;
  clubMemberRoleType: "ADMIN" | "MANAGER" | "GENERAL";
  clubMemberStatusType: string;
  memberData: any;
}

// 페이지 응답 타입
export interface ClubActivityResponse {
  clubActivityDataList: ClubActivityApi[];
  pageInfo: {
    contentSize: number;
    totalSize: number;
    totalPages: number;
  };
}

// API 응답 → 프론트 가공 타입으로 변환
export const mapActivityFromApi = (api: ClubActivityApi): ClubActivity => ({
  clubActivityId: String(api.id),
  clubMember: {
    id: String(api.creatorId),
    name: api.creatorName,
    profileType: "DEFAULT",
    clubMemberRoleType: "GENERAL",
    clubMemberStatusType: "ACTIVE",
    memberData: null,
  },
  createdDateTime: api.createdDateTime,
  accessType: api.accessType,
  body: api.body,
  images: api.clubActivityImageDataList.map((img) => img.imageUri),
  likes: api.likeCount,
  myLike: api.myLiked,
  isMine: false,
  commentCount: api.commentCount,
  comments: [],
});
