import { AsyncThunkAction } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { Selector } from 'react-redux';
import { RootState } from 'store';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import {
  getSellers,
  getSellersStore,
} from 'store/slices/entities/onboarding/sellersSlice';

interface IEntityConfig {
  [key: string]: {
    selector: Selector<RootState, Record<string, any>>;
    fetcher: (params: string) => AsyncThunkAction<unknown, unknown, any>;
  };
}

const entityConfig: IEntityConfig = {
  ['common/backoffice/onboarding/ListSellers']: {
    selector: getSellersStore,

    fetcher: (params: string) => getSellers(params),
  },
};

const useEntity = <EntityResponce>(
  entity: string,
  params: string,
): [EntityResponce | null, boolean, string | null] => {
  const entityFunctions = entityConfig[entity as keyof IEntityConfig];
  const dispatch = useAppDispatch();
  const store = useAppSelector(entityFunctions.selector);
  console.log(params);

  useEffect(() => {
    dispatch(entityFunctions.fetcher(params));
  }, [entityFunctions, dispatch, params]);

  return [store.data, store.loading, store.error];
};

export default useEntity;
