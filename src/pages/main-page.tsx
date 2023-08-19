import { useEffect } from 'react';
import { JSX } from 'react/jsx-runtime';
import { NavLink } from 'react-router-dom';

import { PageProps } from '../interfaces/page.interface.ts';

const MainPage = ({ showName }: PageProps): JSX.Element => {
  const showClassName = ({ isActive }: { isActive: boolean }): string => {
    return isActive ? 'header-link active' : 'header-link';
  };
  useEffect(() => {
    showName && showName('High Voltage');
  }, [showName]);
  return (
    <main className="main">
      <div className="main-container">
        <h1>I am Main Page</h1>
        <div className="main-link-container">
          <div className="main-link-img" />
          <NavLink key={'a'} to={'/'} className={showClassName} end>
            {'Main'}
          </NavLink>
        </div>
        <div className="main-link-container">
          <div className="main-link-img" />
          <NavLink key={'b'} to={'/auth'} className={showClassName} end>
            {'Sign in'}
          </NavLink>
        </div>
        <div className="main-link-container">
          <div className="main-link-img" />
          <NavLink key={'c'} to={'/reg'} className={showClassName} end>
            {'Sign up'}
          </NavLink>
        </div>
      </div>
    </main>
  );
};

export default MainPage;
