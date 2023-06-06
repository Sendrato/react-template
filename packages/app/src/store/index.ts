import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/auth/authSlice';
import designReducer from './slices/design';
// import entitiesReducer from './slices/entities';
import entityCallReducer from './slices/entityCall';
import historyReducer from './slices/historySlice';

export const TEMP_ADMIN_TOKEN = '47dsfj49kgk70flacn10rjcsdo';

export const appReducer = combineReducers({
  auth: authReducer,
  // entities: entitiesReducer,
  design: designReducer,
  entityCall: entityCallReducer,
  history: historyReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'auth/logout') {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
