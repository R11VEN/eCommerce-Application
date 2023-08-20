import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { FormInterface } from '../interfaces/form.interface.ts';
import { Input } from './input';
const LoginForm = () => {
  const [visibility, setVisibility] = useState(true);
  const methods = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const onSubmit = (data: FormInterface) => {
    console.log(data);
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
        <button className="btn btn_toogle" onClick={togglePasword}>
          {visibility ? 'Show' : 'Hide'} Password
        </button>
        <button>Submit</button>
      </form>
    </FormProvider>
  );
};
export default LoginForm;
