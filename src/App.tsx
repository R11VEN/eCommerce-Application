import './App.css';

import { Cart } from '@commercetools/platform-sdk';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import { tokenCache } from './api/tokenCache.tsx';
import Layout from './layout/Layout.tsx';
import { savaBasket } from './redux/basketSlice.ts';
import { CustomResponse, getBasket } from './utils.ts';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const cart = async () => {
      const { cartRep, currentCart }: CustomResponse<Cart> = await getBasket();

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
