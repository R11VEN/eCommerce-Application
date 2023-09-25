import { Cart, Customer } from '@commercetools/platform-sdk';

import { UserProfileState } from '../redux/reducers/userProfileSlice.ts';

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
  loading: boolean;
  isAuth: boolean;
  clientId: string;
  version: number;
  customer: Partial<Customer>;
}

export interface BasketState {
  basket?: Partial<Cart>;
}

export interface good {
  id: string;
  name: string;
}
