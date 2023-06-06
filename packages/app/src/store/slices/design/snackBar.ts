import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { RootState } from 'store';

export const openAutoCloseSnackBar = createAsyncThunk<
  void,
  { message: string; timeout?: number }
>(
  'snacbar/openAutoCloseSnackBar',
  async ({ message, timeout = 1500 }, thunkAPI) => {
    thunkAPI.dispatch(openSnackbar(message));

    setTimeout(() => {
      thunkAPI.dispatch(closeSnackbar());
    }, timeout);
  },
);

type initialStateType = {
  open: boolean;
  message: null | string;
};
const initialState = {
  open: false,
  message: null,
} as initialStateType;

export const getSnackBarStore = createSelector(
  (state: RootState) => state.design.snackBar,
  (substate: initialStateType) => substate,
);

export const snackBarSlice = createSlice({
  name: 'entity',
  initialState,
  reducers: {
    openSnackbar(state, action) {
      state.open = true;
      state.message = action.payload;
    },
    closeSnackbar(state) {
      state.open = false;
    },
  },
});

export const { closeSnackbar, openSnackbar } = snackBarSlice.actions;

export default snackBarSlice.reducer;
