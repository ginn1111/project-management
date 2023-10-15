export function datetimeLocal(datetime: string) {
  if (!datetime) return;
  const dt = new Date(datetime);
  dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
  return dt.toISOString().slice(0, 16);
}

export const now = new Date();

export const getMonth = (dt: Date, add: number = 0) => {
  let month = dt.getMonth() + 1 + add;
  const str = (month < 10 ? '0' + month : month).toString();
  return str;
};
