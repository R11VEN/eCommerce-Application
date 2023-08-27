import { NavLink } from 'react-router-dom';

import { PRODUCT_ROUTE } from '../constants/pages';
import classes from '../css/ui.module.css';

export const Card = ({ title, price, url, id }: { title: string; price: number; url: string; id: number }) => {
  return (
    <NavLink to={`${PRODUCT_ROUTE}/${id}`}>
      <div className={classes.card}>
        <img className={classes.card__img} src={url} alt={title} />
        <div className="description">
          <h2 className="card__title">{title}</h2>
          <p className="card__price">{price}</p>
      </div>
    </NavLink>
  );
};
