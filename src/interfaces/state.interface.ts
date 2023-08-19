export interface RootState {
  auth: AuthState;
}

export type Credentials = {
  email: string;
  password: string;
};

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
