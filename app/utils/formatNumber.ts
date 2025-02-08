/**
 *
 * @param {number} num 숫자 값
 * @returns 세 자리수 마다 , 추가
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString("en-US").replace(/,/g, ",");
};
