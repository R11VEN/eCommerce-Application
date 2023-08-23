import { useEffect, useState } from 'react';
import { JSX } from 'react/jsx-runtime';
import { NavLink } from 'react-router-dom';

import LoginForm from '../components/login-form.tsx';
import Modal from '../components/Modal.tsx';
import { REG_ROUTE } from '../constants/pages.ts';
import { PageProps } from '../interfaces/page.interface.ts';

const AuthPage = ({ showName }: PageProps): JSX.Element => {
  const name: string = 'Authorization';
  const [modal, setModal] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    showName && showName(name);
  }, []);

  function handleModal(content: string) {
    setModal(true);
    setContent(content);
  }

  return (
    <div className="auth-container">
      <h1>Login</h1>
      <LoginForm openModal={handleModal}></LoginForm>
      <NavLink key="SingUp" to={REG_ROUTE} className="btn" end>
        Sing up
      </NavLink>
      <Modal visible={modal} setDisplay={setModal}>
        {content && content}
      </Modal>
    </div>
  );
};

export default AuthPage;
