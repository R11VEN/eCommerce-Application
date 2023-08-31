import { NavLink } from 'react-router-dom';

import { PRODUCT_ROUTE } from '../constants/pages';
import classes from '../css/ui.module.css';

export const Card = ({
  uniqueKey,
  title,
  price,
  discounted,
  description,
  url,
  id,
}: {
  uniqueKey: string;
  title: string;
  price: number;
  discounted: number;
  description: string;
  url: string;
  id: string;
}) => {
  return (
    <NavLink className={classes.cardlink} to={`${PRODUCT_ROUTE}/${id}`}>
      <div className={classes.card} key={uniqueKey}>
        <img className={classes.card__img} src={url} alt={title} />
        <div className={classes.description}>
          <h2 className={classes.title}>{title}</h2>
          <div className={classes.pricecontainer}>
            <p className={`${classes.price} ${discounted && classes.discount}`}>Price:{price}</p>
            {discounted ? <p className={classes.discountprice}>Discounted:{discounted}</p> : ''}
          </div>
          <p className={classes.carddescription}>{description}</p>
        </div>
      </div>
    </NavLink>
  );
};
