import { CustomerChangePassword } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LoginAnton, userUpdatePassword } from '../../api/controllers/user.controller.ts';
import { RootState } from '../../interfaces/state.interface.ts';
import { setToken } from '../../redux/authSlice.ts';

const ChangePass = () => {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const { id, version, email } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const saveHandler = async () => {
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
  };

  return message.length > 0 ? (
    <div>{message}</div>
  ) : (
    <Fragment>
      <div className="profile-change-password">
        <label htmlFor="currentPassword">Текущий пароль</label>
        <input
          id="currentPassword"
          type="text"
          onChange={(e) => setCurrentPassword(e.target.value)}
          value={currentPassword}
        />
        <label htmlFor="newPassword">Новый пароль</label>
        <input
          id="newPassword"
          type="text"
          onChange={(e) => setNewPassword(e.target.value)}
          value={newPassword}
        />
        <input type="button" value="Сохранить" onClick={saveHandler} />
      </div>
    </Fragment>
  );
};

export default ChangePass;
