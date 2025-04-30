// 이용수칙 콘텐츠 정의
export const AGREEMENTS_CONTENTS = {
  privacy: {
    title: "개인정보 이용수칙",
    content: "여기에 개인정보 이용수칙 상세 내용이 들어갑니다.",
  },
  rules: {
    title: "아리아리 이용수칙",
    content: "여기에 아리아리 이용수칙 상세 내용이 들어갑니다.",
  },
  club: {
    title: "Ariari 동아리 운영원칙",
    content: "여기에 동아리 운영원칙 상세 내용이 들어갑니다.",
  },
} as const;

export type ModalKey = keyof typeof AGREEMENTS_CONTENTS;
