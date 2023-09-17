import type { PreloadedState } from '@reduxjs/toolkit';
import { combineReducers, configureStore, Middleware } from '@reduxjs/toolkit';

import authReducer from './authSlice.ts';
import basketReducer from './basketSlice.ts';
import searchSlice from './searchSlice.ts';
import userProfileReducer from './userProfileSlice.ts';

const saveToLocalStorage = (state: RootState) => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem('state', serializedState);
};

const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  saveToLocalStorage(store.getState());
  return result;
};

const rootReducer = combineReducers({
  auth: authReducer,
  basket: basketReducer,
  userProfile: userProfileReducer,
  search: searchSlice,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
