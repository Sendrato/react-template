export interface IEnhancedApiResponce {
  CurrentPage: number | null;
  FilterFields: string | null;
  PageSize: number | null;
  SortField: string | null;
  Start: number | null;
  Total: number | null;
  TotalPages: number | null;
  VisibleFields: string | null;
}
export enum METHOD {
  GET = 'get',
  POST = 'post',
  DELETE = 'delete',
  PUT = 'put',
}
