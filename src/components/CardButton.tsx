import { useState } from 'react';

import checked from '../assets/checked.svg';
import plus from '../assets/plus.svg';
import classes from '../css/ui.module.css';

export const CardButton = () => {
  const [isAdded, setAdding] = useState(false);
  return (
    <a className={`${classes.button} ${classes.cardBtn}`} onClick={() => setAdding(!isAdded)}>
      <img src={isAdded ? checked : plus} alt="" />
      <span>{isAdded ? 'Added' : 'Add to Cart'}</span>
    </a>
  );
};
