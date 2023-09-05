import { useState } from 'react';

import BreadCamps from '../components/BreadCamps.tsx';
import HeaderSearch from '../components/HeaderSearch.tsx';
import HeaderTools from '../components/HeaderTools.tsx';
import MenuProfile from '../components/MenuProfile.tsx';
import NavAuth from '../components/NavAuth.tsx';
import NavBar from '../components/NavBar.tsx';
import classes from './layout.module.css';

const Header = ({ titlePage }: { titlePage: string }) => {
  const [mobileMenuActive, setMobileMenuActive] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  const showMobileMenu = () => {
    setMobileMenuActive(!mobileMenuActive);
  };

  return (
    <header className={classes['header']}>
      <div className={classes['header-container']}>
        <div className={classes['logo-container']}>
          <h1 className={classes['logo']}>High voltage</h1>
          <div className={classes['burger']} onClick={showMobileMenu}></div>
          <div className={classes['nav-container']}>
            <NavBar mobileMenuActive={mobileMenuActive} setMobileMenuActive={setMobileMenuActive} />
          </div>
        </div>
        <div className={classes['tools-container']}>
          <HeaderTools />
          <NavAuth
            setMobileMenuActive={setMobileMenuActive}
            menuProfileVisible={visible}
            showMenuProfile={setVisible}
          />
        </div>
        <MenuProfile visible={visible} onVisible={setVisible} />
      </div>
      <HeaderSearch />
      <BreadCamps titlePage={titlePage} />
    </header>
  );
};
export default Header;
