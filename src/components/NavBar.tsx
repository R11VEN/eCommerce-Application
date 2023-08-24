import { JSX } from 'react/jsx-runtime';
import { NavLink } from 'react-router-dom';

import { RouteInterface } from '../interfaces/route.interface.ts';
import { routesPages } from '../routes.tsx';
import { INav } from './NavAuth.tsx';

const NavBar = ({ mobileMenuActive, setMobileMenuActive }: INav) => {
  const showClassName = ({ isActive }: { isActive: boolean }): string => {
    return isActive ? 'header-link-auth active' : 'header-link-auth';
  };

  const createLink = (route: RouteInterface): JSX.Element => {
    return route.path === '#' ? (
      <li className="nav-list_item">
        <a href="#" className="header-link-auth" onClick={() => setMobileMenuActive(false)}>
          {route.name}
        </a>
      </li>
    ) : (
      <li className="nav-list_item">
        <NavLink
          key={route.name}
          to={route.path}
          className={showClassName}
          onClick={() => setMobileMenuActive(false)}
          end
        >
          {route.name}
        </NavLink>
      </li>
    );
  };

  return (
    <nav className={mobileMenuActive ? 'nav active' : 'nav'}>
      <ul className="nav-list">{routesPages.map(createLink)}</ul>
    </nav>
  );
};

export default NavBar;
