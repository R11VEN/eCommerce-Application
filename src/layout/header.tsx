import { NavLink } from 'react-router-dom';

import { RouteInterface } from '../interfaces/route.interface.ts';
import { routesAuth, routesPages } from '../routes.tsx';

const Header = ({ titlePage }: { titlePage: string }) => {
  const showClassName = ({ isActive }: { isActive: boolean }): string => {
    return isActive ? 'header-link active' : 'header-link';
  };

  return (
    <div className="header">
      Header:{titlePage}
      {routesPages.map((route: RouteInterface) => (
        <NavLink key={route.name} to={route.path} className={showClassName} end>
          {route.name}
        </NavLink>
      ))}
      {routesAuth.map((route: RouteInterface) => (
        <NavLink key={route.name} to={route.path} className={showClassName} end>
          {route.name}
        </NavLink>
      ))}
    </div>
  );
};
export default Header;
