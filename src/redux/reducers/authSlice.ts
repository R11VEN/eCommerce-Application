import { createSlice } from '@reduxjs/toolkit';

import { AuthState } from '../../interfaces/state.interface.ts';
const initialState: AuthState = {
  token: '',
  name: '',
  email: '',
  id: '',
  loading: false,
  isAuth: false,
  clientId: '',
  version: 0,
  customer: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    startAuth: (state) => {
      state.loading = true;
    },
    endAuth: (state) => {
      state.loading = false;
    },
    authSuccess: (state, action) => {
      state.loading = false;
      state.isAuth = true;
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.clientId = action.payload.clientId;
      state.version = action.payload.version;
      state.customer = action.payload.customer;
    },
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
    authFailure: (state) => {
      state.loading = false;
      state.token = '';
    },
    setVersion: (state, action) => {
      state.version = action.payload.version;
    },
    authLogout: (state) => {
      state.isAuth = false;
      state.id = '';
      state.email = '';
      state.token = '';
      state.clientId = '';
      state.customer = {};
    },
  },
});

export const { setToken, setVersion, startAuth, endAuth, authSuccess, authFailure, authLogout } =
  authSlice.actions;

export default authSlice.reducer;
