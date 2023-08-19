import { NavLink } from 'react-router-dom';

import { RouteInterface } from '../interfaces/route.interface.ts';
import { routesAuth, routesPages } from '../routes.tsx';

const Header = ({ titlePage }: { titlePage: string }) => {
  const showClassName = ({ isActive }: { isActive: boolean }): string => {
    return isActive ? 'header-link active' : 'header-link';
  };

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">{titlePage}</h1>
        <input id="burger-checkbox" type="checkbox"></input>
        <label htmlFor="burger-checkbox" className="burger"></label>
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-list_item">
              {routesPages.map((route: RouteInterface) => (
                <NavLink key={route.name} to={route.path} className={showClassName} end>
                  {route.name}
                </NavLink>
              ))}
            </li>
            <li className="nav-list_item">
              <a href="#">Catalog</a>
            </li>
            <li className="nav-list_item">
              <a href="#">Reference</a>
            </li>
            <li className="nav-list_item">
              <a href="#">About Us</a>
            </li>
          </ul>
        </nav>
        <div className="login-registration">
          {routesAuth.map((route: RouteInterface) => (
            <NavLink key={route.name} to={route.path} className={showClassName} end>
              {route.name}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
};
export default Header;
