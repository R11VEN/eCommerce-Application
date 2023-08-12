import { useEffect } from 'react';
import { JSX } from 'react/jsx-runtime';

import { PageProps } from '../interfaces/page.interface.ts';

const MainPage = ({ showName }: PageProps): JSX.Element => {
  useEffect(() => {
    showName && showName('High Voltage');
  }, []);
  return (
    <main className="main">
      <div className="main-container">
        <h1>I am Main Page</h1>
      </div>
    </main>
  );
};

export default MainPage;
