import { AxiosError } from 'axios';
import { DependencyList, useCallback, useEffect, useState } from 'react';
import { useAppSelector } from 'store/hooks';
import { METHOD } from 'store/slices/entityCall';
import { addAuthHeader, api } from 'utils';

const ERROR_MESSAGE: { [key: number]: string } = {
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

interface IEntityCall {
  entity: string;
  method: METHOD;
  params?: string;
  deps: DependencyList;
}

const useEntityCall = <IRes>({ entity, method, params, deps }: IEntityCall) => {
  const { token, tenant } = useAppSelector((store) => store.auth);
  const [response, setResponse] = useState<IRes | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const handleFetch = useCallback(async () => {
    try {
      setIsLoading(true);

      const { data } = await api(`entity/${entity}${params ? `?${params}` : ''}`, {
        method,
        headers: {
          ...addAuthHeader(token?.access_token || '', tenant),
        },
      });

      if (data) {
        setResponse(data);
        setIsSuccess(true);
      }
      setIsLoading(false);
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        const status = err.response.status;
        const message =
          status === 420 && err.response.data?.Violations
            ? err.response.data.Violations[Object.keys(err.response.data.Violations)[0]]
            : err.response.data.Message || `Error ${status}: ${ERROR_MESSAGE[status]}`;
        setIsLoading(false);
        setError(message);
        setIsError(true);
      } else {
        setIsLoading(false);
        setIsError(true);
      }
    }
  }, [entity, method, params, tenant, token]);

  useEffect(() => {
    handleFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return {
    response,
    isLoading,
    isError,
    isSuccess,
    error,
    refetch: handleFetch,
  };
};

export default useEntityCall;
