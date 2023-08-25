import { useState } from 'react';

import BreadCamps from '../components/BreadCamps.tsx';
import NavAuth from '../components/NavAuth.tsx';
import NavBar from '../components/NavBar.tsx';
import Tools from '../components/Tools.tsx';
import classes from './layout.module.css';

const Header = ({ titlePage }: { titlePage: string }) => {
  const [mobileMenuActive, setMobileMenuActive] = useState<boolean>(false);

  const showMobileMenu = () => {
    setMobileMenuActive(!mobileMenuActive);
  };

  return (
    <header className={classes['header']}>
      <div className="header-container">
        <div className="logo-container">
          <h1 className="logo">High voltage</h1>
          <div className="burger" onClick={showMobileMenu}></div>
          <NavBar mobileMenuActive={mobileMenuActive} setMobileMenuActive={setMobileMenuActive} />
        </div>
        <div className={classes['tools-container']}>
          <Tools />
          <NavAuth setMobileMenuActive={setMobileMenuActive} />
        </div>
        <BreadCamps titlePage={titlePage} />
      </div>
    </header>
  );
};
export default Header;
