import { useEffect } from 'react';
import { JSX } from 'react/jsx-runtime';

import { PageProps } from '../interfaces/page.interface.ts';

const MainPage = ({ showName }: PageProps): JSX.Element => {
  useEffect(() => {
    showName && showName('Main Page');
  }, []);
  return (
    <div className="main">
      <h1>I am Main Page</h1>
    </div>
  );
};

export default MainPage;
