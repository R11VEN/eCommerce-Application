import { Cart, ClientResponse } from '@commercetools/platform-sdk';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import CartRepository from '../api/User/Cart.tsx';
import { getOptions } from '../api/User/options.tsx';
import { userLogout } from '../api/userLogout.tsx';
import { USER_ROUTE } from '../constants/pages.ts';
import { IMenuProfile } from '../interfaces/layout.interface.ts';
import { RootState } from '../interfaces/state.interface.ts';
import classes from '../layout/layout.module.css';
import { authLogout } from '../redux/authSlice.ts';
import { savaBasket } from '../redux/basketSlice.ts';
import Modal from './Modal.tsx';

const MenuProfile = ({ visible, onVisible }: IMenuProfile) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const rootClasses = [classes['menu-profile']];

  const hideMenu = () => {
    onVisible && onVisible(false);
  };
  visible && rootClasses.push(classes.active);
  !auth.isAuth && visible && hideMenu();

  const cart = async () => {
    const opt = getOptions();
    const cartRep = new CartRepository(opt);
    const res = (await cartRep.createCartForCurrentCustomer({
      currency: 'EUR',
    })) as ClientResponse<Cart>;
    return res.body;
  };

  const logout = async () => {
    try {
      // if (!window.confirm('Вы уверены, что хотите выйти?')) return;
      dispatch(authLogout());
      userLogout();
      const basket = await cart();
      dispatch(savaBasket({ basket }));
      setIsModal(true);
      setTimeout(() => {
        setIsModal(false);
      }, 2000);
    } catch (e) {
      /* empty */
    }
  };

  return (
    <div className={rootClasses.join(' ')} id="menu-profile">
      <Modal visible={isModal} setDisplay={setIsModal}>
        {'Вы вышли!'}
      </Modal>
      <div className={classes['menu-profile-header']}>
        <div className={classes['menu-profile-close']}>
          <span onClick={hideMenu}></span>
        </div>
      </div>
      <div className={classes['menu-profile-body']}>
        <NavLink to={USER_ROUTE} onClick={hideMenu} end>
          Профиль
        </NavLink>
      </div>
      <div className={classes.logout} onClick={logout}>
        Logout
      </div>
    </div>
  );
};

export default MenuProfile;
