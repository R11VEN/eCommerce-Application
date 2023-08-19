export interface RootState {
  auth: AuthState;
}

export interface AuthState {
  token: string | null;
  name: string;
  email: string;
  _id: string;
  registerStatus: string;
  registerError: string;
  loginError: string;
  loading: boolean;
}
