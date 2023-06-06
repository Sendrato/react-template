export const isEntityCallError = (type: string): boolean =>
  type === 'entity/entityCall/rejected' ? true : false;
