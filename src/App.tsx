import './App.css';

import { Cart } from '@commercetools/platform-sdk';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import { tokenInspection } from './api/controllers/user.service.ts';
import { tokenCache } from './api/tokenCache.tsx';
import Layout from './layout/Layout.tsx';
import { savaBasket } from './redux/reducers/basketSlice.ts';
import { CustomResponse, getBasket } from './utils.ts';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const cart = async () => {
      const loken = localStorage.getItem('token');
      if (loken) {
        const check = await tokenInspection(loken);
        if (check.active == false) {
          localStorage.removeItem('token');
          localStorage.removeItem('id');
          localStorage.removeItem('state');
        }
      }

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
