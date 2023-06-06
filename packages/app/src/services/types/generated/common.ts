export interface KeyValueString {
  [k: string]: string;
}

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
