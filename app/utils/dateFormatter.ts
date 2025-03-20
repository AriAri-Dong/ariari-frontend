export const calculateRemainingDays = (date: string): string => {
  const today = new Date();
  const targetDate = new Date(date);
  const differenceInTime = targetDate.getTime() - today.getTime();
  const remainingDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

  return remainingDays < 0 ? "마감" : `D - ${remainingDays}`;
};

/**
 * LocalDateTime format으로 변환(Z 제거)
 * @param {Date} date
 * @returns {string} LocalDateTime string
 */
export const formatLocalDateTime = (date: Date): string => {
  return date.toISOString().slice(0, -1);
};
