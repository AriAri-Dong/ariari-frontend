function formatDateToDot(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}. ${month}. ${day}`;
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
