import { profileType } from "./member";

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
  id?: string;
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
  creatorProfileType: profileType;
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
  profileType: profileType | null;
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
    name: api.creatorName || "(알수없음)",
    profileType: null,
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

export const mapActivityDetailFromApi = (detail: any): ClubActivity => {
  const activity = detail?.clubActivityData;
  const commentResList = detail?.clubActivityCommentResList ?? [];

  if (!activity || activity.id === undefined || activity.id === null) {
    console.warn("활동 정보가 없습니다.");
    return {} as ClubActivity;
  }

  return {
    clubActivityId: String(activity.id),
    clubMember: {
      id: String(activity.creatorId),
      name: activity.creatorName || "(알수없음)",
      profileType: activity.profileType,
      clubMemberRoleType: "GENERAL",
      clubMemberStatusType: "ACTIVE",
      memberData: null,
    },
    createdDateTime: activity.createdDateTime,
    accessType: activity.accessType,
    body: activity.body,
    images:
      activity.clubActivityImageDataList?.map((img: any) => img.imageUri) ?? [],
    likes: activity.likeCount,
    myLike: activity.myLiked,
    isMine: true,
    commentCount: activity.commentCount,
    comments: commentResList.map((res: any) => {
      const parent = res.commentData;
      const children = res.commentDataList;

      return {
        clubActivityCommentId: String(parent.id),
        clubActivityId: String(activity.id),
        body: parent.body,
        createdDateTime: parent.createdDateTime,
        likes: parent.likeCount,
        myLike: parent.myLiked,
        isMine: false,
        clubMember: {
          id: String(parent.creatorId),
          name: parent.creatorName || "(알수없음)",
          profileType: parent.creatorProfileType,
          clubMemberRoleType: "GENERAL",
          clubMemberStatusType: "ACTIVE",
          memberData: null,
        },
        comments:
          children?.map((child: any) => ({
            clubActivityCommentId: String(child.id),
            clubActivityId: String(activity.id),
            body: child.body,
            createdDateTime: child.createdDateTime,
            likes: child.likeCount,
            myLike: child.myLiked,
            isMine: false,
            clubMember: {
              id: String(child.creatorId),
              name: child.creatorName || "(알수없음)",
              profileType: parent.creatorProfileType,
              clubMemberRoleType: "GENERAL",
              clubMemberStatusType: "ACTIVE",
              memberData: null,
            },
            comments: child.comments,
          })) ?? [],
      };
    }),
  };
};
