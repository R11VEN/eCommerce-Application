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
    <div className="wrapper">
      <Header titlePage={title} />
      <main className="main">
        <Router showPageName={handlePageNameChange} />
      </main>
      <Footer />
    </div>
  );
};
export default Layout;
