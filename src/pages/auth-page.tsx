import { useEffect } from 'react';
import { JSX } from 'react/jsx-runtime';
import { NavLink } from 'react-router-dom';
import { REG_ROUTE } from '../constants/pages.ts';

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
      <NavLink key="SingUp" to={REG_ROUTE} className="btn" end>
        Sing up
      </NavLink>
    </div>
  );
};

export default AuthPage;
