export const numberFormat = (num) => {
  return new Intl.NumberFormat("id-ID").format(num);
};
