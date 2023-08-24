import { IMenuProfile } from '../interfaces/layout.interface.ts';
import classes from '../layout/layout.module.css';

const MenuProfile = ({ visible, onVisible }: IMenuProfile) => {
  const rootClasses = [classes['menu-profile']];

  const handlerVisible = () => {
    onVisible(false);
  };
  visible && rootClasses.push(classes.active);

  return (
    <div className={rootClasses.join(' ')} id="menu-profile">
      <div className={classes['menu-profile-close']}>
        <span onClick={handlerVisible}></span>
      </div>
      <div className={classes['menu-profile-body']}></div>
      <div className={classes.logout}>Logout</div>
    </div>
  );
};

export default MenuProfile;
