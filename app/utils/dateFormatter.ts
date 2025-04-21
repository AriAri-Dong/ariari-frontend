export const calculateRemainingDays = (date: string): string => {
  if (!date) return "마감";

  const today = new Date();
  const targetDate = new Date(date);

  if (isNaN(targetDate.getTime())) return "마감";

  const differenceInTime = targetDate.getTime() - today.getTime();
  const remainingDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

  return remainingDays < 0 ? "마감" : `D - ${remainingDays}`;
};

/**
 * ISO 8601 날짜 문자열을 한국 시간(KST)으로 변환하여 포맷합니다.
 * @param utcString ISO 형식의 UTC 날짜 문자열
 * @param withTime 시간 포함 여부 (기본값: true)
 * @returns 'YYYY.MM.DD' 또는 'YYYY.MM.DD HH:mm' 형식의 문자열
 */
const formatKoreanDate = (
  utcString: string,
  withTime: boolean = true
): string => {
  const date = new Date(utcString);
  const localTime = new Date(date.getTime() + 9 * 60 * 60 * 1000);

  const yyyy = localTime.getUTCFullYear();
  const mm = String(localTime.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(localTime.getUTCDate()).padStart(2, "0");
  const hh = String(localTime.getUTCHours()).padStart(2, "0");
  const min = String(localTime.getUTCMinutes()).padStart(2, "0");

  return withTime ? `${yyyy}.${mm}.${dd} ${hh}:${min}` : `${yyyy}.${mm}.${dd}`;
};

/**
 * 한국 시간 기준 날짜만 포맷 (YYYY.MM.DD)
 */
export const formatKoreanDateOnly = (utcString: string): string => {
  const utcDate = new Date(utcString);
  const koreaTime = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000);

  const yyyy = koreaTime.getFullYear();
  const mm = String(koreaTime.getMonth() + 1).padStart(2, "0");
  const dd = String(koreaTime.getDate()).padStart(2, "0");

  return `${yyyy}.${mm}.${dd}`;
};

/**
 * 한국 시간 기준 시간만 포맷 (HH:mm)
 */
export const formatKoreanTimeOnly = (utcString: string): string => {
  const utcDate = new Date(utcString);
  const koreaTime = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000);

  const hh = String(koreaTime.getHours()).padStart(2, "0");
  const mm = String(koreaTime.getMinutes()).padStart(2, "0");

  return `${hh}:${mm}`;
};

export default formatKoreanDate;
