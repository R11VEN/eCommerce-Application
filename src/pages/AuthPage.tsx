import { useEffect, useState } from 'react';
import { JSX } from 'react/jsx-runtime';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { CheckAuthorization } from '../api/controllers/user.controller.ts';
import LoginForm from '../components/LoginForm.tsx';
import Modal from '../components/Modal.tsx';
import { API_CLIENT_ID } from '../constants/api.ts';
import { MAIN_ROUTE } from '../constants/pages.ts';
import { PageProps } from '../interfaces/page.interface.ts';
import { RootState } from '../interfaces/state.interface.ts';

const AuthPage = ({ showName }: PageProps): JSX.Element => {
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);
  const name: string = 'Authorization';
  const [modal, setModal] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    showName && showName(name);
  }, [showName]);

  const redirect = (): void => {
    setModal(true);
    setTimeout((): void => {
      navigate(MAIN_ROUTE);
    }, 2000);
  };

  useEffect(() => {
    const checkAuth = async (): Promise<void> => {
      const token = auth.token;
      const { active, client_id } = await CheckAuthorization(token);
      if (active && client_id === API_CLIENT_ID) {
        setContent('Вы уже авторизованы');
        redirect();
      }
    };
    checkAuth();
  }, []);

  function handleModal(content: string) {
    setContent(content);
    setModal(true);
  }

  return (
    <div className="auth-container">
      <h1>Login</h1>
      <LoginForm openModal={handleModal}></LoginForm>
      <Modal visible={modal} setDisplay={setModal}>
        {content && content}
      </Modal>
    </div>
  );
};

export default AuthPage;
