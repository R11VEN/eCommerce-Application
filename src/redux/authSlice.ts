import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { AuthState, Credentials } from '../interfaces/state.interface.ts';

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

function Login({ email, password }: Credentials) {
  console.log(email, password);
}

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

export const authenticateUser = createAsyncThunk(
  'auth/authenticateUser',
  async (credentials: Credentials, { rejectWithValue }) => {
    try {
      await Login({
        email: credentials.email,
        password: credentials.password,
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export default authSlice.reducer;
