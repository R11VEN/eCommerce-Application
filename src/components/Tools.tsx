import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import basketIcon from '../assets/basket_green.svg';
import searchIcon from '../assets/search_green.svg';
import { BASKET_ROUTE } from '../constants/pages.ts';
import { RootState } from '../interfaces/state.interface.ts';
import classes from '../layout/layout.module.css';

const Tools = () => {
  const navigate = useNavigate();
  const basket = useSelector((state: RootState) => state.basket);

  const basketClickHandler = () => {
    navigate(BASKET_ROUTE);
  };

  return (
    <div className={classes['tools']}>
      <div className={classes['tool-icon'] + ' ' + 'tool-search'}>
        <img src={searchIcon} alt="search icon" title="search icon" />
      </div>
      <div
        className={classes['tool-icon'] + ' ' + classes['tool-basket']}
        onClick={basketClickHandler}
      >
        <img src={basketIcon} alt="basket icon" title="basket icon" />
        <span className={classes['basket-count']}>{basket.goods.length}</span>
      </div>
    </div>
  );
};

export default Tools;
