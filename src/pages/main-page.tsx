import { useEffect } from 'react';
import { JSX } from 'react/jsx-runtime';

import { PageProps } from '../interfaces/pages.intarface.ts';

const MainPage = ({ showName }: PageProps): JSX.Element => {
  useEffect(() => {
    showName && showName('Main Page');
  }, []);
  return <div className="main">Main Page</div>;
};

export default MainPage;
