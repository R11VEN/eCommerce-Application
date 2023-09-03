export interface UIModal {
  children: string;
  visible: boolean;
  setDisplay: (display: boolean) => void;
  images?: string[];
}
