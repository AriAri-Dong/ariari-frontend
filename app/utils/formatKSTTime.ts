import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 *
 * @param utcISOString  ex)"2025-05-01T06:00:00Z"
 * @param format ex) "YYYY. MM. DD"
 */

export const formatKSTTime = (
  utcISOString: string,
  format = "YYYY-MM-DDTHH:mm:ss.SSSZ"
): string => {
  const kst = dayjs(utcISOString).add(9, "hour");

  return kst.format(format);
};

export const formatTime = (
  isoString: string,
  format = "YYYY-MM-DDTHH:mm:ss.SSSZ"
): string => {
  return dayjs(isoString).format(format);
};
