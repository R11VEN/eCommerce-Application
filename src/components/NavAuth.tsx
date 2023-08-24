import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { userLogout } from '../api/userLogout.tsx';
import loginImg from '../assets/login.svg';
import logoutImg from '../assets/logout.svg';
import { AUTH_ROUTE, REG_ROUTE } from '../constants/pages.ts';
import { RootState } from '../interfaces/state.interface.ts';
import { authLogout } from '../redux/authSlice.ts';
import Modal from './Modal.tsx';

export interface INav {
  mobileMenuActive?: boolean;
  setMobileMenuActive: (value: boolean) => void;
}

const NavAuth = ({ setMobileMenuActive }: INav) => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const [isModal, setIsModal] = useState<boolean>(false);

  const showClassName = ({ isActive }: { isActive: boolean }): string => {
    return isActive ? 'header-link-auth active' : 'header-link-auth';
  };

  const checkLogout = () => {
    if (!window.confirm('Вы уверены, что хотите выйти?')) return;
    dispatch(authLogout());
    userLogout();
    setIsModal(true);
    setTimeout(() => {
      setIsModal(false);
    }, 2000);
  };

  return (
    <div className="login-registration">
      <Modal visible={isModal} setDisplay={setIsModal}>
        {'Вы вышли!'}
      </Modal>
      {auth.isAuth ? (
        <div className={'logout'} onClick={checkLogout}>
          <img src={logoutImg} title="Logout" alt="Logout" />
        </div>
      ) : (
        <div className={'signin'}>
          <NavLink
            key={AUTH_ROUTE}
            to={AUTH_ROUTE}
            className={showClassName}
            onClick={() => setMobileMenuActive(false)}
            end
          >
            <img src={loginImg} title="Sign in" alt="Sign in" />
          </NavLink>
        </div>
      )}

      <div className="signup">
        <NavLink
          key={REG_ROUTE}
          to={REG_ROUTE}
          className={showClassName}
          onClick={() => setMobileMenuActive(false)}
          end
        >
          Sign Up
        </NavLink>
      </div>
    </div>
  );
};

export default NavAuth;
