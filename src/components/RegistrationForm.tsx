import { ChangeEvent, MouseEvent, useState } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { CreateUser } from '../api/controllers/user.controller.ts';
import { userData } from '../api/userCreate.tsx';
import { MAIN_ROUTE } from '../constants/pages.ts';
import { UserFormEnum } from '../constants/userForm.ts';
import { Customer } from '../interfaces/form.interface.ts';
import { fetchUser } from '../redux/actions/ActionCreaters.ts';
import { FormInput } from './FormInput.tsx';
import { Select, SelectBilling } from './Select.tsx';

export const RegistrationForm = ({ openModal }: { openModal: (content: string) => void }) => {
  const [visibility, setVisibility] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [display, setDisplay] = useState<string>('none');
  const [isDisable, setIsDisable] = useState<boolean>(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePassword = (e: MouseEvent): void => {
    e.preventDefault();
    setVisibility(!visibility);
  };

  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (data: FieldValues): Promise<void> => {
    setLoading(true);
    const userData = (await CreateUser(data as Customer)) as userData;
    if (userData.statusCode === 200) {
      openModal('Пользователь уже существует!');
    } else if (userData.statusCode === 201) {
      openModal('Вы успешно зарегистрировались!');
      console.log(data.email, data.password);
      // @ts-ignore
      dispatch(fetchUser(data.email, data.password));
      setTimeout(() => {
        navigate(MAIN_ROUTE);
      }, 2000);
    }
    if (!userData) {
      openModal('Произошла ошибка. Попробуйте снова!');
    }
    setLoading(false);
  };

  const showAddress = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setDisplay(isChecked ? 'flex' : 'none');
    setIsDisable(!isChecked);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          className={loading ? 'registration-form loading' : 'registration-form'}
          onSubmit={methods.handleSubmit(onSubmit)}
          noValidate
        >
          {loading && <span className="loader"></span>}
          <FormInput
            label="First name"
            type="text"
            id={UserFormEnum.FIRST_NAME}
            placeholder="First name"
          ></FormInput>
          <FormInput
            label="Last name"
            type="text"
            id={UserFormEnum.LAST_NAME}
            placeholder="Last name"
          ></FormInput>
          <FormInput
            label="Date of Birth"
            type="date"
            id={UserFormEnum.DATE_OF_BIRTH}
            placeholder="Date of Birth"
          ></FormInput>
          <fieldset name="adress" className="adress">
            <legend>Shipping address</legend>
            <FormInput
              label="Street"
              type="text"
              id={UserFormEnum.STREET}
              placeholder="Street"
            ></FormInput>
            <FormInput
              label="City"
              type="text"
              id={UserFormEnum.CITY}
              placeholder="City"
            ></FormInput>
            <FormInput
              label="Postal code"
              type="number"
              id={UserFormEnum.POSTAL_CODE}
              placeholder="Postal code"
            ></FormInput>
            <Select></Select>
            <div>
              <FormInput
                label="Set as default shiping address"
                type="checkbox"
                id={UserFormEnum.DEFAULT_ADDRESS}
                placeholder=""
              ></FormInput>
            </div>
          </fieldset>
          <div onChange={showAddress}>
            <FormInput
              label="Set a different billing address"
              type="checkbox"
              id={UserFormEnum.DIFFERENT_BILLING}
              placeholder=""
            ></FormInput>
          </div>
          <fieldset name="adress-billing" className="adress-billing" style={{ display: display }}>
            <legend>Billing address</legend>
            <FormInput
              label="Street *billing"
              type="text"
              id={UserFormEnum.STREET_BILLING}
              placeholder="Street billing"
              isDisable={isDisable}
            ></FormInput>
            <FormInput
              label="City *billing"
              type="text"
              id={UserFormEnum.CITY_BILLING}
              placeholder="City billing"
              isDisable={isDisable}
            ></FormInput>
            <FormInput
              label="Postal code *billing"
              type="number"
              id={UserFormEnum.POSTAL_CODE_BILLING}
              placeholder="Postal code billing"
              isDisable={isDisable}
            ></FormInput>
            <SelectBilling></SelectBilling>
            <div>
              <FormInput
                label="Set as default billing address"
                type="checkbox"
                id={UserFormEnum.DEFAULT_BILLING}
                placeholder=""
              ></FormInput>
            </div>
          </fieldset>

          <FormInput
            label="Email"
            type="email"
            id={UserFormEnum.EMAIL}
            placeholder="Email"
          ></FormInput>
          <FormInput
            label="Password"
            type={visibility ? 'password' : 'text'}
            id={UserFormEnum.PASSWORD}
            placeholder="Password"
          ></FormInput>
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
