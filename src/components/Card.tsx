import { NavLink } from 'react-router-dom';

import { PRODUCT_ROUTE } from '../constants/pages';
import classes from '../css/ui.module.css';
import { CardButton } from './CardButton';

export const Card = ({
  title,
  price,
  discounted,
  description,
  url,
  id,
  currency,
}: {
  title: string;
  price: number;
  discounted?: number;
  description: string;
  url: string;
  id: string;
  currency: string;
}) => {
  return (
    <NavLink className={classes.cardlink} to={`${PRODUCT_ROUTE}/${id}`}>
      <div className={classes.card}>
        <img className={classes.card__img} src={url} alt={title} />
        <CardButton></CardButton>
        <div className={classes.description}>
          <h2 className={classes.title}>{title}</h2>
          <div className={classes.pricecontainer}>
            <p className={`${classes.price} ${discounted && classes.discount}`}>
              Price:
              {new Intl.NumberFormat('pl', {
                style: 'currency',
                currency: currency,
                currencySign: 'accounting',
              }).format(price)}{' '}
            </p>
            {discounted ? (
              <p className={classes.discountprice}>
                Discounted:
                {discounted &&
                  new Intl.NumberFormat('pl', {
                    style: 'currency',
                    currency: 'EUR',
                    currencySign: 'accounting',
                  }).format(+discounted)}
              </p>
            ) : (
              ''
            )}
          </div>
          <p className={classes.carddescription}>{description}</p>
        </div>
      </div>
    </NavLink>
  );
};
