import { createSelector, createSlice } from '@reduxjs/toolkit';
import { IRoute } from 'routes/routes';
import { RootState } from 'store';

type InitialStateType = {
  history: IRoute[];
};
const initialState = {
  history: [],
} as InitialStateType;

export const getHistory = createSelector(
  (state: RootState) => state.history,
  (substate: InitialStateType) => substate.history,
);

export const historySlice = createSlice({
  name: 'historySlice',
  initialState,
  reducers: {
    updateHistory(state, action) {
      if (
        (state.history[0] &&
          action.payload.pathname !== state.history[0].pathname) ||
        !state.history[0]
      ) {
        const data = [action.payload, ...state.history].slice(0, 3);
        state.history = data;
        localStorage.setItem('historyRoutes', JSON.stringify(data));
      }
    },
    setHistory(state, action) {
      state.history = action.payload;
    },
  },
});

export const { updateHistory, setHistory } = historySlice.actions;

export default historySlice.reducer;
