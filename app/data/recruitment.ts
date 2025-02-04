import { RecruitmentData } from "@/types/recruitment";
import noimage from "@/images/test/test.svg";
import {
  ClubInfoCard,
} from "@/types/components/card";

export const RECRUITMENT_DATA: RecruitmentData[] = [
  {
    id: 1,
    title: "프로그래밍 동아리 신입 모집",
    body: "코딩에 관심 있는 열정적인 신입 회원을 모집합니다!",
    posterUri: noimage,
    procedureType: "DOCUMENT",
    limits: 10,
    createdDateTime: "2025-01-01T10:00:00Z",
    startDateTime: "2025-02-01T09:00:00Z",
    endDateTime: "2025-02-10T18:00:00Z",
    isActivated: true,
    isMyBookmark: false,
  },
  {
    id: 2,
    title: "사진 동아리 신입 모집 사진 동아리 신입 모집 사진 동아리 신입 모집",
    body: "사진 촬영 및 편집에 관심 있는 분들을 환영합니다!",
    posterUri: noimage,
    procedureType: "DOCUMENT",
    limits: 5,
    createdDateTime: "2025-01-02T11:00:00Z",
    startDateTime: "2025-02-05T09:00:00Z",
    endDateTime: "2025-02-15T18:00:00Z",
    isActivated: true,
    isMyBookmark: true,
  },
  {
    id: 3,
    title: "연극 동아리 신입 모집",
    body: "연기에 열정 있는 분들을 위한 동아리입니다. 함께 무대를 만들어보아요!",
    posterUri: noimage,
    procedureType: "INTERVIEW",
    limits: 8,
    createdDateTime: "2025-01-03T12:00:00Z",
    startDateTime: "2025-02-10T09:00:00Z",
    endDateTime: "2025-02-20T18:00:00Z",
    isActivated: true,
    isMyBookmark: false,
  },
  {
    id: 4,
    title: "봉사 동아리 신입 모집",
    body: "봉사를 통해 따뜻한 마음을 나누고 싶으신 분들을 모집합니다.",
    posterUri: noimage,
    procedureType: "DOCUMENT",
    limits: 20,
    createdDateTime: "2025-01-05T13:00:00Z",
    startDateTime: "2025-02-15T09:00:00Z",
    endDateTime: "2025-02-25T18:00:00Z",
    isActivated: true,
    isMyBookmark: false,
  },
  {
    id: 5,
    title: "댄스 동아리 신입 모집",
    body: "춤을 사랑하고 열정을 가진 분들을 모집합니다. 장르는 자유!",
    posterUri: noimage,
    procedureType: "INTERVIEW",
    limits: 15,
    createdDateTime: "2025-01-06T14:00:00Z",
    startDateTime: "2025-02-20T09:00:00Z",
    endDateTime: "2025-03-01T18:00:00Z",
    isActivated: true,
    isMyBookmark: true,
  },
  {
    id: 6,
    title: "음악 동아리 신입 모집",
    body: "보컬, 악기 연주 등 음악을 사랑하는 분들을 모집합니다.",
    posterUri: noimage,
    procedureType: "DOCUMENT",
    limits: 12,
    createdDateTime: "2025-01-07T15:00:00Z",
    startDateTime: "2025-02-25T09:00:00Z",
    endDateTime: "2025-03-05T18:00:00Z",
    isActivated: true,
    isMyBookmark: false,
  },
  {
    id: 7,
    title: "영화 동아리 신입 모집",
    body: "영화를 보고 토론하며 작품을 만드는 재미를 느껴보세요!",
    posterUri: noimage,
    procedureType: "INTERVIEW",
    limits: 10,
    createdDateTime: "2025-01-08T16:00:00Z",
    startDateTime: "2025-03-01T09:00:00Z",
    endDateTime: "2025-03-10T18:00:00Z",
    isActivated: true,
    isMyBookmark: false,
  },
  {
    id: 8,
    title: "프로그래밍 동아리 신입 모집",
    body: "코딩에 관심 있는 열정적인 신입 회원을 모집합니다!",
    posterUri: noimage,
    procedureType: "DOCUMENT",
    limits: 10,
    createdDateTime: "2025-01-01T10:00:00Z",
    startDateTime: "2025-02-01T09:00:00Z",
    endDateTime: "2025-02-10T18:00:00Z",
    isActivated: true,
    isMyBookmark: false,
  },
  {
    id: 9,
    title: "사진 동아리 신입 모집",
    body: "사진 촬영 및 편집에 관심 있는 분들을 환영합니다!",
    posterUri: noimage,
    procedureType: "DOCUMENT",
    limits: 5,
    createdDateTime: "2025-01-02T11:00:00Z",
    startDateTime: "2025-02-05T09:00:00Z",
    endDateTime: "2025-02-15T18:00:00Z",
    isActivated: true,
    isMyBookmark: true,
  },
  {
    id: 10,
    title: "연극 동아리 신입 모집",
    body: "연기에 열정 있는 분들을 위한 동아리입니다. 함께 무대를 만들어보아요!",
    posterUri: noimage,
    procedureType: "INTERVIEW",
    limits: 8,
    createdDateTime: "2025-01-03T12:00:00Z",
    startDateTime: "2025-02-10T09:00:00Z",
    endDateTime: "2025-02-20T18:00:00Z",
    isActivated: true,
    isMyBookmark: false,
  },
  {
    id: 11,
    title: "봉사 동아리 신입 모집",
    body: "봉사를 통해 따뜻한 마음을 나누고 싶으신 분들을 모집합니다.",
    posterUri: noimage,
    procedureType: "DOCUMENT",
    limits: 20,
    createdDateTime: "2025-01-05T13:00:00Z",
    startDateTime: "2025-02-15T09:00:00Z",
    endDateTime: "2025-02-25T18:00:00Z",
    isActivated: true,
    isMyBookmark: false,
  },
  {
    id: 12,
    title: "댄스 동아리 신입 모집",
    body: "춤을 사랑하고 열정을 가진 분들을 모집합니다. 장르는 자유!",
    posterUri: noimage,
    procedureType: "INTERVIEW",
    limits: 15,
    createdDateTime: "2025-01-06T14:00:00Z",
    startDateTime: "2025-02-20T09:00:00Z",
    endDateTime: "2025-03-01T18:00:00Z",
    isActivated: true,
    isMyBookmark: true,
  },
  {
    id: 13,
    title: "음악 동아리 신입 모집",
    body: "보컬, 악기 연주 등 음악을 사랑하는 분들을 모집합니다.",
    posterUri: noimage,
    procedureType: "DOCUMENT",
    limits: 12,
    createdDateTime: "2025-01-07T15:00:00Z",
    startDateTime: "2025-02-25T09:00:00Z",
    endDateTime: "2025-03-05T18:00:00Z",
    isActivated: true,
    isMyBookmark: false,
  },
  {
    id: 14,
    title: "영화 동아리 신입 모집",
    body: "영화를 보고 토론하며 작품을 만드는 재미를 느껴보세요!",
    posterUri: noimage,
    procedureType: "INTERVIEW",
    limits: 10,
    createdDateTime: "2025-01-08T16:00:00Z",
    startDateTime: "2025-03-01T09:00:00Z",
    endDateTime: "2025-03-10T18:00:00Z",
    isActivated: true,
    isMyBookmark: false,
  },
];

export const MAIN_RECRUITMENT_CARD_DATA: ClubInfoCard = {
  id: 673127617679043209,
  startDate: "2025.03.01",
  endDate: "2025.03.31",
  clubName: "코딩 동아리",
  clubImageUrl: noimage,
  title: "2025년 봄 신입 동아리 모집",
  imageUrl: noimage,
  limits: 50,
  tag: {
    affiliation: "세종대학교",
    field: "STUDY",
    region: "SEOUL_GYEONGGI",
    target: "UNIVERSITY_STUDENT",
  },
  isMyRecruitmentScrap: false,
  procedureType: "DOCUMENT",
  recruitmentBookmarks: 12,
  isMyClub: true,
  isMyApply: false,
  isMyClubBookmark: true,
};
