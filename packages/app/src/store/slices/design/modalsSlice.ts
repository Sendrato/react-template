import { recordType } from '@interfaces/UI/alert';
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store';

import { AlertType } from '@components/styled-mui';

export const openAutoCloseRecord = createAsyncThunk<
  void,
  { message: string; timeout?: number; type?: recordType }
>('modal/openAutoCloseRecord', async ({ message, timeout = 3000, type = 'success' }, thunkAPI) => {
  thunkAPI.dispatch(setAddedRecord({ message, open: true, type: type }));

  setTimeout(() => {
    thunkAPI.dispatch(setAddedRecord({ message: null, open: false, type: 'success' }));
  }, timeout);
});

type InitialStateType = {
  addedRecord: {
    message: string | null;
    open: boolean;
    type: AlertType;
  };
};
const initialState = {
  addedRecord: {
    message: null,
    open: false,
    type: 'success',
  },
} as InitialStateType;

export const getModalsStore = createSelector(
  (state: RootState) => state.design.modals,
  (substate: InitialStateType) => substate,
);

export const getAddedRecord = createSelector(
  getModalsStore,
  (substate: InitialStateType) => substate.addedRecord,
);

export const modalsSlice = createSlice({
  name: 'modalsSlice',
  initialState,
  reducers: {
    setAddedRecord(state, action) {
      state.addedRecord = action.payload;
    },
  },
});

export const { setAddedRecord } = modalsSlice.actions;

export default modalsSlice.reducer;
