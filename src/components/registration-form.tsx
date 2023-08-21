import { ChangeEvent, MouseEvent, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import createCustomer from '../api/userCreate.tsx';
import { Customer } from '../interfaces/form.interface.ts';
import { Input } from './input';
import { Select, SelectBilling } from './select';

export const RegistrationForm = ({ openModal }: { openModal: (content: string) => void }) => {
  const [visibility, setVisibility] = useState<boolean>(true);
  const [display, setDisplay] = useState<string>('none');
  const [isDisable, setIsDisable] = useState<boolean>(true);

  function handleModal(content: string): void {
    openModal(content);
  }

  const togglePassword = (e: MouseEvent): void => {
    e.preventDefault();
    setVisibility(!visibility);
  };

  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (data: Customer): Promise<void> => {
    const userData = await createCustomer(data);
    if (userData) {
      const code = userData.statusCode && userData.statusCode;
      if (code === 200) {
        handleModal('Пользователь уже существует!');
      } else if (code === 201) {
        handleModal('Вы успешно зарегистрировались!');
      }
    }
  };

  const showAddress = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setDisplay(isChecked ? 'flex' : 'none');
    setIsDisable(!isChecked);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form className="registration-form" onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          <Input label="First name" type="text" id="first-name" placeholder="First name"></Input>
          <Input label="Last name" type="text" id="last-name" placeholder="Last name"></Input>
          <Input
            label="Date of Birth"
            type="date"
            id="birthdate"
            placeholder="Date of Birth"
          ></Input>
          <fieldset name="adress" className="adress">
            <legend>Shipping address</legend>
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
              id="differentBilling"
              placeholder=""
            ></Input>
          </div>
          <fieldset name="adress-billing" className="adress-billing" style={{ display: display }}>
            <legend>Billing address</legend>
            <Input
              label="Street *billing"
              type="text"
              id="street-billing"
              placeholder="Street billing"
              isDisable={isDisable}
            ></Input>
            <Input
              label="City *billing"
              type="text"
              id="city-billing"
              placeholder="City billing"
              isDisable={isDisable}
            ></Input>
            <Input
              label="Postal code *billing"
              type="number"
              id="postalCodeBilling"
              placeholder="Postal code billing"
              isDisable={isDisable}
            ></Input>
            <SelectBilling></SelectBilling>
            <div>
              <Input
                label="Set as default billing address"
                type="checkbox"
                id="defaultBilling"
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
          <button className="btn btn_toogle" onClick={togglePassword}>
            {visibility ? 'Show' : 'Hide'} Password
          </button>
          <button>Submit</button>
        </form>
      </FormProvider>
    </>
  );
};
export default RegistrationForm;
