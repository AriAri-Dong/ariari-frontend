export const formatRelativeTime = (dateString: string): string => {
  const now = new Date();
  const target = new Date(dateString);
  const diffMs = now.getTime() - target.getTime();

  const diffMin = Math.floor(diffMs / 1000 / 60);
  if (diffMin < 60) return `${diffMin}분 전`;

  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 60) return `${diffHour}시간 전`;

  const diffDay = Math.floor(diffHour / 24);
  if (diffDay < 365) return `${diffDay}일 전`;

  const diffYear = Math.floor(diffDay / 365);
  return `${diffYear}년 전`;
};
