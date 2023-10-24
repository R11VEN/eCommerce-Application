import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import loginImg from '../assets/lock_white.svg';
import logoutImg from '../assets/logout.svg';
import { AUTH_ROUTE, REG_ROUTE } from '../constants/pages.ts';
import { RootState } from '../interfaces/state.interface.ts';
import classes from '../layout/layout.module.css';

export interface INav {
  mobileMenuActive?: boolean;
  setMobileMenuActive: (value: boolean) => void;
  menuProfileVisible?: boolean;
  showMenuProfile?: (value: boolean) => void;
}

const NavAuth = ({ setMobileMenuActive, menuProfileVisible, showMenuProfile }: INav) => {
  const auth = useSelector((state: RootState) => state.auth);

  const showClassName = ({ isActive }: { isActive: boolean }): string => {
    return isActive ? 'header-link-auth active' : 'header-link-auth';
  };

  return (
    <div className="login-registration">
      {auth.isAuth ? (
        <div
          className={'logout'}
          onClick={() => showMenuProfile && showMenuProfile(!menuProfileVisible)}
        >
          <img src={logoutImg} title="Logout" alt="Logout" />
        </div>
      ) : (
        <div className={classes['tool-icon'] + ' ' + classes['tool-green']}>
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
