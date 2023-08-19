import { useEffect } from 'react';
import { JSX } from 'react/jsx-runtime';

import { PageProps } from '../interfaces/page.interface.ts';
import RegisterationForm from '../components/registration-form.tsx';

export interface IPageProps {
  showPageName?: (name: string) => void;
}

const RegPage = ({ showName }: PageProps): JSX.Element => {
  const name: string = 'Registration';

  useEffect(() => {
    showName && showName(name);
  }, [showName]);

  return (
    <main className="reg-page">
      <div className="main-container">
        <h1>Registration</h1>
        <RegisterationForm></RegisterationForm>
      </div>
    </main>
  );
};

export default RegPage;
