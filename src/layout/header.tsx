import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { userLogout } from '../api/userLogout.tsx';
import { RouteInterface } from '../interfaces/route.interface.ts';
import { RootState } from '../interfaces/state.interface.ts';
import { authLogout } from '../redux/authSlice.ts';
import { routesAuth, routesPages } from '../routes.tsx';

const Header = ({ titlePage }: { titlePage: string }) => {
  const dispatch = useDispatch();
  const [mobileMenuActive, setMobileMenuActive] = useState<boolean>(false);

  const showClassName = ({ isActive }: { isActive: boolean }): string => {
    return isActive ? 'header-link active' : 'header-link';
  };

  const showMobileMenu = () => {
    setMobileMenuActive(!mobileMenuActive);
  };

  const auth = useSelector((state: RootState) => state.auth);

  const [logout, setLogout] = useState({ backgroundColor: '#000000' });

  useEffect(() => {
    const value = auth.isAuth ? { backgroundColor: '#ffffff' } : { backgroundColor: '#000000' };
    setLogout(value);
  }, [auth.isAuth]);

  const checkLogout = () => {
    dispatch(authLogout());
    userLogout();
  };

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">{titlePage}</h1>
        <input id="burger-checkbox" type="checkbox"></input>
        <label htmlFor="burger-checkbox" className="burger" onClick={showMobileMenu}></label>
        <nav className={mobileMenuActive ? 'nav active' : 'nav'}>
          <ul className="nav-list">
            <li className="nav-list_item">
              {routesPages.map((route: RouteInterface) => (
                <NavLink
                  key={route.name}
                  to={route.path}
                  className={showClassName}
                  onClick={showMobileMenu}
                  end
                >
                  {route.name}
                </NavLink>
              ))}
            </li>
            <li className="nav-list_item">
              <a href="#" onClick={showMobileMenu}>
                Catalog
              </a>
            </li>
            <li className="nav-list_item">
              <a href="#" onClick={showMobileMenu}>
                Reference
              </a>
            </li>
            <li className="nav-list_item">
              <a href="#" onClick={showMobileMenu}>
                About Us
              </a>
            </li>
          </ul>
        </nav>
        <div className="login-registration">
          <div className="logout" style={logout} onClick={checkLogout}></div>
          {routesAuth.map((route: RouteInterface) => (
            <NavLink
              key={route.name}
              to={route.path}
              className={showClassName}
              onClick={() => setMobileMenuActive(false)}
              end
            >
              {route.name}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
};
export default Header;
