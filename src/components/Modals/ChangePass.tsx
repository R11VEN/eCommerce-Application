import { CustomerChangePassword } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import { ChangeEvent, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LoginAnton, userUpdatePassword } from '../../api/controllers/user.controller.ts';
import { RootState } from '../../interfaces/state.interface.ts';
import { setToken } from '../../redux/authSlice.ts';

const ChangePass = () => {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [validation, setValidation] = useState({
    newPassword: false,
    currentPassword: false,
  });
  const [message, setMessage] = useState<string>('');
  const [validationMessage, setValidationMessage] = useState({
    newPassword: '',
    currentPassword: '',
  });
  const { id, version, email } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const validationHandler = (id: string, value: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/;
    const validationValue = !regex.test(value) || value.length < 8;
    setValidation((state) => ({ ...state, [id]: validationValue }));
    const error = validationValue
      ? 'Пароль должен содержать минимум 1 спецсимвол, 1 заглавную букву, 1 цифру и быть длиной не менее 8'
      : '';
    setValidationMessage((state) => ({ ...state, [id]: error }));
  };

  const saveHandler = async () => {
    try {
      const isValidNew = !validation.newPassword && newPassword.length > 0;
      const isValidCurrent = !validation.currentPassword && currentPassword.length > 0;
      if (!(isValidCurrent && isValidNew)) {
        setMessage('Заполните данные');
        return;
      }
      const data: CustomerChangePassword = {
        id,
        version,
        currentPassword,
        newPassword,
      };
      const { body, statusCode } = await userUpdatePassword(data);
      console.log(body, statusCode);
      if (statusCode === 200) {
        console.log(email, newPassword);
        const { userData, token } = await LoginAnton(email, newPassword);
        console.log(userData);
        dispatch(setToken({ token }));
        setMessage('Пароль успешно сохранён!');
      }
    } catch {
      setMessage('Неверные данные');
    }
  };

  const currentPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    validationHandler('currentPassword', value);
    setCurrentPassword(value);
  };

  const newPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    validationHandler('newPassword', value);
    setNewPassword(value);
  };

  return (
    <Fragment>
      <div className="profile-change-password">
        <div style={{ textAlign: 'center', color: 'red', width: '200px' }}>{message}</div>
        <label htmlFor="currentPassword">Текущий пароль</label>
        <input
          id="currentPassword"
          type="text"
          onChange={currentPasswordHandler}
          value={currentPassword}
        />
        <div style={{ textAlign: 'center', color: 'red', width: '200px' }}>
          {validation.currentPassword && validationMessage.currentPassword}
        </div>
        <label htmlFor="newPassword">Новый пароль</label>
        <input id="newPassword" type="text" onChange={newPasswordHandler} value={newPassword} />
        <div style={{ textAlign: 'center', color: 'red', width: '200px' }}>
          {validation.newPassword && validationMessage.newPassword}
        </div>
        <input type="button" value="Сохранить" onClick={saveHandler} />
      </div>
    </Fragment>
  );
};

export default ChangePass;
