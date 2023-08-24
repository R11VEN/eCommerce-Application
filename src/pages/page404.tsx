import { useEffect } from 'react';
import { JSX } from 'react/jsx-runtime';
import { NavLink } from 'react-router-dom';

import { MAIN_ROUTE } from '../constants/pages.ts';
import { PageProps } from '../interfaces/page.interface.ts';

const Page404 = ({ showName }: PageProps): JSX.Element => {
  const name: string = 'Page 404';

  useEffect((): void => {
    showName && showName(name);
  }, []);

  return (
    <div className="error-page">
      <h1 className="error-heading">Error 404!</h1>
      <p className="error-parag">Sorry, page you are looking for doesn't exist</p>
      <a>
        {
          <NavLink key="mainPage" to={MAIN_ROUTE} className="btn" end>
            Back to Man Page
          </NavLink>
        }
      </a>
    </div>
  );
};

export default Page404;
