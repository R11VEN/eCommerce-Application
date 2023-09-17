import { MouseEvent, useState } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import { LoginAnton } from '../api/controllers/user.controller.ts';
import { MAIN_ROUTE, REG_ROUTE } from '../constants/pages.ts';
import { RootState } from '../interfaces/state.interface.ts';
import { authFailure, authSuccess, endAuth, startAuth } from '../redux/authSlice.ts';
import { FormInput } from './FormInput.tsx';

const LoginForm = ({ openModal }: { openModal: (content: string) => void }) => {
  const [visibility, setVisibility] = useState<boolean>(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);
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

  const onSubmit = async ({ email, password }: FieldValues): Promise<void> => {
    try {
      dispatch(startAuth());
      const { token, userData } = await LoginAnton(email, password);
      const { id, name, version } = userData.body.customer;
      const { clientId } = userData.body.customer.createdBy;
      dispatch(authSuccess({ id, email, name, token, clientId, version }));
      dispatch(endAuth());
      redirect('Вы успешно авторизованы!');
    } catch (e) {
      dispatch(authFailure());
      openModal('Неверный логин или пароль!');
    }
  };

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
        <div style={{ textAlign: 'center' }}>
          Нет аккаунта?{' '}
          <NavLink key="SingUp" to={REG_ROUTE} end>
            Зарегистрироваться
          </NavLink>
        </div>
      </form>
    </FormProvider>
  );
};
export default LoginForm;
