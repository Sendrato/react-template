import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { RootState } from 'store';

import { AlertType } from '@modules/common/styled-mui';

type recordType = 'success' | 'error' | 'info';

export const openAutoCloseRecord = createAsyncThunk<
  void,
  { message: string; timeout?: number; type?: recordType }
>(
  'modal/openAutoCloseRecord',
  async ({ message, timeout = 3000, type = 'success' }, thunkAPI) => {
    thunkAPI.dispatch(setAddedRecord({ message, open: true, type: type }));

    setTimeout(() => {
      thunkAPI.dispatch(
        setAddedRecord({ message: null, open: false, type: 'success' }),
      );
    }, timeout);
  },
);

type InitialStateType = {
  openCreateSeller: boolean;
  addedRecord: {
    message: string | null;
    open: boolean;
    type: AlertType;
  };
  sellerDetailsInfo: {
    message: string | null;
    open: boolean;
  };
};
const initialState = {
  openCreateSeller: false,
  addedRecord: {
    message: null,
    open: false,
    type: 'success',
  },
  sellerDetailsInfo: {
    message: null,
    open: false,
  },
} as InitialStateType;

export const getModalsStore = createSelector(
  (state: RootState) => state.design.modals,
  (substate: InitialStateType) => substate,
);

export const getIsOpenCreateSeller = createSelector(
  getModalsStore,
  (substate: InitialStateType) => substate.openCreateSeller,
);

export const getAddedRecord = createSelector(
  getModalsStore,
  (substate: InitialStateType) => substate.addedRecord,
);

export const getSellerDetailsInfo = createSelector(
  getModalsStore,
  (substate: InitialStateType) => substate.sellerDetailsInfo,
);

export const modalsSlice = createSlice({
  name: 'modalsSlice',
  initialState,
  reducers: {
    setOpenCreateSeller(state, action) {
      state.openCreateSeller = action.payload;
    },
    setAddedRecord(state, action) {
      state.addedRecord = action.payload;
    },
    setSellerDetailsInfo(state, action) {
      state.sellerDetailsInfo = action.payload;
    },
  },
});

export const { setOpenCreateSeller, setAddedRecord, setSellerDetailsInfo } =
  modalsSlice.actions;

export default modalsSlice.reducer;
