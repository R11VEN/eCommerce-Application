import './App.css';

import { Cart, ClientResponse } from '@commercetools/platform-sdk';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import { tokenCache } from './api/tokenCache.tsx';
import CartRepository from './api/User/Cart.tsx';
import { getOptions } from './api/User/options.tsx';
import Layout from './layout/Layout.tsx';
import { setAnonymousToken } from './redux/authSlice.ts';
import { setAnonymousId, setId } from './redux/basketSlice.ts';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const cart = async () => {
      const opt = getOptions();
      const cartRep = new CartRepository(opt);
      const currentCart = (await cartRep.createCartForCurrentCustomer({
        currency: 'EUR',
      })) as ClientResponse<Cart>;

      const token = tokenCache.get().token;
      dispatch(setAnonymousToken({ anonymousToken: token }));
      dispatch(setId({ id: `${currentCart.body.id}` }));
      dispatch(setAnonymousId({ anonymousId: `${currentCart.body.anonymousId}` }));

      return cartRep;
    };
    cart();
  }, []);

  return (
    <HashRouter>
      <Layout />
    </HashRouter>
  );
};

export default App;
