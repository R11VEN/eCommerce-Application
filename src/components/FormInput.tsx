import { useFormContext } from 'react-hook-form';

import { UserFormEnum } from '../constants/userForm.ts';
import { inputType } from '../interfaces/form.interface.ts';
import { InputError } from './InputError.tsx';

export const FormInput = ({ label, type, id, placeholder, isDisable }: inputType) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  let validation;
  switch (id) {
    case UserFormEnum.EMAIL:
      validation = {
        required: { value: true, message: 'required' },
        pattern: {
          value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
          message:
            'email  address must be properly formatted (user@example.com) and should be without leading or trailing whitespaces',
        },
      };
      break;
    case UserFormEnum.PASSWORD:
      validation = {
        required: { value: true, message: 'required' },
        minLength: { value: 8, message: 'Password must be at least 8 characters long.' },
        pattern: {
          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/,
          message:
            'Password must contain at least one uppercase,one lowercase letter ,one number and no leading or trailing spaces ',
        },
      };
      break;
    case UserFormEnum.FIRST_NAME:
    case UserFormEnum.LAST_NAME:
      validation = {
        required: { value: true, message: 'required' },
        pattern: {
          value: /^[a-zA-Z]+$/,
          message: 'Must contain at least one character and no special characters or numbers ',
        },
      };
      break;
    case UserFormEnum.DATE_OF_BIRTH:
      validation = {
        required: { value: true, message: 'required' },
        validate: (v: string) =>
          Math.abs(new Date(Date.now() - new Date(v).getTime()).getUTCFullYear() - 1970) >= 13 ||
          'You must be older than 13 years',
      };
      break;
    case UserFormEnum.STREET:
    case UserFormEnum.STREET_BILLING:
      validation = {
        required: { value: true, message: 'Must contain at least one character ' },
      };
      break;
    case UserFormEnum.CITY:
    case UserFormEnum.CITY_BILLING:
      validation = {
        required: { value: true, message: 'Must contain at least one character' },
        pattern: { value: /^[A-Za-z\s]*$/, message: 'no special characters or numbers' },
      };
      break;
    default:
      break;
  }
  const error = errors && errors[id];
  const message = error?.message?.toString() as string;

  return (
    <>
      <label htmlFor={id}>{label}</label>
      {isDisable ? (
        <input id={id} type={type} placeholder={placeholder} disabled={isDisable} />
      ) : (
        <input id={id} type={type} placeholder={placeholder} {...register(id, validation)} />
      )}
      {message && <InputError message={message} key={`message-${id}`} />}
    </>
  );
};
