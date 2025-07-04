export const ACCEPTANCE_REVIEWS = [
  {
    id: 0,
    title: "2025년 봄학기 동아리 모집",
    date: "2025.12.31",
  },
  {
    id: 1,
    title: "가을학기 동아리 모집 후기",
    date: "2025.10.15",
  },
  {
    id: 2,
    title: "여름방학 동아리 모집 후기",
    date: "2025.07.20",
  },
  {
    id: 3,
    title: "겨울학기 동아리 모집 안내",
    date: "2025.02.20",
  },
  {
    id: 4,
    title: "겨울학기 동아리 모집 공고",
    date: "2025.03.04",
  },
];

export const ACTIVITY_REVIEWS = [
  {
    id: 0,
    title: "아리아리 활동 후기",
    date: "2025.12.31",
    username: "아리아리",
    detail: "아리아리 활동 후기 상세 내용",
    badgeType: ["CAREER_PREPARATION", "NETWORKING", "INTEREST_EXPLORATION"],
  },
  {
    id: 1,
    title: "완전 최악임 들어오지 마셈..",
    date: "2025.01.15",
    username: "떵개에요",
    detail: "진차 완전 별로 진짜 최악 웩 웩에ㅔ에게ㅔㄱㄱ",
    badgeType: ["CAREER_PREPARATION", "NETWORKING", "INTEREST_EXPLORATION"],
  },
  {
    id: 2,
    title: "활동 후기를 적어볼까나",
    date: "2025.07.20",
    username: "수여니",
    detail: "룰루랄라룰라랄",
    badgeType: [
      "ACADEMIC_IMPROVEMENT",
      "INTEREST_EXPLORATION",
      "CAREER_PREPARATION",
    ],
  },
  {
    id: 3,
    title: "아리아리 짱 좋아요",
    date: "2025.02.20",
    username: "백설공주",
    detail:
      "아리아리 활동 후기 상세 내용 아리아리 활동 후기 상세 내용아리아리 활동 후기 상세 내용아리아리 활동 후기 상세 내용아리아리 활동 후기 상세 내용아리아리 활동 후기 상세 내용아리아리 활동 후기 상세 내용아리아리 활동 후기 상세 내용아리아리 활동 후기 상세 내용아리아리 활동 후기 상세 내용아리아리 활동 후기 상세 내용아리아리 활동 후기 상세 내용아리아리 활동 후기 상세 내용아리아리 활동 후기 상세 내용아리아리 활동 후기 상세 내용아리아리 활동 후기 상세 내용아리아리 활동 후기 상세 내용아리아리 활동 후기 상세 내용아리아리 활동 후기 상세 내용아리아리 활동 후기 상세 내용아리아리 활동 후기 상세 내용",
    badgeType: [
      "CAREER_PREPARATION",
      "NETWORKING",
      "ACADEMIC_IMPROVEMENT",
      "HEALTH_ENHANCEMENT",
      "DIVERSE_EXPERIENCE",
    ],
  },
  {
    id: 4,
    title: "프로그래밍 동아리 찾는다면 여기 강추",
    date: "2025.03.04",
    username: "생생정보통 ",
    detail: "아리아리 활동 후기 상세 내용",
    badgeType: [
      "CAREER_PREPARATION",
      "expNETWORKINGrience",
      "ACADEMIC_IMPROVEMENT",
    ],
  },
];

export const RECRUITMENT_CARDS = [
  {
    id: 0,
    title: "2025년 봄학기 동아리 모집",
    date: "2025.12.31",
    status: "모집마감",
  },
  {
    id: 1,
    title: "가을학기 동아리 모집 공고",
    date: "2024.10.15",
    status: "모집마감",
  },
  {
    id: 2,
    title: "여름방학 동아리 모집 안내",
    date: "2025.07.20",
    status: "모집마감",
  },
  {
    id: 3,
    title: "겨울학기 동아리 모집 안내",
    date: "2025.02.20",
    status: "모집중",
  },
  {
    id: 4,
    title: "겨울학기 동아리 모집 공고",
    date: "2025.03.04",
    status: "모집중",
  },
];

export const CATEGORY = [
  { id: 0, label: "동아리 소속", type: "affiliation", value: "대학 동아리" },
  { id: 1, label: "활동 분야", type: "field", value: "봉사" },
  { id: 2, label: "활동 지역", type: "region", value: "서울" },
  { id: 3, label: "활동 대상", type: "target", value: "대학생" },
];

// export const MENU_DATA = [
//   { id: 0, label: "공유하기", image: share, url: "/recruitment/detail" },
//   { id: 1, label: "신고하기", image: dotMenu, url: "/club" },
//   { id: 2, label: "동아리 탈퇴하기", image: test_image, url: "/" },
// ];

export const MENU_DATA = [
  { id: 0, label: "공유하기" },
  { id: 1, label: "신고하기" },
  { id: 2, label: "동아리 탈퇴하기" },
];

export const PERCENT_DATA = [
  { type: "employment", percent: 80 },
  { type: "experience", percent: 90 },
  { type: "health", percent: 75 },
  { type: "interest", percent: 60 },
  { type: "relationship", percent: 85 },
  { type: "selfDevelopment", percent: 50 },
  { type: "skill", percent: 70 },
];

export const BADGE_ITEMS: {
  key: string;
  name: string;
  type: "radio" | "text" | "textarea" | "date";
  options?: string[];
  maxLength?: number;
  placeholder?: string;
}[] = [
  { key: "gender", name: "성별", type: "radio", options: ["남자", "여자"] },
  { key: "birthday", name: "생년월일", type: "date" },
  {
    key: "phone",
    name: "연락처",
    type: "text",
    placeholder: "연락처를 입력해 주세요.",
  },
  {
    key: "email",
    name: "이메일",
    type: "text",
    placeholder: "이메일 주소를 입력해 주세요.",
  },
  {
    key: "education",
    name: "학력",
    type: "radio",
    options: ["중학교 졸업", "고등학교 졸업", "대학교 재학", "대학교 졸업"],
  },
  {
    key: "mbti",
    name: "MBTI",
    type: "text",
    placeholder: "MBTI를 입력해주세요.",
  },
  {
    key: "occupation",
    name: "직업",
    type: "radio",
    options: [
      "학생",
      "직장인",
      "무직",
      "프리랜서",
      // "창업가",
      // "연구원",
      // "공무원",
      // "디자이너",
      // "마케터",
      // "기획자",
      // "교육자",
      // "의료인",
      // "엔지니어",
      // "군인",
      // "운동선수",
      // "크리에이터",
      // "예술인",
      // "전업주부",
      // "자영업자",
      "기타",
    ],
  },
  {
    key: "major",
    name: "전공",
    type: "text",
    maxLength: 20,
    placeholder: "주 전공학과를 입력해 주세요.",
  },
  {
    key: "skill",
    name: "특기",
    type: "text",
    maxLength: 30,
    placeholder: "특기를 입력해주세요.",
  },
  {
    key: "hobby",
    name: "취미",
    type: "text",
    maxLength: 30,
    placeholder: "취미를 입력해주세요.",
  },
  {
    key: "preferredActivityField",
    name: "희망 활동 분야",
    type: "text",
    maxLength: 30,
    placeholder: "희망 활동 분야를 입력해주세요.",
  },
  {
    key: "sns",
    name: "SNS",
    type: "text",
    maxLength: 50,
    placeholder: "SNS를 입력해주세요.",
  },
  {
    key: "referralSource",
    name: "동아리를 알게된 경로",
    type: "text",
    maxLength: 50,
    placeholder: "동아리를 알게된 경로를 입력해주세요.",
  },
  {
    key: "availablePeriod",
    name: "활동 가능 기간",
    type: "text",
    maxLength: 50,
    placeholder: "활동 가능 기간을 입력해주세요.",
  },
  {
    key: "availableTime",
    name: "참여 가능 시간대",
    type: "textarea",
    maxLength: 100,
    placeholder: "참여 가능 시간대를 입력해주세요.",
  },
  {
    key: "motivation",
    name: "지원 동기",
    type: "textarea",
    maxLength: 300,
    placeholder: "지원동기를 입력해주세요.",
  },
  {
    key: "aspiration",
    name: "포부",
    type: "textarea",
    maxLength: 300,
    placeholder: "포부를 입력해주세요.",
  },
  {
    key: "activityExperience",
    name: "활동 경력",
    type: "textarea",
    maxLength: 300,
    placeholder: "활동경력을 입력해주세요.",
  },
];

export const BADGE_TITLES = [
  "성별",
  "생년월일",
  "연락처",
  "이메일",
  "학력",
  "전공",
  "직업",
  "MBTI",
  "활동 가능 기간",
  "희망 활동 분야",
  "취미",
  "SNS",
  "지원 동기",
  "활동 경력",
  "특기",
  "포부",
  "참여 가능 시간대",
  "동아리를 알게 된 경로",
];

export const CLUB_LEFT_MENU_TABS = [
  { id: 0, type: "menu", label: "동아리 메뉴" },
  { id: 1, type: "notification", label: "동아리 알림" },
];

// 일반 사용자(동아리 소속 x)
export const CLUB_LEFT_MENU_USER = [
  {
    id: 1,
    label: "활동내역",
    icon: "activity_history",
    url: "/club/activityHistory",
  },
  {
    id: 2,
    label: "모집공고",
    icon: "recruit_announcement",
    url: "/club/recruitment",
    subUrl: [],
  },
  {
    id: 3,
    label: "FAQ / Q&A",
    icon: "help",
    url: "/club/help",
    subUrl: [],
  },
  {
    id: 4,
    label: "활동후기",
    icon: "activity_history",
    url: "/club/review/activity",
    subUrl: [],
  },
  {
    id: 5,
    label: "합격후기",
    icon: "acceptance_review",
    url: "/club/review/acceptance",
    subUrl: [],
  },
];

// 동아리 일반 회원(role- GENERAL)
export const CLUB_LEFT_MENU_MEMBER = [
  {
    id: 1,
    label: "활동내역",
    icon: "activity_history",
    url: "/club/activityHistory",
  },
  {
    id: 2,
    label: "공지사항",
    icon: "announcement",
    url: "/club/management/activity/notice",
    subUrl: [],
  },
  {
    id: 3,
    label: "일정",
    icon: "schedule",
    url: "/club/event",
    subUrl: [],
  },
  {
    id: 4,
    label: "회계내역",
    icon: "accounting",
    url: "/club/management/activity/accounting",
    subUrl: [],
  },
  {
    id: 5,
    label: "모집공고",
    icon: "recruit_announcement",
    url: "/club/recruitment",
    subUrl: [],
  },
  {
    id: 6,
    label: "활동후기",
    icon: "activity_history",
    url: "/club/review/activity",
    subUrl: [],
  },
  {
    id: 7,
    label: "합격후기",
    icon: "acceptance_review",
    url: "/club/review/acceptance",
    subUrl: [],
  },
  {
    id: 8,
    label: "FAQ / Q&A",
    icon: "help",
    url: "/club/help",
    subUrl: [],
  },
  {
    id: 9,
    label: "동아리 탈퇴 ",
    icon: "withdrawal",
    url: "/club/withdrawal",
    subUrl: [],
  },
];

// 동아리 관리자(role- ADMIN, MANAGER)
export const CLUB_LEFT_MENU_ADMIN = [
  {
    id: 1,
    label: "모집관리",
    icon: "recruit_management",
    url: "/",
    subUrl: [
      {
        id: 1,
        label: "모집공고",
        url: "/club/recruitment",
      },
      {
        id: 2,
        label: "지원서 양식 작성",
        url: "/club/management/recruitment/applicationForm",
      },
      {
        id: 3,
        label: "지원현황",
        url: "/club/management/recruitment/applicationStatus",
      },
    ],
  },
  {
    id: 2,
    label: "동아리 멤버 관리",
    icon: "members",
    url: "/club/management/members",
    subUrl: [],
  },
  {
    id: 3,
    label: "활동관리",
    icon: "activity_management",
    url: "/",
    subUrl: [
      {
        id: 1,
        label: "공지사항",
        url: "/club/management/activity/notice",
      },
      {
        id: 2,
        label: "일정",
        url: "/club/event",
      },
      {
        id: 3,
        label: "회계내역",
        url: "/club/management/activity/accounting",
      },
    ],
  },
  {
    id: 4,
    label: "활동내역",
    icon: "activity_history",
    url: "/club/activityHistory",
    subUrl: [],
  },
  {
    id: 5,
    label: "FAQ / Q&A",
    icon: "help",
    url: "/club/help",
    subUrl: [],
  },
  {
    id: 6,
    label: "활동후기",
    icon: "activity_history",
    url: "/club/review/activity",
    subUrl: [],
  },
  {
    id: 7,
    label: "합격후기",
    icon: "acceptance_review",
    url: "/club/review/acceptance",
    subUrl: [],
  },
  {
    id: 8,
    label: "동아리 탈퇴",
    icon: "withdrawal",
    url: "/club/withdrawal",
    subUrl: [],
  },
  {
    id: 9,
    label: "동아리 폐쇄",
    icon: "close_club",
    url: "/club/management/close",
    subUrl: [],
  },
];
