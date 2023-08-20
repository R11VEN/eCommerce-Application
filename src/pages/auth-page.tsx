import { useEffect } from 'react';
import { JSX } from 'react/jsx-runtime';

import LoginForm from '../components/login-form.tsx';
import { PageProps } from '../interfaces/page.interface.ts';

const AuthPage = ({ showName }: PageProps): JSX.Element => {
  const name: string = 'Authorization';

  useEffect(() => {
    showName && showName(name);
  }, [showName]);

  return (
    <div className="auth-container">
      <h1>Login</h1>
      <LoginForm></LoginForm>
    </div>
  );
};

export default AuthPage;
