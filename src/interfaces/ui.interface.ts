import { JSX } from 'react/jsx-runtime';

import { Image } from './product.interface';

export interface UIModal {
  children: string | JSX.Element;
  visible: boolean;
  setDisplay: (display: boolean) => void;
  images?: Image[];
}
