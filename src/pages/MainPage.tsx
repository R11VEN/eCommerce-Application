import { useEffect } from 'react';
import { JSX } from 'react/jsx-runtime';
import { NavLink } from 'react-router-dom';

import { PageProps } from '../interfaces/page.interface.ts';
import { RouteInterface } from '../interfaces/route.interface.ts';
import { routerPagesAndAuth } from '../routes.tsx';

const MainPage = ({ showName }: PageProps): JSX.Element => {
  const showClassName = ({ isActive }: { isActive: boolean }): string => {
    return isActive ? 'header-link active' : 'header-link';
  };

  useEffect((): void => {
    showName && showName('Main Page');
  }, []);

  const createRoute = (route: RouteInterface) => {
    return (
      <div className="main-link-container" key={`container-${route.name}`}>
        <div className="main-link-img" key={`img-${route.name}`}></div>
        <NavLink key={route.name} to={route.path} className={showClassName} end>
          {route.name}
        </NavLink>
      </div>
    );
  };

  return (
    <div className="main-container" key="main-page">
      <h1 key="h1-main-page">I am Main Page</h1>
      <h2 className="discount">20% discount with discount code: Discount20</h2>
      {routerPagesAndAuth.map(createRoute)}
    </div>
  );
};

export default MainPage;
