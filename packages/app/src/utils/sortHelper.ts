export const sortHelper = (first: any, second: any) => {
  let a;
  let b;
  const type = typeof first;

  if (type === 'string') {
    a = first?.toString().toLowerCase();
    b = second?.toString().toLowerCase();
  } else {
    a = first;
    b = second;
  }

  return a > b ? 1 : a === b ? 0 : -1;
};
