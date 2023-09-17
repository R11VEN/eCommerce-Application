import { UserProfileState } from '../redux/userProfileSlice.ts';

export interface RootState {
  auth: AuthState;
  basket: BasketState;
  userProfile: UserProfileState;
  search: SearchState;
}

export interface SearchState {
  value: string;
  visible: boolean;
}

export type Credentials = {
  email: string;
  password: string;
};

export interface AuthState {
  token: string;
  name: string;
  email: string;
  id: string;
  registerStatus: string;
  registerError: string;
  loginError: string;
  loading: boolean;
  isAuth: boolean;
  clientId: string;
  version: number;
  anonymousToken: string;
}

export interface BasketState {
  goods: good[];
  anonymousId: string;
  id: string;
}

export interface good {
  id: string;
  name: string;
}
