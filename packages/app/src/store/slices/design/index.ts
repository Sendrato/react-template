import { combineReducers } from '@reduxjs/toolkit';

import modalsReducer from './modalsSlice';
import snackBarReducer from './snackBar';

const designReducer = combineReducers({
  modals: modalsReducer,
  snackBar: snackBarReducer,
});

export default designReducer;
