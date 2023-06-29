import { combineReducers, configureStore } from '@reduxjs/toolkit';

import designReducer from './slices/design';

export const appReducer = combineReducers({
  design: designReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'auth/logout') {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
