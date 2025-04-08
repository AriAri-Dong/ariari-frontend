// 기본값: 2025.01.01
// withSpace === false : 2025. 02. 02
// shortYear === true : 25.01.01

function formatDateToDot(
  dateString: string,
  withSpace: boolean = true,
  shortYear: boolean = false
): string {
  const date = new Date(dateString);
  const year = shortYear
    ? String(date.getFullYear()).slice(2)
    : String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const separator = withSpace ? ". " : ".";

  return `${year}${separator}${month}${separator}${day}`;
}

export default formatDateToDot;

/**
 *
 * @param date Date 형식의 날짜
 * @returns YYYY.MM.DD
 */
export const formatDate = (date: Date | null): string => {
  return date
    ? date
        .toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\.$/, "")
    : "";
};
export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};
