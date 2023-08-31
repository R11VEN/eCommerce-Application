import { MouseEvent, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Login from '../api/userLogin.tsx';
import { MAIN_ROUTE } from '../constants/pages.ts';
import { RootState } from '../interfaces/state.interface.ts';
import { UserDto } from '../interfaces/user.interface.ts';
import { authFailure, startAuth } from '../redux/authSlice.ts';
import { FormInput } from './FormInput.tsx';
import Modal from './Modal.tsx';

const LoginForm = ({ openModal }: { openModal: (content: string) => void }) => {
  const [visibility, setVisibility] = useState<boolean>(true);
  const [isModal, setIsModal] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, isAuth } = useSelector((state: RootState) => state.auth);
  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const redirect = (mess: string): void => {
    openModal(mess);
    setTimeout((): void => {
      navigate(MAIN_ROUTE);
    }, 2000);
  };
  const onSubmit = async (data: UserDto): Promise<void> => {
    try {
      dispatch(startAuth());
      const userData = await Login(data);
      if (!userData) throw new Error('');
      // const { id, email } = userData.body && userData.body.customer;
      // dispatch(authSuccess({ id, email }));
      redirect('Вы успешно авторизованы!');
    } catch (e) {
      dispatch(authFailure());
      setIsModal(true);
    }
  };

  useEffect((): void => {
    isAuth && redirect('Вы уже авторизованы');
  }, []);

  const togglePassword = (e: MouseEvent): void => {
    e.preventDefault();
    setVisibility(!visibility);
  };

  return (
    <FormProvider {...methods}>
      <form
        className={loading ? 'login-form loading' : 'login-form'}
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
      >
        <FormInput label="Email" type="email" id="email" placeholder="Email"></FormInput>
        <FormInput
          label="Password"
          type={visibility ? 'password' : 'text'}
          id="password"
          placeholder="Password"
        ></FormInput>
        <button type="button" className="btn btn_toogle" onClick={togglePassword}>
          {visibility ? 'Show' : 'Hide'} Password
        </button>
        <button type="submit">Submit</button>
        {loading && <span className="loader"></span>}
        <Modal visible={isModal} setDisplay={setIsModal}>
          {'Неврный логин или пароль!'}
        </Modal>
      </form>
    </FormProvider>
  );
};
export default LoginForm;
