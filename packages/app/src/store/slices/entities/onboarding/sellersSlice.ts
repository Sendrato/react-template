import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from 'store';
import { entityCall, METHOD } from 'store/slices/entityCall';

import { EntityViolation } from '@services/types/error/EntityViolation';

import { ListSellers, SellerSearch } from './types';

interface IGetSeller {
  sortBy?: string;
  rows?: number;
  sortDirection?: 'ASC' | 'DESC';
  page: number | string;
  filter?: string;
}

const baseEntity = 'onboarding';

export const getSellers = createAsyncThunk<
  any,
  IGetSeller,
  { state: RootState }
>('onboarding/getSellers', async (data, thunkAPI) => {
  const { sortBy, page, rows, sortDirection, filter } = data;

  return thunkAPI.dispatch(
    entityCall({
      method: METHOD.GET,
      baseEntity,
      entity: 'ListSellers',
      params:
        page !== 'all'
          ? `Start=${page}&PageSize=${rows ? rows : 5}${
              sortBy?.length
                ? `&SortField=${sortBy}:${sortDirection || 'ASC'}`
                : ''
            }${filter ? `&FilterFields=${filter}` : ''}`
          : '',
    }),
  );
});

interface ISellerInitial {
  data: ListSellers | SellerSearch | null;
  loading: boolean;
  isFetch: boolean;
  autocompleteLoading: boolean;
  error: null | string;
  violation: EntityViolation | null;
  createdSellerId: null | string;
}

const initialState: ISellerInitial = {
  data: null,
  loading: false,
  isFetch: false,
  autocompleteLoading: false,
  error: null,
  violation: null,
  createdSellerId: null,
};

export const getSellersStore = createSelector(
  (state: RootState) => state.entities.onboarding.sellers,
  (substate: ISellerInitial) => substate,
);

export const getSellerList = createSelector(
  getSellersStore,
  (substate: ISellerInitial) => substate.data,
);

export const getFetching = createSelector(
  getSellersStore,
  (substate: ISellerInitial) => substate.isFetch,
);

export const sellerSlice = createSlice({
  name: 'sellers',
  initialState,
  reducers: {
    setCreatedSellerId(state, action: PayloadAction<string | null>) {
      state.createdSellerId = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      getSellers.fulfilled,
      (
        state,
        action: PayloadAction<PayloadAction<ListSellers | SellerSearch | null>>,
      ) => {
        state.data = action.payload.payload;
        state.loading = false;
      },
    );
    builder.addCase(entityCall.pending, (state) => {
      state.loading = true;
    });
  },
});

export default sellerSlice.reducer;
