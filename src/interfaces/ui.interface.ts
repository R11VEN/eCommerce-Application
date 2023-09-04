import { JSX } from 'react/jsx-runtime';

export interface UIModal {
  children: string | JSX.Element;
  visible: boolean;
  setDisplay: (display: boolean) => void;
}
