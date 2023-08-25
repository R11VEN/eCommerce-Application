import { useState } from 'react';

import Router from '../components/Router.tsx';
import Footer from './Footer.tsx';
import Header from './Header.tsx';
import classes from './layout.module.css';

const Layout = () => {
  const [title, setTitle] = useState<string>('');

  const handlePageNameChange = (name: string): void => {
    setTitle(name);
  };

  return (
    <div className={classes.wrapper}>
      <Header titlePage={title} />
      <main className={classes.main}>
        <Router showPageName={handlePageNameChange} />
      </main>
      <Footer />
    </div>
  );
};
export default Layout;
