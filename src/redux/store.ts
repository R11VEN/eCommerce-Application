import { configureStore, Middleware } from '@reduxjs/toolkit';

import { RootState } from '../interfaces/state.interface.ts';
import authReducer from './authSlice.ts';
import basketReducer from './basketSlice.ts';
import searchSlice from './searchSlice.ts';
import userProfileReducer from './userProfileSlice.ts';

const saveToLocalStorage = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e) {
    console.warn('Could not save state', e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn('Could not load state', e);
    return undefined;
  }
};

const localStorageMiddleware: Middleware = (storeAPI) => (next) => (action) => {
  const result = next(action);
  saveToLocalStorage(storeAPI.getState());
  return result;
};

const preloadedState = loadFromLocalStorage();

const store = configureStore({
  reducer: {
    auth: authReducer,
    basket: basketReducer,
    userProfile: userProfileReducer,
    search: searchSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
  preloadedState,
});

export default store;
