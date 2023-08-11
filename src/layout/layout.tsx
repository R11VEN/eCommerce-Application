import { useState } from 'react';

import Router from '../components/Router.tsx';
import Footer from './footer.tsx';
import Header from './header.tsx';

const Layout = () => {
  const [title, setTitle] = useState<string>('');
  const handlePageNameChange = (name: string): void => {
    setTitle(name);
  };
  return (
    <div className="pages">
      <Header titlePage={title} />
      <Router showPageName={handlePageNameChange} />
      <Footer />
    </div>
  );
};
export default Layout;
