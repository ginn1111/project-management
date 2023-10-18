export const generateOptions = (indexes: Record<string, any>) => {
  return Object.keys(indexes).map((key) => {
    return {
      value: key,
      label: indexes[key],
    };
  });
};
