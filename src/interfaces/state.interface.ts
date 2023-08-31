export interface RootState {
  auth: AuthState;
  basket: BasketState;
}

export type Credentials = {
  email: string;
  password: string;
};

export interface AuthState {
  token: string | null;
  name: string;
  email: string;
  id: string;
  registerStatus: string;
  registerError: string;
  loginError: string;
  loading: boolean;
  isAuth: boolean;
}

export interface BasketState {
  goods: good[];
}

export interface good {
  id: string;
  name: string;
}
