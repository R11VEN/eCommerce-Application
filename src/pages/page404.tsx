import { useEffect } from 'react';
import { JSX } from 'react/jsx-runtime';

import { PageProps } from '../interfaces/page.interface.ts';
import { routesPages } from '../routes.tsx';
import { RouteInterface } from '../interfaces/route.interface.ts';
import { NavLink } from 'react-router-dom';

const Page404 = ({ showName }: PageProps): JSX.Element => {
  const name = 'Page 404';

  useEffect(() => {
    showName && showName(name);
  }, [showName]);

  return (
    <div className="error-page">
      <h1 className="error-heading">Error 404!</h1>
      <p className="error-parag">Sorry, page you are looking for doesn't exist</p>
      <a>
        {routesPages.map((route: RouteInterface) => (
          <NavLink key={route.name} to={route.path} className={'btn'} end>
            Back to {route.name}
          </NavLink>
        ))}
      </a>
    </div>
  );
};

export default Page404;
