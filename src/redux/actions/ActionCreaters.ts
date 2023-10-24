import { CustomerSignInResult } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import { Dispatch } from 'redux';

import { LoginAnton } from '../../api/controllers/user.controller.ts';
import { authSuccess, endAuth, startAuth } from '../reducers/authSlice.ts';
import { savaBasket } from '../reducers/basketSlice.ts';

export const fetchUser = (email: string, password: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(startAuth());
    const { token, userData } = await LoginAnton(email, password);
    const { customer, cart: basket } = userData.body as CustomerSignInResult;
    const { id, version } = customer;
    const { clientId } = userData.body.customer.createdBy;
    dispatch(authSuccess({ id, email, token, clientId, version, customer }));
    localStorage.setItem('token', token);
    dispatch(savaBasket({ basket }));
    dispatch(endAuth());
  } catch {
    throw new Error();
  }
};
