import { useEffect } from 'react';

const MainPage = ({ showName }: { showName: (name: string) => void }) => {
  useEffect(() => {
    showName('Main Page');
  }, []);
  return <div className="main">Main Page</div>;
};

export default MainPage;
