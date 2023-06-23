import { useMutation, UseMutationOptions } from 'react-query';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { openAutoCloseRecord } from 'store/slices/design/modalsSlice';
import { METHOD } from 'store/slices/entityCall';
import { addAuthHeader, api } from 'utils';

import useErrorBoundary, { MESSAGE, NotificationType } from './use-error-boundary';

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
  successMessage = MESSAGE[method],
  errorMessage,
  errorType,
}: IEntityMutation<TData, EntityMutationVariables<TBody>>) => {
  const { token, tenant } = useAppSelector((store) => store.auth);
  const dispatch = useAppDispatch();
  const onError = useErrorBoundary(errorType, errorMessage);

  const handleFetch = async ({ body, params: query = '' }: EntityMutationVariables<TBody>) => {
    const { data } = await api(`entity/${entity}${query ? `?${query}` : ''}`, {
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
      onSuccess() {
        dispatch(openAutoCloseRecord({ type: 'success', message: successMessage }));
      },
      onError,
      ...options,
    },
  );

  return mutation;
};

export default useEntityMutation;
