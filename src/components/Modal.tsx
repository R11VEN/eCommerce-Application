import classes from '../css/ui.module.css';
import { UIModal } from '../interfaces/ui.interface.ts';
import { ModalSlider } from './ModalSlider.tsx';

const Modal = ({
  children,
  visible,
  setDisplay,
  images = [{ dimensions: { w: 0, h: 0 }, url: '' }],
}: UIModal) => {
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
        {children === 'modalSlider' ? <ModalSlider images={images} /> : children}
      </div>
    </div>
  );
};

export default Modal;
