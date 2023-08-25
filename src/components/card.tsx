import { useNavigate } from 'react-router-dom';
import classes from '../css/ui.module.css';
import { AUTH_ROUTE } from '../constants/pages';

export const Card = ({ title, price }: { title: string; price: number }) => {
  const navigate = useNavigate();
  function cardClckHandler() {
    navigate(AUTH_ROUTE);
  }
  return (
    <div className={classes.card} onClick={cardClckHandler}>
      <img className={classes.card__img} src="" alt="" />
      <div className="description">
        <h2 className="card__title">{title}</h2>
        <p className="card__price">{price}</p>
      </div>
    </div>
  );
};
