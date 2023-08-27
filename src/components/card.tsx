import { useNavigate } from 'react-router-dom';

import { AUTH_ROUTE } from '../constants/pages';
import classes from '../css/ui.module.css';

export const Card = ({ title, price, url }: { title: string; price: number; url: string }) => {
  const navigate = useNavigate();
  function cardClckHandler() {
    navigate(AUTH_ROUTE);
  }
  return (
    <div className={classes.card} onClick={cardClckHandler}>
      <img className={classes.card__img} src={url} alt={title} />
      <div className="description">
        <h2 className="card__title">{title}</h2>
        <p className="card__price">{price}</p>
      </div>
    </div>
  );
};
