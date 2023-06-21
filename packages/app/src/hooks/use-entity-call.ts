import { AxiosError } from 'axios';
import { ERROR_MESSAGE, NotificationType, useHandleRequestStatus } from 'hooks';
import { DependencyList, useCallback, useEffect, useState } from 'react';
import { useAppSelector } from 'store/hooks';
import { METHOD } from 'store/slices/entityCall';
import { addAuthHeader, api } from 'utils';

interface IEntityCall {
  entity: string;
  method: METHOD;
  params?: string;
  deps: DependencyList;
  errorMessage?: string;
  errorRecordType?: NotificationType;
}

const useEntityCall = <IRes>({
  entity,
  method,
  params,
  deps,
  errorMessage,
  errorRecordType = 'snackbar',
}: IEntityCall) => {
  const { token, tenant } = useAppSelector((store) => store.auth);
  const [response, setResponse] = useState<IRes | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const handleRequestStatus = useHandleRequestStatus(errorRecordType, 'record');

  const handleFetch = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await api(`entity/${entity}${params ? `?${params}` : ''}`, {
        method,
        headers: {
          ...addAuthHeader(token?.access_token || '', tenant),
        },
      });

      if (response.data && response.status === (200 || 201)) {
        setResponse(response.data);
        setIsSuccess(true);
      }
      setIsLoading(false);
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        const status = err.response.status;
        const message =
          errorMessage || (status === 420 && err.response.data?.Violations)
            ? err.response.data.Violations[Object.keys(err.response.data.Violations)[0]]
            : err.response.data.Message || `Error ${status}: ${ERROR_MESSAGE[status]}`;
        setIsLoading(false);
        setError(message);
        setIsError(true);
        handleRequestStatus(message, err.response.status);
      } else {
        setIsLoading(false);
        setIsError(true);
      }
    }
  }, [entity, method, params, tenant, token, errorMessage, handleRequestStatus]);

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
