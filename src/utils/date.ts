import dayjs from "dayjs";

export const dateFormat = (time) => {
  return dayjs.unix(time).format("DD MMM YYYY");
};

export const timeFormat = (time) => {
  return dayjs.unix(time).format("DD MMM YYYY HH:mm:ss");
};
