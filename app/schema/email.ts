const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SCHOOL_EMAIL_DOMAINS = [
  "ac.kr",
  "edu",
  "uni.",
  "university.",
  "college.",
];

/**
 * 이메일 검증 스키마
 * @param email 입력한 이메일
 * @returns
 */
export const validateEmail = (email: string): string | null => {
  if (!email) return "이메일 주소는 필수 입력 사항입니다.";
  if (!emailRegex.test(email)) return "유효한 이메일 주소를 입력해 주세요.";
  return null;
};

/**
 * 이메일 검증 스키마 (학교 이메일 여부 포함)
 * @param email 입력한 이메일
 * @returns 오류 메시지 (없으면 null)
 */
export const validateSchoolEmail = (email: string): string | null => {
  if (!email) return "이메일 주소는 필수 입력 사항입니다.";
  if (!emailRegex.test(email)) return "유효한 이메일 주소를 입력해 주세요.";

  // 학교 이메일 검증
  const emailDomain = email.split("@")[1]?.toLowerCase();
  if (!emailDomain) return "유효한 이메일 주소를 입력해 주세요.";

  const isSchoolEmail = SCHOOL_EMAIL_DOMAINS.some((domain) =>
    emailDomain.includes(domain)
  );

  if (!isSchoolEmail) return "학교 이메일을 입력해 주세요.";

  return null;
};
