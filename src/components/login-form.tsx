import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Login from '../api/userLogin.tsx';
import { FormInterface } from '../interfaces/form.interface.ts';
import { Input } from './input';

const LoginForm = () => {
  const [visibility, setVisibility] = useState(true);
  const methods = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const onSubmit = (data: FormInterface) => {
    if (data.Email && data.Password) {
      Login({ username: data.Email, password: data.Password });
    }
  };

  const togglePasword = () => {
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
        <button type="button" className="btn btn_toogle" onClick={togglePasword}>
          {visibility ? 'Show' : 'Hide'} Password
        </button>
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
};
export default LoginForm;
