import { useEffect } from 'react';
import { JSX } from 'react/jsx-runtime';

import { PageProps } from '../interfaces/page.interface.ts';
import Form from '../components/Form.tsx';

const AuthPage = ({ showName }: PageProps): JSX.Element => {
  const name: string = 'Authorization';

  useEffect(() => {
    showName && showName(name);
  }, [showName]);

  return (
    <main className="auth-page">
      <div className="main-container">
        <h1>Login</h1>
        <Form></Form>
      </div>
    </main>
  );
};

export default AuthPage;
