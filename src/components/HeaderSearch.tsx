import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import closeIcon from '../assets/close_green.svg';
import { RootState } from '../interfaces/state.interface.ts';
import classes from '../layout/layout.module.css';
import { setSearchValue, setVisible } from '../redux/searchSlice.ts';

const HeaderSearch = () => {
  const dispatch = useDispatch();
  const { visible } = useSelector((state: RootState) => state.search);

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setSearchValue({ value }));
  };

  const toggleSearch = () => {
    dispatch(setVisible({ visible: !visible }));
  };

  const searchContainerClasses = [classes['search-container']];
  visible && searchContainerClasses.push(classes.active);

  return (
    <div className={searchContainerClasses.join(' ')} key="header-search">
      <div className={classes['search-wrapper']}>
        <input className={classes['search-input']} onInput={searchHandler} />
        <div className={classes['tool-icon'] + ' ' + classes['tool-search-close']}>
          <img src={closeIcon} alt="search icon" title="close icon" onClick={toggleSearch} />
        </div>
      </div>
    </div>
  );
};

export default HeaderSearch;
