import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { entityCall, METHOD } from 'store/slices/entityCall';

import { EntityViolation } from '@services/types/error/EntityViolation';

import { ListSellers, SellerSearch } from '../../../../interfaces/common/backoffice/onboarding';

const baseEntity = 'onboarding';

export const getSellers = createAsyncThunk<any, string, { state: RootState }>(
  'onboarding/getSellers',
  async (params, thunkAPI) => {
    return thunkAPI.dispatch(
      entityCall({
        method: METHOD.GET,
        baseEntity,
        entity: 'ListSellers',
        params,
      }),
    );
  },
);

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
      (state, action: PayloadAction<PayloadAction<ListSellers | SellerSearch | null>>) => {
        state.data = action.payload.payload;
        state.loading = false;
      },
    );
    builder.addCase(entityCall.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(entityCall.rejected, (state, action: any) => {
      state.error = action.payload?.Message || null;
    });
  },
});

export default sellerSlice.reducer;
