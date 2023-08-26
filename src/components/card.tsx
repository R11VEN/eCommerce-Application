import { Link, NavLink, useNavigate } from 'react-router-dom';

import { PRODUCT_ROUTE } from '../constants/pages';
import { DetailedProductPage } from '../pages/detailedProductPage';
import classes from './css/ui.module.css';

export const Card = ({ title, price, id }: { title: string; price: number; id: number }) => {
  return (
    <NavLink to={`${PRODUCT_ROUTE}/${id}`}>
      <div className={classes.card}>
        <img className={classes.card__img} src="" alt="" />
        <div className="description">
          <h2 className="card__title">{title}</h2>
          <p className="card__price">{price}</p>
        </div>
      </div>
    </NavLink>
  );
};