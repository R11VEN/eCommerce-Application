import { useEffect } from 'react';
import { PageProps } from '../../interfaces/pages.intarface';

const MainPage = ({ showName }: PageProps) => {
  useEffect(() => {
    showName('Main Page');
  }, []);
  return <div className="main">Main Page</div>;
};

export default MainPage;
