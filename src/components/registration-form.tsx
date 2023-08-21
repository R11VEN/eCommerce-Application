import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import createCustomer from '../api/userCreate';
import { Input } from './input';
import { Select, SelectBilling } from './select';

export const RegisterationForm = () => {
  const [visibility, setVisibility] = useState(true);
  const togglePasword = () => {
    setVisibility(!visibility);
  };
  const methods = useForm();
  const onSubmit = methods.handleSubmit((data) => {
    console.log(data);
    createCustomer({
      email: data.Email,
      password: data.Password,
      firsrName: data['First name'],
      lastName: data['Last name'],
      date: data['Date of Birth'],
      city: data.City,
      street: data.Street,
      cityBilling: data['City *billing'],
      streetBilling: data['Street *billing'],
      postalCodeBilling: data['Postal code *billing'],
      postalCode: data['Postal code'],
      setAddress: {
        defaultBilling: data['Set as default billing address'],
        defaultShiping: data['Set as default shiping address'],
        differentBilling: data['Set a different billing address'],
      },
    });
  });
  const [display, setDisplay] = useState({ display: 'none' });
  const showAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setDisplay({ display: 'flex' });
    } else {
      setDisplay({ display: 'none' });
    }
  };
  return (
    <FormProvider {...methods}>
      <form className="registration-form" onSubmit={(e) => e.preventDefault()} noValidate>
        <Input label="First name" type="text" id="firstName" placeholder="First name"></Input>
        <Input label="Last name" type="text" id="lastName" placeholder="Last name"></Input>
        <Input label="Date of Birth" type="date" id="birthDate" placeholder="Date of Birth"></Input>
        <fieldset name="adress" className="adress">
          <legend>Shiping address</legend>
          <Input label="Street" type="text" id="street" placeholder="Street"></Input>
          <Input label="City" type="text" id="city" placeholder="City"></Input>
          <Input
            label="Postal code"
            type="number"
            id="postalCode"
            placeholder="Postal code"
          ></Input>
          <Select></Select>
          <div>
            <Input
              label="Set as default shiping address"
              type="checkbox"
              id="default-address"
              placeholder=""
            ></Input>
          </div>
        </fieldset>
        <div onChange={showAddress}>
          <Input
            label="Set a different billing address"
            type="checkbox"
            id="Set-different-billing-address"
            placeholder=""
          ></Input>
        </div>
        <fieldset name="adress-billing" className="adress-billing" style={display}>
          <legend>Billing address</legend>
          <Input
            label="Street *billing"
            type="text"
            id="streetBilling"
            placeholder="Street *billing"
          ></Input>
          <Input
            label="City *billing"
            type="text"
            id="cityBilling"
            placeholder="City *billing"
          ></Input>
          <Input
            label="Postal code *billing"
            type="number"
            id="postalCodeBilling"
            placeholder="Postal code *billing"
          ></Input>
          <SelectBilling></SelectBilling>
          <div>
            <Input
              label="Set as default billing address"
              type="checkbox"
              id="default-address-billing"
              placeholder=""
            ></Input>
          </div>
        </fieldset>
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
