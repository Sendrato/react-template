import { AxiosError } from 'axios';
import { ERROR_MESSAGE, MESSAGE, NotificationType, useHandleRequestStatus } from 'hooks';
import { useCallback, useState } from 'react';
import { useAppSelector } from 'store/hooks';
import { METHOD } from 'store/slices/entityCall';
import { addAuthHeader, api } from 'utils';

interface IEntityMutation {
  entity: string;
  method: METHOD;
  params?: string;
  successMessage?: string;
  errorMessage?: string;
  errorRecordType?: NotificationType;
  successRecordType?: NotificationType;
}

const useEntityMutation = <IRes>({
  entity,
  method,
  params,
  successMessage,
  errorMessage,
  errorRecordType = 'snackbar',
  successRecordType = 'record',
}: IEntityMutation) => {
  const { token, tenant } = useAppSelector((store) => store.auth);
  const [response, setResponse] = useState<IRes | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const handleRequestStatus = useHandleRequestStatus(errorRecordType, successRecordType);

  const mutate = useCallback(
    async ({ body, params: query = '' }: { body?: any; params?: string }) => {
      try {
        setIsLoading(true);

        const queryParams = params ? params : query;

        const response = await api(`entity/${entity}${queryParams}`, {
          method,
          data: body,
          headers: {
            ...addAuthHeader(token?.access_token || '', tenant),
          },
        });

        if (response.data && response.status === (200 || 201)) {
          setResponse(response.data);
          setIsSuccess(true);
          handleRequestStatus(successMessage || MESSAGE[method], response.status);
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
    },
    [entity, method, params, tenant, token, errorMessage, successMessage, handleRequestStatus],
  );

  return {
    response,
    isLoading,
    isError,
    isSuccess,
    error,
    mutate,
  };
};

export default useEntityMutation;
