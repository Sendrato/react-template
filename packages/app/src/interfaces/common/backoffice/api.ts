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

export enum SUCCESS_MESSAGE {
  get = 'Successfully loaded',
  post = 'Successfully created',
  put = 'Successfully updated',
  delete = 'Successfully deleted',
}

export const ERROR_MESSAGE: { [key: number]: string } = {
  400: 'Bad Request - no valid input provided',
  404: 'The requested entity is not found',
  405: 'Operation not supported',
  406: 'Output not acceptable - requested output format is not available',
  409: 'Conflict - Duplicate entity found on inserts',
  412: 'Etag error - wrong etag provided on PUT or DELETE operation - resource has changed',
  420: 'Input validation exception(s)',
  500: 'Unrecoverable server error',
  602: 'Missing entity ID - the primary identifier fields of this entity are missing',
  603: 'Version Not Found - The requested entity version does not exist',
};
