import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { AuthState } from '../interfaces/state.interface.ts';

interface RegisterPayload {
  email: string;
  password: string;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  name: '',
  email: '',
  _id: '',
  registerStatus: '',
  registerError: '',
  loginError: '',
  loading: false,
};

export const registerUser = createAsyncThunk(
  'reg',
  (values: RegisterPayload, { rejectWithValue }) => {
    console.log(values);
    console.log(rejectWithValue);
  }
);
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    startAuth: (state) => {
      state.loading = true;
    },
    authSuccess: (state, action) => {
      state.loading = false;
      state.token = action.payload;
    },
    authFailure: (state) => {
      state.loading = false;
      state.token = null;
    },
  },
});

export const { startAuth, authSuccess, authFailure } = authSlice.actions;

export default authSlice.reducer;
