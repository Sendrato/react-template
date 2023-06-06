export const formatNumber = (num: string) => {
  const numAsArrStr = num.split('.');
  for (let i = numAsArrStr[0].length - 3; i >= 0; i -= 3) {
    if (i < 1) break;
    numAsArrStr[0] = numAsArrStr[0].slice(0, i) + ',' + numAsArrStr[0].slice(i);
  }

  return numAsArrStr.join('.');
};
