import { FormProvider, useForm } from 'react-hook-form';

import { Input } from './input';
import { useState } from 'react';
const Form = () => {
  const [visibility, setVisibility] = useState(true);
  const methods = useForm();
  const onSubmit = methods.handleSubmit((data) => {
    console.log(data);
  });
  const togglePasword = () => {
    setVisibility(!visibility);
  };
  return (
    <FormProvider {...methods}>
      <form className="login-form" onSubmit={(e) => e.preventDefault()} noValidate>
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
        <button onClick={onSubmit}>Submit</button>
      </form>
    </FormProvider>
  );
};
export default Form;
