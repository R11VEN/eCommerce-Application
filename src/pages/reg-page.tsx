import { useEffect } from 'react';
import { JSX } from 'react/jsx-runtime';

import RegisterationForm from '../components/registration-form.tsx';
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
    <div className="reg-container">
      <h1>Registration</h1>
      <RegisterationForm></RegisterationForm>
    </div>
  );
};

export default RegPage;
