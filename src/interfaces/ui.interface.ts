import { Image } from './product.interface';
export interface UIModal {
  children: string;
  visible: boolean;
  setDisplay: (display: boolean) => void;
  images?: Image[];
}
