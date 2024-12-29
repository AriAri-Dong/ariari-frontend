/**
 * 초 단위를 받아 "MM:SS" 형식의 시간 문자열로 변환하는 formatter
 *
 * @param seconds - 변환할 총 초(second) 값
 * @returns "MM:SS" 형식으로 변환된 시간 문자열
 */
export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};
