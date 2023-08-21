import classes from '../css/ui.module.css';
import { UIModal } from '../interfaces/ui.interface.ts';

const Modal = ({ children, visible, setDisplay }: UIModal) => {
  const rootClasses = [classes.modal];

  if (visible) {
    rootClasses.push(classes.active);
  }

  return (
    <div className={rootClasses.join(' ')} onClick={() => setDisplay(false)}>
      <div className={classes.close} onClick={() => setDisplay(false)}>
        X
      </div>
      <div className={classes.modalContent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
