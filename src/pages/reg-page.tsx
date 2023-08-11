import { useEffect } from 'react';
import { JSX } from 'react/jsx-runtime';

import { PageProps } from '../interfaces/pages.intarface.ts';

export interface IPageProps {
  showPageName?: (name: string) => void;
}

const RegPage = ({ showName }: PageProps): JSX.Element => {
  const name: string = 'Registration';

  useEffect(() => {
    showName && showName(name);
  }, [showName]);

  return <div></div>;
};

export default RegPage;
