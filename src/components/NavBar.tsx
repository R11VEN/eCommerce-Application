import { JSX } from 'react/jsx-runtime';
import { NavLink } from 'react-router-dom';

import { RouteInterface } from '../interfaces/route.interface.ts';
import classes from '../layout/layout.module.css';
import { routesPages } from '../routes.tsx';
import { INav } from './NavAuth.tsx';

const NavBar = ({ mobileMenuActive, setMobileMenuActive }: INav) => {
  const showClassName = ({ isActive }: { isActive: boolean }): string => {
    return isActive
      ? classes['header-link-auth'] + ' ' + classes['active']
      : classes['header-link-auth'];
  };

  const createLink = (route: RouteInterface): JSX.Element => {
    return route.path === '#' ? (
      <li className={classes['nav-list_item']} key={`li-${route.name}`}>
        <a
          href="#"
          className={classes['header-link-auth']}
          onClick={() => setMobileMenuActive(false)}
        >
          {route.name}
        </a>
      </li>
    ) : (
      <li className={classes['nav-list_item']} key={`li-${route.name}`}>
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

  const navClasses = [classes.nav];
  mobileMenuActive && navClasses.push(classes.active);

  return (
    <nav className={navClasses.join(' ')}>
      <ul className={classes['nav-list']}>{routesPages.map(createLink)}</ul>
    </nav>
  );
};

export default NavBar;
