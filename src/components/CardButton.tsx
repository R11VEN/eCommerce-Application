import { useState } from 'react';

import classes from '../css/ui.module.css';
import plus from '../assets/plus.svg';
import checked from '../assets/checked.svg';

export const CardButton = () => {
  const [isAdded, setAdding] = useState(false);
  return (
    <a className={`${classes.button} ${classes.cardBtn}`}>
      <img src={isAdded ? checked : plus} alt="" />
      <span>{isAdded ? 'Added' : 'Add to Cart'}</span>
    </a>
  );
};
