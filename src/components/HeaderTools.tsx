import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import basketIcon from '../assets/basket_green.svg';
import searchIcon from '../assets/search_green.svg';
import { BASKET_ROUTE } from '../constants/pages.ts';
import { RootState } from '../interfaces/state.interface.ts';
import classes from '../layout/layout.module.css';
import { setVisible } from '../redux/searchSlice.ts';

const HeaderTools = () => {
  const navigate = useNavigate();
  const basket = useSelector((state: RootState) => state.basket);
  const searchState = useSelector((state: RootState) => state.search);
  const dispatch = useDispatch();

  const basketClickHandler = () => {
    navigate(BASKET_ROUTE);
  };

  const searchHandler = () => {
    const visible = searchState.visible;
    dispatch(setVisible({ visible: !visible }));
  };

  return (
    <div className={classes['tools']}>
      <div className={classes['tool-icon'] + ' ' + 'tool-search'} onClick={searchHandler}>
        <img src={searchIcon} alt="search icon" title={classes['search icon']} />
      </div>
      <div
        className={classes['tool-icon'] + ' ' + classes['tool-basket']}
        onClick={basketClickHandler}
      >
        <img src={basketIcon} alt="basket icon" title="basket icon" />
        <span className={classes['basket-count']}>
          {basket?.basket?.totalLineItemQuantity || 0}
        </span>
      </div>
    </div>
  );
};

export default HeaderTools;
