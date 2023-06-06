export const getArrayOfUniqueObj = (arr: any[], uniqueKey: string): any[] => {
  return arr.reduce((acc, item) => {
    return acc.find((obj: any) => obj[uniqueKey] === item[uniqueKey])
      ? [...acc]
      : [...acc, item];
  }, []);
};

export const createArrOfZero = (length: number): number[] => {
  return Array.from({ length: length }, () => 0);
};
