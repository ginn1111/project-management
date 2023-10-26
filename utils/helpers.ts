export const IS_BROWSER = typeof window !== 'undefined';

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

export const getFromLocal = (key: string) => {
  if (IS_BROWSER) {
    try {
      return JSON.parse(localStorage.getItem(key) ?? '""');
    } catch (error) {
      console.log('error from getFromLocal', error);
      return '';
    }
  }
  return '';
};

export const setToLocal = (key: string, value: any) => {
  if (IS_BROWSER) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log('error from setToLocal', error);
    }
  }
};

export const removeFromLocal = (key: string) => {
  if (IS_BROWSER) {
    localStorage.removeItem(key);
  }
};

export const clearLocal = (callback?: () => void) => {
  if (IS_BROWSER) {
    localStorage.clear();
    callback?.();
  }
};

export const getValueFromId = <T extends { name: string; id: string }>(
  idProject: string,
  dataList: T[]
) => {
  const dfValue = dataList.find(({ id }) => id === idProject);

  return dfValue ? { label: dfValue.name, value: dfValue.id } : null;
};
