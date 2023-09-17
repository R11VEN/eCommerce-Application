import { useState } from 'react';

import checked from '../assets/checked.svg';
import plus from '../assets/plus.svg';
import classes from '../css/ui.module.css';

export const CardButton = () => {
  const [isAdded, setAdding] = useState(false);
  const handleBtnClick = () => {
    !isAdded || setAdding(!isAdded);
  };

  return (
    <a
      className={`${classes.button} ${classes.cardBtn} ${isAdded && classes.button_inactive}`}
      onClick={handleBtnClick}
    >
      <img src={isAdded ? checked : plus} alt="" className="button-image" />
      <span className="button-span">{isAdded ? 'Added' : 'Add to Cart'}</span>
    </a>
  );
};
