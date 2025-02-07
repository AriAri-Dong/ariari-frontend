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
