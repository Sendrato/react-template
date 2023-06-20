import { combineReducers } from '@reduxjs/toolkit';

import sellersReducer from './sellersSlice';

export const onboardingReducer = combineReducers({
  sellers: sellersReducer,
});
