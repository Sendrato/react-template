import { combineReducers } from '@reduxjs/toolkit';

import { onboardingReducer } from './onboarding';

const entitiesReducer = combineReducers({
  onboarding: onboardingReducer,
});

export default entitiesReducer;
