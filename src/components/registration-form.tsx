import { FormProvider, useForm } from 'react-hook-form';
import { Input } from './input';
import { useState } from 'react';
import { Select } from './select';

const RegisterationForm = () => {
  const [visibility, setVisibility] = useState(true);
  const togglePasword = () => {
    setVisibility(!visibility);
  };
  const methods = useForm();
  const onSubmit = methods.handleSubmit((data) => {
    console.log(data);
  });
  return (
    <FormProvider {...methods}>
      <form className="registration-form" onSubmit={(e) => e.preventDefault()} noValidate>
        <Input label="First name" type="text" id="firstname" placeholder="First name"></Input>
        <Input label="Last name" type="text" id="lastname" placeholder="Last name"></Input>
        <Input label="Date of Birth" type="date" id="birthdate" placeholder="Date of Birth"></Input>
        <fieldset name="adress" className="adress">
          <legend>Address</legend>
          <Input label="Street" type="text" id="street" placeholder="Street"></Input>
          <Input label="City" type="text" id="city" placeholder="City"></Input>
          <Input
            label="Postal code"
            type="number"
            id="postalcode"
            placeholder="Postal code"
          ></Input>
          <Select></Select>
        </fieldset>
        <div>
          <Input
            label="Set a different shipping address"
            type="checkbox"
            id="checkbox"
            placeholder=""
          ></Input>
        </div>
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
export default RegisterationForm;
