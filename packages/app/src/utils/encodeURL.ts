export const encodeURL = (queryString: string): string => {
  return queryString.replace(/&/gi, '%26');
};
