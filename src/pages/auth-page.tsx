import { useEffect } from 'react';
import { JSX } from 'react/jsx-runtime';

import { PageProps } from '../interfaces/page.interface.ts';

const AuthPage = ({ showName }: PageProps): JSX.Element => {
  const name: string = 'Authorization';

  useEffect(() => {
    showName && showName(name);
  }, [showName]);

  return (
    <main className="auth-page">
      <div className="main-container">
        <h1>Login</h1>
        <form className="login-form">
          <label htmlFor="Email">Email</label>
          <input type="email" placeholder="Email" name="Email"></input>
          <label htmlFor="Password">Password</label>
          <input type="password" placeholder="Password" name="Password"></input>
          <input type="submit"></input>
        </form>
      </div>
    </main>
  );
};

export default AuthPage;
