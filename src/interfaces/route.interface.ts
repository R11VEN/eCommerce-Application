import { JSX } from 'react/jsx-runtime';

export interface RouteInterface {
  name: string;
  path: string;
  Component: (props: { showPageName?: (name: string) => void }) => JSX.Element | string;
}

export interface RouterProps {
  showPageName?: (name: string) => void;
}
