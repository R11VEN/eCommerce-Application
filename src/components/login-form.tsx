import { MouseEvent, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Login from '../api/userLogin.tsx';
import { MAIN_ROUTE } from '../constants/pages.ts';
import { UserDto } from '../interfaces/user.interface.ts';
import { Input } from './input';
import { useDispatch } from 'react-redux';
import { authSuccess } from '../redux/authSlice.ts';

const LoginForm = ({ openModal }: { openModal: (content: string) => void }) => {
  const [visibility, setVisibility] = useState<boolean>(true);
  const navigate = useNavigate();

  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const dispatch = useDispatch();

  const onSubmit = async (data: UserDto): Promise<void> => {
    const isAuth = await Login(data);
    isAuth && dispatch(authSuccess({ isAuth: true }));
    isAuth && navigate(MAIN_ROUTE);
  };

  useEffect((): void => {
    const isAuth = localStorage.getItem('isAuth');
    isAuth === 'true' && redirect('Вы уже авторизованы');
  }, []);

  const togglePassword = (e: MouseEvent): void => {
    e.preventDefault();
    setVisibility(!visibility);
  };

  return (
    <FormProvider {...methods}>
      <form className="login-form" onSubmit={methods.handleSubmit(onSubmit)} noValidate>
        <Input label="Email" type="email" id="email" placeholder="Email"></Input>
        <Input
          label="Password"
          type={visibility ? 'password' : 'text'}
          id="password"
          placeholder="Password"
        ></Input>
        <button type="button" className="btn btn_toogle" onClick={togglePassword}>
          {visibility ? 'Show' : 'Hide'} Password
        </button>
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
};
export default LoginForm;
