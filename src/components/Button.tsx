import { ReactNode, useState } from 'react';

import classes from '../css/ui.module.css';
export const Button = ({ children }: { children: ReactNode }) => {
  const [isActive, setActivity] = useState(false);
  const handleClick = () => {
    setActivity((activity) => !activity);
  };
  return (
    <a className={`${classes.button}${isActive ? classes.active : ''}`} onClick={handleClick}>
      {children}
    </a>
  );
};
