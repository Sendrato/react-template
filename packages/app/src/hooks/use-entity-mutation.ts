import { METHOD, SUCCESS_MESSAGE } from '@interfaces/common/backoffice/api';
import { NotificationType } from '@interfaces/UI/notification';
import { useAuthContext } from 'contexts/AuthContext';
import { useNotificationsContext } from 'contexts/NotificationsContext';
import { useMutation, UseMutationOptions } from 'react-query';
import { addAuthHeader, api } from 'utils';

import useErrorBoundary from './use-error-boundary';

interface IEntityMutation<IData, IVariables> {
  entity: string;
  method: METHOD;
  options?: UseMutationOptions<IData, Error, IVariables>;
  successMessage?: string;
  errorMessage?: string;
  errorType?: NotificationType;
}

type EntityMutationVariables<TBody> = { body?: TBody; params?: string };

const useEntityMutation = <TData = unknown, TBody = unknown>({
  entity,
  method,
  options,
  successMessage = SUCCESS_MESSAGE[method],
  errorMessage,
  errorType,
}: IEntityMutation<TData, EntityMutationVariables<TBody>>) => {
  const { token, tenant } = useAuthContext();
  const { openAutoCloseRecord } = useNotificationsContext();

  const onMutate = (): void => {
    document.body.style.cursor = 'wait';
  };

  const onError = useErrorBoundary(errorType, errorMessage);

  const onSuccess = (): void => {
    openAutoCloseRecord({ message: successMessage });
    document.body.style.cursor = 'auto';
  };

  const handleFetch = async ({ body, params: query = '' }: EntityMutationVariables<TBody>) => {
    const { data } = await api(`${entity}${query ? `?${query}` : ''}`, {
      method,
      data: body && JSON.stringify(body),
      headers: {
        ...addAuthHeader(token?.access_token || '', tenant),
      },
    });

    return data;
  };

  const mutation = useMutation<TData, Error, EntityMutationVariables<TBody>>(
    [entity, method],
    handleFetch,
    {
      onMutate,
      onSuccess,
      onError,
      ...options,
    },
  );

  return mutation;
};

export default useEntityMutation;
