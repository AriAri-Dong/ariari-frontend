import { ApplicationKeys, ApplyField } from "@/types/application";

export const APPLICATION_DISPLAY_INFO: Record<ApplicationKeys, ApplyField> = {
  gender: {
    key: "gender",
    name: "성별",
    type: "radio",
    options: ["남자", "여자"],
  },
  birthday: {
    key: "birthday",
    name: "생년월일",
    type: "text",
    maxLength: 12,
    placeholder: "생년월일을 입력해주세요",
  },
  phone: {
    key: "phone",
    name: "연락처",
    type: "text",
    placeholder: "연락처를 입력해 주세요.",
  },
  email: {
    key: "email",
    name: "이메일",
    type: "text",
    placeholder: "이메일 주소를 입력해 주세요.",
  },
  education: {
    key: "education",
    name: "학력",
    type: "radio",
    options: ["중학교 졸업", "고등학교 졸업", "대학교 재학", "대학교 졸업"],
  },
  mbti: {
    key: "mbti",
    name: "MBTI",
    type: "text",
    placeholder: "MBTI를 입력해주세요.",
  },
  occupation: {
    key: "occupation",
    name: "직업",
    type: "radio",
    options: ["학생", "직장인", "무직", "프리랜서", "기타"],
  },
  major: {
    key: "major",
    name: "전공",
    type: "text",
    maxLength: 20,
    placeholder: "주 전공학과를 입력해 주세요.",
  },
  skill: {
    key: "skill",
    name: "특기",
    type: "text",
    maxLength: 30,
    placeholder: "특기를 입력해주세요.",
  },
  hobby: {
    key: "hobby",
    name: "취미",
    type: "text",
    maxLength: 30,
    placeholder: "취미를 입력해주세요.",
  },
  preferredActivityField: {
    key: "preferredActivityField",
    name: "희망 활동 분야",
    type: "text",
    maxLength: 30,
    placeholder: "희망 활동 분야를 입력해주세요.",
  },
  sns: {
    key: "sns",
    name: "SNS",
    type: "text",
    maxLength: 50,
    placeholder: "SNS를 입력해주세요.",
  },
  referralSource: {
    key: "referralSource",
    name: "동아리를 알게된 경로",
    type: "text",
    maxLength: 50,
    placeholder: "동아리를 알게된 경로를 입력해주세요.",
  },
  availablePeriod: {
    key: "availablePeriod",
    name: "활동 가능 기간",
    type: "text",
    maxLength: 50,
    placeholder: "활동 가능 기간을 입력해주세요.",
  },
  availableTime: {
    key: "availableTime",
    name: "참여 가능 시간대",
    type: "textarea",
    maxLength: 100,
    placeholder: "참여 가능 시간대를 입력해주세요.",
  },
  motivation: {
    key: "motivation",
    name: "지원 동기",
    type: "textarea",
    maxLength: 300,
    placeholder: "지원동기를 입력해주세요.",
  },
  aspiration: {
    key: "aspiration",
    name: "포부",
    type: "textarea",
    maxLength: 300,
    placeholder: "포부를 입력해주세요.",
  },
  activityExperience: {
    key: "activityExperience",
    name: "활동 경력",
    type: "textarea",
    maxLength: 300,
    placeholder: "활동경력을 입력해주세요.",
  },
};

export const APPLICATION_FIELD_ORDER = Object.keys(
  APPLICATION_DISPLAY_INFO
) as ApplicationKeys[];
