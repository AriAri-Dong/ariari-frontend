import {
  SystemFaqData,
  SystemNoticeDetailType,
  SystemNoticeType,
} from "@/types/service";

export const FAQ_DATA: SystemFaqData[] = [
  {
    id: 673012345142939000,
    title: "아리아리에서 개발한 서비스의 배포 시작 방법",
    body: "main 브렌치에 push!",
    systemFaqStatusType: "SECURITY",
  },
  {
    id: 553012345142939011,
    title: "동아리 멤버 관리 방법",
    body: "관리자 페이지에서 멤버 초대 및 권한 설정이 가능합니다.",
    systemFaqStatusType: "SECURITY",
  },
];

export const NOTICE_LIST: SystemNoticeType[] = [
  {
    id: 1,
    title: "서비스 점검 안내",
    body: "2025년 5월 1일 00:00 ~ 06:00까지 서버 점검이 예정되어 있습니다.",
    createdDateTime: "2025-04-01T10:00:00.000Z",
  },
  {
    id: 2,
    title: "신규 기능 출시",
    body: "새로운 채팅 기능이 추가되었습니다!",
    createdDateTime: "2025-04-05T14:30:00.000Z",
  },
];

export const NOTICE_DETAIL: Record<number, SystemNoticeDetailType> = {
  1: {
    id: 1,
    title: "서비스 점검 안내",
    body: "점검 중에는 서비스 이용이 불가합니다. 양해 부탁드립니다.",
    imageUrls: [],
    createdDateTime: "2025-04-01T10:00:00.000Z",
  },
  2: {
    id: 2,
    title: "신규 기능 출시",
    body: "채팅 기능을 통해 사용자 간 실시간 소통이 가능해졌습니다!",
    imageUrls: [],
    createdDateTime: "2025-04-05T14:30:00.000Z",
  },
};
