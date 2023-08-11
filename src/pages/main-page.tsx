import { useEffect } from 'react';

import { PageProps } from '../interfaces/pages.intarface.ts';

const MainPage = ({ showName }: PageProps) => {
  useEffect(() => {
    showName && showName('Main Page');
  }, []);
  return <div className="main">Main Page</div>;
};

export default MainPage;
