import { useMutation, UseMutationOptions } from 'react-query';
import { useAppSelector } from 'store/hooks';
import { METHOD } from 'store/slices/entityCall';
import { addAuthHeader, api } from 'utils';

import useErrorBoundary, { MESSAGE } from './use-error-boundary';
import useNotifications from './use-notifications';

interface IEntityMutation<IVariables> {
  entity: string;
  method: METHOD;
  options: UseMutationOptions<unknown, unknown, IVariables, unknown>;
}

type EntityMutationVariables<TBody> = { body?: TBody; params?: string };

const useEntityMutationQuery = <TBody = any>({
  entity,
  method,
  options,
}: IEntityMutation<EntityMutationVariables<TBody>>) => {
  const { token, tenant } = useAppSelector((store) => store.auth);

  const onError = useErrorBoundary();
  const throwNotifications = useNotifications('record');

  const handleFetch = async ({ body, params: query = '' }: EntityMutationVariables<TBody>) => {
    const response = await api(`entity/${entity}${query ? `?${query}` : ''}`, {
      method,
      data: body && JSON.stringify(body),
      headers: {
        ...addAuthHeader(token?.access_token || '', tenant),
      },
    });

    return response.data;
  };

  const mutation = useMutation<unknown, unknown, EntityMutationVariables<TBody>>(
    [entity, method],
    handleFetch,
    {
      onSuccess() {
        const message = MESSAGE[method];
        throwNotifications({ type: 'success', message });
      },
      onError,
      ...options,
    },
  );

  return mutation;
};

export default useEntityMutationQuery;
