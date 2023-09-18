import './App.css';

import { Cart, ClientResponse } from '@commercetools/platform-sdk';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import { tokenCache } from './api/tokenCache.tsx';
import CartRepository from './api/User/Cart.tsx';
import { getOptions } from './api/User/options.tsx';
import Layout from './layout/Layout.tsx';
import { savaBasket } from './redux/basketSlice.ts';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const cart = async () => {
      const opt = getOptions();
      const cartRep = new CartRepository(opt);
      const currentCart = (await cartRep.createCartForCurrentCustomer({
        currency: 'EUR',
      })) as ClientResponse<Cart>;

      dispatch(savaBasket({ basket: currentCart.body }));

      const id = localStorage.getItem('id');
      if (!id) {
        localStorage.setItem('id', `${currentCart.body.id}`);
      }

      const token = tokenCache.get().token;
      if (token) {
        localStorage.setItem('token', token);
      }

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
