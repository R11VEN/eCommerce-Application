import { useFormContext } from 'react-hook-form';

import inputType from '../types/types';
import { InputError } from './inputError';
export const Input = ({ label, type, id, placeholder }: inputType) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  function findInputError(errors, name: string) {
    return Object.keys(errors)
      .filter((key) => key.includes(name))
      .reduce((cur, key) => {
        return Object.assign(cur, { error: errors[key] });
      }, {});
  }

  function isFormInvalid(err) {
    if (Object.keys(err).length > 0) return true;
    return false;
  }
  const inputError = findInputError(errors, label);
  const isInvalid = isFormInvalid(inputError);
  let validation;
  switch (label) {
    case 'Email':
      validation = {
        required: { value: true, message: 'required' },
        pattern: {
          value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
          message:
            'email  address must be properly formatted (user@example.com) and should be without leading or trailing whitespaces',
        },
      };
      break;
    case 'Password':
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
    case 'First name':
    case 'Last name':
      validation = {
        required: { value: true, message: 'required' },
        pattern: {
          value: /[A-Z-a-z]/,
          message: 'Must contain at least one character and no special characters or numbers ',
        },
      };
      break;
    case 'Date of Birth':
      validation = {
        required: { value: true, message: 'required' },
        validate: (v: string) =>
          new Date().getFullYear() - new Date(v).getFullYear() > 13 ||
          'You must be older than 13 years',
      };
      break;
    case 'Street':
      validation = {
        required: { value: true, message: 'Must contain at least one character ' },
      };
      break;
    case 'City':
      validation = {
        required: { value: true, message: 'Must contain at least one character' },
        pattern: { value: /^[A-Za-z\s]*$/, message: 'no special characters or numbers' },
      };
      break;
    default:
      break;
  }
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} placeholder={placeholder} {...register(label, validation)} />
      {isInvalid && (
        <InputError message={inputError.error.message} key={inputError.error.message} />
      )}
    </>
  );
};
