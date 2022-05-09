import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
dayjs.extend(timezone);

export const dateFormat = (time, tzCode) => {
  const format = "DD MMM YYYY";
  return dayjs.unix(time).tz(tzCode).format(format);
};

export const timeFormat = (time, tzCode) => {
  const format = "DD MMM YYYY HH:mm:ss";
  return dayjs.unix(time).tz(tzCode).format(format);
};
