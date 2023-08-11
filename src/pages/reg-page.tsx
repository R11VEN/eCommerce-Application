import { useEffect } from 'react';
import { JSX } from 'react/jsx-runtime';

import { PageProps } from '../interfaces/page.interface.ts';

export interface IPageProps {
  showPageName?: (name: string) => void;
}

const RegPage = ({ showName }: PageProps): JSX.Element => {
  const name: string = 'Registration';

  useEffect(() => {
    showName && showName(name);
  }, [showName]);

  return (
    <div>
      <h1>I am Reg Page</h1>
    </div>
  );
};

export default RegPage;
