import { createSlice } from '@reduxjs/toolkit';

import { AuthState } from '../interfaces/state.interface.ts';

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  name: '',
  email: '',
  _id: '',
  registerStatus: '',
  registerError: '',
  loginError: '',
  loading: false,
  isAuth: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    startAuth: (state) => {
      state.loading = true;
    },
    authSuccess: (state) => {
      state.loading = false;
      state.isAuth = true;
    },
    authFailure: (state) => {
      state.loading = false;
      state.token = null;
    },
    authLogout: (state) => {
      state.isAuth = false;
    },
  },
});

export const { startAuth, authSuccess, authFailure, authLogout } = authSlice.actions;

export default authSlice.reducer;
