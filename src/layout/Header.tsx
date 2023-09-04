import { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BreadCamps from '../components/BreadCamps.tsx';
import MenuProfile from '../components/MenuProfile.tsx';
import NavAuth from '../components/NavAuth.tsx';
import NavBar from '../components/NavBar.tsx';
import Tools from '../components/Tools.tsx';
import { RootState } from '../interfaces/state.interface.ts';
import { setSearchValue } from '../redux/searchSlice.ts';
import classes from './layout.module.css';

const Header = ({ titlePage }: { titlePage: string }) => {
  const [mobileMenuActive, setMobileMenuActive] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const searchState = useSelector((state: RootState) => state.search);
  const dispatch = useDispatch();
  const url = window.location.href.split('/').at(-1);

  const showMobileMenu = () => {
    setMobileMenuActive(!mobileMenuActive);
  };

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setSearchValue({ value }));
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
          <NavAuth
            setMobileMenuActive={setMobileMenuActive}
            menuProfileVisible={visible}
            showMenuProfile={setVisible}
          />
        </div>
        <MenuProfile visible={visible} onVisible={setVisible} />
      </div>
      <div className="search-container">
        {url === 'cat' && (
          <input
            className={searchState.visible ? 'search-input active' : 'search-input'}
            onInput={searchHandler}
          />
        )}
      </div>

      <BreadCamps titlePage={titlePage} />
    </header>
  );
};
export default Header;
